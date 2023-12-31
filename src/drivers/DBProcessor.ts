import { DBDriver } from "./DBDriver";
import { FileDriver } from "./FileDriver";
import { MongoDBDriver } from "./MongoDBDriver";
import { MySQLDriver } from "./MySQLDriver";
import { RedisDriver } from "./RedisDriver";

export class DBProcessor {

    private static instance: DBProcessor;
    private constructor() {

    }

    public static getInstance(): DBProcessor {
        if(!DBProcessor.instance) {
            DBProcessor.instance = new DBProcessor();
        }
        return DBProcessor.instance;
    }

    getDriver(driver: string): DBDriver {
        if (driver === 'file') {
            return new FileDriver();
        } else if (driver === 'redis') {
            return  new RedisDriver();
        }
        // else if (driver === 'mongodb') {
        //     return new MongoDBDriver();
        // } else if (driver === 'redis') {
        //     return  new RedisDriver();
        // } else if (driver === 'mysql') {
        //     return  new MySQLDriver();
        // }
        //use the FileDriver as default if the provided 
        //name is not available
        return new FileDriver();
    }
}