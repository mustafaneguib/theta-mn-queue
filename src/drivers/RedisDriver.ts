import { DBDriver } from "./DBDriver";
import { Resource } from "../types/Resource";
import { createClient } from 'redis'
import { RedisClientType } from '@redis/client'
import { FileStructure } from "../types/FileStructure";

export class RedisDriver extends DBDriver {
    private redisClient: RedisClientType;
    private key: string = 'theta-mn-queue';
    constructor() {
        super();
        this.redisClient = createClient()
        this.redisClient.on('error', (err:any) => console.log('Redis Client Error', err));
    }

    public async initialize(queueName: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await this.redisClient.connect()
            return resolve(true);
        });
    }

    public async read(queueName: string): Promise<Resource[]> {
        return new Promise<Resource[]>(async (resolve, reject) => {
            const length = await this.redisClient.lLen(`${this.key}-${queueName}`);
            const data: any = await this.redisClient.lRange(`${this.key}-${queueName}`, 0, length);
            let parsedData: Resource[] = []; 
            data.forEach((item: any) => {
                parsedData.push(JSON.parse(item));
            });
            return resolve(parsedData);
        });
    }

    public async write(content: FileStructure[]): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            //We want to delete the key first, because the key might already exist
            //and we do not want to append to the key. Essentially, the write
            //method writes the entire content to the database
            for (let i=0; i<content.length; i++) {
                const fileStructure = content[i];
                for (let j=0; j<fileStructure.queue.length; j++) {
                    const queue = fileStructure.queue[j];
                    this.redisClient.lPush(`${this.key}-${fileStructure.name}`, JSON.stringify(queue));
                }
            }
            return resolve(true);
        });
    }

    public async purge(queueName: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            this.redisClient.del(`${this.key}-${queueName}`);
            return resolve(true);
        });
    }

    /**
     * Close the database connection.
     */
    public async close(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            await this.redisClient.disconnect()
            return resolve(true);
        });
    }

}