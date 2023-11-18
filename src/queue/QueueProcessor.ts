import { Queue } from '../queue/Queue';
import { Document } from '../queue/Document';
import { Config } from '../types/Config';

export class QueueProcessor {
    
    private static instance: QueueProcessor;
    private queue: Queue;
    private constructor() {
       this.queue = new Queue();
    }

    public static getInstance(): QueueProcessor {
        if (!QueueProcessor.instance) {
            QueueProcessor.instance = new QueueProcessor();
        }
        return QueueProcessor.instance;
    }

    public async commit(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            return resolve(await this.queue.commit());
        });
    }
  
    public enqueue(document: Document): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const resource:Document = document;
            return resolve(this.queue.enqueue(resource));
        });
    }

    public dequeue(): Promise<Document> {
        return new Promise((resolve, reject) => {
            return resolve(this.queue.dequeue());
        });
    }

    public peek(): Promise<Document> {
        return new Promise((resolve, reject) => {
            return resolve(this.queue.peek());
        });
    }

    public isEmpty(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return resolve(this.queue.isEmpty());
        });
    }

    public length(): Promise<number> {
        return new Promise((resolve, reject) => {
            return resolve(this.queue.length());
        });
    }
}