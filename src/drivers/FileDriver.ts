import { DBDriver } from "./DBDriver";
import { Response } from "../types/Response";
import fs from 'fs';
import path from 'path';

export class FileDriver extends DBDriver {

    private file: string;
    constructor() {
        super();
        this.file = path.join(__dirname, `${path.sep}..${path.sep}data${path.sep}journal.json`);
    }

    /**
     * Initialize the database
     */
    public async initialize(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let response: Response[] = [];
            return resolve(await this.write(response));
        });
    }
   
    /**
     * Read the entire database
     */
    public async read(): Promise<Response[]> {
        return new Promise<Response[]>(async (resolve, reject) => {
            let response: Response[] = [];
            const readData = await this.readFromFile(this.file).catch((err) => {});
            if (readData) {
                const parsedData = JSON.parse(readData);
                parsedData.forEach((item: any) => {
                    response.push({
                        id: item.id,
                        key: item.key,
                        content: item.content,
                    });
                });
                return resolve(response);
            } else {
                return reject(response);
            }
        });
    }

    /**
     * Write to the database. This method appends to the database.
     * @param content The content to write to the database
     */
    public async write(content: Response[]): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            return resolve(await this.writeToFile(this.file, JSON.stringify(content)));
        });
    }

    /**
     * 
     * @param filePath The file path of the file to read from
     * @returns a promise with the file data
     */
    private async readFromFile(filePath: string): Promise<string | null> {
        return new Promise<string | null>(async (resolve, reject) => {
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
     * @param filePath The file path of the file to write to
     * @param data The data to write to the file
     * @returns a promise with a boolean value indicating whether the write was successful
     */
    public async writeToFile(filePath: string, data: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            fs.open(filePath,'w+',function(err, fileDescriptor){
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

}