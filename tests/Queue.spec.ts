import { Queue } from '../src/queue/Queue';
import { Document } from '../src/queue/Document';

describe('Queue', () => {
    let queue: Queue;
    let queue_name = 'queue1';
    queue = new Queue(queue_name);

    beforeEach(() => {
        
    });
    describe('getInstance', () => {
        it('should return an instance of Queue', () => {
            expect(queue).toBeInstanceOf(Queue);
        });
    });
    describe('enqueue', () => {
        it('should return 1', async () => {
            const document:Document = new Document({id: (await queue.getNextIndex()), key: 'hello', content: 'world'});
            await queue.enqueue(document);
            expect(await queue.length()).toBe(1);
        });
    });
    describe('length', () => {
        it('should return 1', async () => {
            expect(await queue.length()).toBe(1);
        });
    });
    describe('dequeue', () => {
        it('should return the true', async () => {
            const document:Document = await queue.dequeue();
            expect(document.getResource().id === 1).toBe(true);
            expect(document.getResource().key === 'hello').toBe(true);
            expect(document.getResource().content === 'world').toBe(true);
        });
    });
    describe('isEmpty', () => {
        it('should return true', async () => {
            const isEmpty:boolean = await queue.isEmpty();
            expect(isEmpty).toBe(true);
        });
    });

});