import { FileDriver } from '../src/drivers/FileDriver';
import { DBDriver } from '../src/drivers/DBDriver';

describe('FileDriver', () => {
    let fileDriver: DBDriver;
    let queue_name = 'queue1';

    beforeEach(() => {
        fileDriver = new FileDriver();
    });
    describe('initialize', () => {
        it('should return true', async () => {
            const result = await fileDriver.initialize();
            expect(result).toBe(true);
        });
    });
    describe('read', () => {
        it('should return an empty array', async () => {
            const result = await fileDriver.read(queue_name);
            expect(result).toEqual([]);
        });
    });
    describe('write', () => {
        it('should return true', async () => {
            const result = await fileDriver.write([]);
            expect(result).toBe(true);
        });
    });
});