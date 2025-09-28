import dotenv from 'dotenv';

export class Utility {

    private static instance: Utility;
    private corruptFiles: string[] = [];
    
    private constructor() {
       
    }

    public static getInstance(): Utility {
        if(!Utility.instance) {
            Utility.instance = new Utility();
            dotenv.config();
        }
        return Utility.instance;
    }
  
    public addToCorruptFiles(filePath: string): void {
        this.corruptFiles.push(filePath);
    }    

    public getConstants(key: string): any {
        return {
            PORT: process.env.PORT || 3001,
            MONGO_URL: process.env.MONGO_URL || '',
            REDIS_HOST: process.env.REDIS_HOST || 'localhost',
            REDIS_PORT: process.env.REDIS_PORT || 6379,
            DATA_DRIVER: process.env.DATA_DRIVER || 'mongodb', //file, mongodb, redis
        }[key];
    }

    public getBaseURL(): string {
        return process.env.BASE_URL || 'http://localhost:3001';
    }

    public async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}