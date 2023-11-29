
import { DBProcessor } from "../drivers/DBProcessor";
import { DBDriver } from "../drivers/DBDriver";
import { Utility } from "../utility/Utility";
import { Document } from "./Document";
import { FileStructure } from "../types/FileStructure";
export class Queue {

    private name: string = '';
    private documents: Document[] = [];
    private dbDriver: DBDriver;

    constructor(name: string) {
        const dataDriverToUse: string = Utility.getInstance().getConstants('DATA_DRIVER');
        this.dbDriver = DBProcessor.getInstance().getDriver(dataDriverToUse);
        this.name = name;
        this.initialize();
    }

    /**
     * This method returns the name of the queue
     * @returns the name of the queue
     */
    public getName(): string {
        return this.name;    
    }

    /**
     * The method initializes the queue
     * @returns a boolean of whether the queue was initialized or not
     */

    public async initialize(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            return resolve(await this.dbDriver.initialize(this.getName()));
        });
    }

    /**
     * The method ensures that the queue is written and committed to the database
     */
    public async commit(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const fileStructure: FileStructure[] = [];
            fileStructure.push({name: this.getName(), queue: this.documents.map((document) => document.getResource())});
            return resolve(await this.dbDriver.write(fileStructure));
        });
    }

    /**
     * The method purges the queue
     * @returns a boolean of whether the queue was purged or not
     */
    public async purge(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            this.documents = [];
            return resolve(await this.dbDriver.purge(this.getName()));
        });
    }
  
    /**
     * The method enqueues a document to the queue
     * @param document 
     * @returns a boolean of whether the document was enqueued or not
     */
    public async enqueue(document: Document): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.documents.push(document);
            return resolve(true);
        });
    }

    /**
     * This method gets the top most document from the queue
     * @returns a document from the queue
     */
    public async dequeue(): Promise<Document> {
        return new Promise((resolve, reject) => {
            if (this.documents.length === 0) {
                return reject('Queue is empty');
            }
            const item: Document|undefined = this.documents.shift() || undefined;
            if (item) {
                return resolve(item);
            } else {
                return reject('The Queue could not be dequeued');
            }
        });
    }

    /**
     * This method gets the top most document from the queue without removing it
     * @returns a document from the queue
     */
    public async peek(): Promise<Document> {
        return new Promise((resolve, reject) => {
            if (this.documents.length === 0) {
                return reject('Queue is empty');
            }
            const item: Document = this.documents[0];
            if (item) {
                return resolve(item);
            } else {
                return reject('The Queue could not be peeked');
            }
        });
    }

    /**
     * This method checks if the queue is empty
     * @returns a boolean value indicating whether the queue is empty or not
     */
    public async isEmpty(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return resolve(this.documents.length === 0);
        });
    }

    /**
     * This method gets the length of the queue
     * @returns the length of the queue
     */
    public async length(): Promise<number> {
        return new Promise((resolve, reject) => {
            return resolve(this.documents.length);
        });
    }

    /**
     * This method gets the next index of the queue
     * @returns the next index of the queue
     */
    public async getNextIndex(): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const length: number = await this.length();
            return resolve( length + 1);
        });
    }

}