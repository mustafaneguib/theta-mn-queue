import { FileStructure } from "../types/FileStructure";
import { Resource } from "../types/Resource";

export abstract class DBDriver {
    
    /**
     * Initialize the database
     * @param queueName The name of the queue
     * @returns a promise with a boolean value indicating whether the initialization was successful
     */
    abstract initialize(queueName: string): Promise<boolean>;
    /**
     * Read the entire database
     * @param queueName The name of the queue
     * @returns a promise with a boolean value indicating whether the initialization was successful
     */
    abstract read(queueName: string): Promise<Resource[]>;
    /**
     * Write to the database. This method appends to the database.
     * @param queueName The name of the queue
     * @param content The content to write to the database
     * @returns a promise with a boolean value indicating whether the initialization was successful
     */
    abstract write(content: FileStructure[]): Promise<boolean>;
    /**
     * Purge the database. This method removes data from the database.
     * @param queueName The name of the queue
     * @returns a promise with a boolean value indicating whether the initialization was successful
     */
    abstract purge(queueName: string): Promise<boolean>;
    /**
     * Close the database connection.
     * @returns a promise with a boolean value indicating whether the initialization was successful
     */
    abstract close(): Promise<boolean>;
}