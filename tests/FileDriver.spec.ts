import { FileDriver } from '../src/drivers/FileDriver';
import { DBDriver } from '../src/drivers/DBDriver';

describe('FileDriver', () => {
    let fileDriver: DBDriver;
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
            const result = await fileDriver.read();
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