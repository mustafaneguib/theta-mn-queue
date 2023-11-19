import { QueueProcessor } from '../src/queue/QueueProcessor';
import { Document } from '../src/queue/Document';

describe('QueueProcessor', () => {
    let queueProcessor: QueueProcessor;
    beforeEach(() => {
        queueProcessor = QueueProcessor.getInstance();
    });
    describe('getInstance', () => {
        it('should return an instance of QueueProcessor', () => {
            expect(queueProcessor).toBeInstanceOf(QueueProcessor);
        });
    });
    describe('enqueue', () => {
        it('should return 1', async () => {
            const document:Document = new Document({id: 1, key: 'hello', content: 'world'});
            await queueProcessor.enqueue(document);
            expect(await queueProcessor.length()).toBe(1);
        });
    });
    describe('length', () => {
        it('should return 1', async () => {
            expect(await queueProcessor.length()).toBe(1);
        });
    });
    describe('dequeue', () => {
        it('should return the true', async () => {
            const document:Document = await queueProcessor.dequeue();
            expect(document.getResource().id === 1).toBe(true);
            expect(document.getResource().key === 'hello').toBe(true);
            expect(document.getResource().content === 'world').toBe(true);
        });
    });
    describe('isEmpty', () => {
        it('should return true', async () => {
            const isEmpty:boolean = await queueProcessor.isEmpty();
            expect(isEmpty).toBe(true);
        });
    });

});