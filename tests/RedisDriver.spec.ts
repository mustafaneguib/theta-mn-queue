import { RedisDriver } from '../src/drivers/RedisDriver';
import { DBDriver } from '../src/drivers/DBDriver';

describe('RedisDriver', () => {
    let redisDriver: DBDriver;
    let queue_name = 'queue1';
    beforeEach(() => {
        redisDriver = new RedisDriver();
    });    
    afterEach(async () => {
        await redisDriver.close();
    });
    describe('initialize', () => {
        it('should return true', async () => {
            const result = await redisDriver.initialize(queue_name);
            expect(result).toBe(true);
        });
    });
});