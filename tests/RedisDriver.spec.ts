import { RedisDriver } from '../src/drivers/RedisDriver';
import { DBDriver } from '../src/drivers/DBDriver';

describe('RedisDriver', () => {
    let redisDriver: DBDriver;
    beforeEach(() => {
        redisDriver = new RedisDriver();
    });    
    afterEach(async () => {
        await redisDriver.close();
    });
    describe('initialize', () => {
        it('should return true', async () => {
            const result = await redisDriver.initialize();
            expect(result).toBe(true);
        });
    });
});