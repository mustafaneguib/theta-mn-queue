import { Resource } from "../types/Resource";

export abstract class DBDriver {
    
    /**
     * Initialize the database
     */
    abstract initialize(): Promise<boolean>;
    /**
     * Read the entire database
     */
    abstract read(): Promise<Resource[]>;
    /**
     * Write to the database. This method appends to the database.
     * @param content The content to write to the database
     */
    abstract write(content: Resource[]): Promise<boolean>;

    /**
     * Close the database connection.
     */
    abstract close(): Promise<boolean>;
}