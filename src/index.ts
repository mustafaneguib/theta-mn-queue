export { QueueProcessor } from './queue/QueueProcessor';
export { Response } from './types/Response';
export { Document } from './queue/Document';
import journal from './data/journal.json';


import { QueueProcessor } from './queue/QueueProcessor';
import { Response } from './types/Response';
import { Document } from './queue/Document';

async function  writeData() {
    const queueProcessor: QueueProcessor = QueueProcessor.getInstance();
    const response:Response = {id: 1, key: 'hello', content: 'world'};
    await queueProcessor.enqueue(response);
    const response1:Response = {id: 2, key: 'bye', content: 'world'};
    await queueProcessor.enqueue(response1);
    const response2:Response = {id: 3, key: 'bye', content: 'hello'};
    await queueProcessor.enqueue(response2);    
    await queueProcessor.commit();
    // const data: Document = await queueProcessor.dequeue();
    // console.log('data', data);
    // await queueProcessor.commit();
    
}

writeData();
