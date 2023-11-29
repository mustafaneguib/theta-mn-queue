import fs from 'fs';
import path from 'path';
import { DBDriver } from "./DBDriver";
import { Resource } from "../types/Resource";
import { FileStructure } from "../types/FileStructure";

export class FileDriver extends DBDriver {
    private filePath: string;
    constructor() {
        super();
        this.filePath = path.join(__dirname, `${path.sep}..${path.sep}data${path.sep}journal.txt`);
    }

    /**
     * Initialize the database
     */
    public async initialize(queueName: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let resource: Resource[] = [];
            await this.read(queueName);
            return resolve(await this.write([]));
        });
    }
   
    /**
     * Read the entire database
     */
    public async read(queueName: string): Promise<Resource[]> {
        return new Promise<Resource[]>(async (resolve, reject) => {
            let fileStructure: FileStructure[] = await this.getFileStructure();
            return resolve(fileStructure.find((fileStructure) => fileStructure.name === queueName)?.queue || []);
        });
    }

    /**
     * Write to the database. This method appends to the database.
     * @param content The content to write to the database
     */
    public async write(content: FileStructure[]): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            for (let i=0; i<content.length; i++) {
                const fileStructure = content[i];
                for (let j=0; j<fileStructure.queue.length; j++) {
                    const resource:Resource = fileStructure.queue[j];
                    const text: string = `${fileStructure.name}-${JSON.stringify(resource)}\n`;
                    await this.writeToFile(text);
                }
            }
            return resolve(true);
        });
    }

    /**
     * This method removed the queue associated with queueName from the file and leaves the rest of the queues intact
     * @returns a promise with a boolean value indicating whether the purge was successful
     */
    public async purge(queueName: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let fileStructure: FileStructure[] = await this.getFileStructure();
            fileStructure = fileStructure.filter((fileStructure) => fileStructure.name !== queueName);
            //truncate the entire file because it will be written again
            fs.truncateSync(this.filePath, 0);
            await this.write(fileStructure);
            return resolve(true);
        });
    }

     /**
     * Close the database connection.
     */
     public async close(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            return resolve(true);
        });
    }

    /**
     * This method contains the lower level logic to read from the file
     * @returns a promise with the file data
     */
    private async readFromFile(): Promise<string | null> {
        return new Promise<string | null>(async (resolve, reject) => {
            const filePath = this.filePath
            fs.readFile(filePath, 'utf-8', async function(err, data){
                if(!err && data) {
                    return resolve(data);
                } else {
                    return reject(null);
                }
            });
        });
    }

    /**
     * 
     * @param data The method contains the low level logic to write to the file
     * @returns a promise with a boolean value indicating whether the write was successful
     */
    public async writeToFile(data: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const filePath = this.filePath
            fs.open(filePath,'a',function(err, fileDescriptor){
                if(!err && fileDescriptor) {
                    const stringData = data;
                    fs.writeFile(fileDescriptor, stringData, function(err){
                        if(!err) {
                            fs.close(fileDescriptor, function(err){
                                if(!err){
                                    resolve(true);
                                } else {
                                    console.log('Can not close the file', filePath);
                                    reject(false);
                                }
                            });    
                        } else {
                            console.log('Can not write to the file', filePath);
                            reject(false);
                        }
                    });
                } else {
                    console.log('Can not open the file', filePath);
                    reject(false);
                }
            });
        });
    }

    /**
     * This method gets the entire contents of the file in the form of a FileStructure
     * @returns a promise with the file structure
     */
    private async getFileStructure(): Promise<FileStructure[]> {
        return new Promise<FileStructure[]>(async (resolve, reject) => {
            let fileStructure: FileStructure[] = [];
            const readData = await this.readFromFile().catch((err) => {});
            if (readData) {
                const data = readData.split('\n');
                for (let i=0; i<data.length; i++) {
                    const item = data[i];
                    if (item !== '') {
                        const queueName: string = item.split('-')[0];
                        const data: Resource = JSON.parse(item.split('-')[1]);
                        console.log('data', data);
                        const structure = fileStructure.find((fileStructure) => fileStructure.name === queueName)
                        if (structure) {
                            structure.queue.push(data);
                        } else {
                            fileStructure.push({name: queueName, queue: [data]});
                        }
                    }
                }
            }
            return resolve(fileStructure);
        });
    }
}