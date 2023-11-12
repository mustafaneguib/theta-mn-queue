
import { DBProcessor } from "../DBProcessor";
import { DBDriver } from "../drivers/DBDriver";
import { Config } from "../types/Config";
import { Response } from "../types/Response";
import { Utility } from "../utility/Utility";
import { Document } from "./Document";
export class Queue {

    private queue: Document[] = [];
    private dbDriver: DBDriver;
    private dataStore: Response[] = [];

    constructor() {
        const dataDriverToUse: string = Utility.getInstance().getConstants('DATA_DRIVER');
        this.dbDriver = DBProcessor.getInstance().getDriver(dataDriverToUse);
        this.initialize();
    }

    public async initialize(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            return resolve(await this.dbDriver.initialize());
        });
    }

    /**
     * The method ensures that the queue is written and committed to the database
     */
    public async commit(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            this.dataStore = [];
            this.dataStore = this.queue.map((document) => document.getResource());
            return resolve(await this.dbDriver.write(this.dataStore));
        });
    }
  
    /**
     * The method enqueues a document to the queue
     * @param document 
     * @returns a boolean of whether the document was enqueued or not
     */
    public async enqueue(document: Document): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.queue.push(document);
            return resolve(true);
        });
    }

    /**
     * This method gets the top most document from the queue
     * @returns a document from the queue
     */
    public async dequeue(): Promise<Document> {
        return new Promise((resolve, reject) => {
            if (this.queue.length === 0) {
                return reject('Queue is empty');
            }
            const item: Document|undefined = this.queue.shift() || undefined;
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
    public peek(): Promise<Document> {
        return new Promise((resolve, reject) => {
            if (this.queue.length === 0) {
                return reject('Queue is empty');
            }
            const item: Document = this.queue[0];
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
    public isEmpty(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return resolve(this.queue.length === 0);
        });
    }

    /**
     * This method gets the length of the queue
     * @returns the length of the queue
     */
    public length(): Promise<number> {
        return new Promise((resolve, reject) => {
            return resolve(this.queue.length);
        });
    }
}