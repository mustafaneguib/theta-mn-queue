
# Theta MN Queue

Theta Queue is an easy to use queue system with support for multiple data sources developed in TypeScript and has been designed and developed from the ground up.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
![npm](https://img.shields.io/npm/v/theta-mn-queue)
[![Open Source Helpers](https://www.codetriage.com/mustafaneguib/theta-mn-queue/badges/users.svg)](https://www.codetriage.com/mustafaneguib/theta-mn-queue)

## Installation

Install theta-mn-queue with npm

```bash
  npm i theta-mn-queue

```
or

```bash
  yarn add theta-mn-queue
```

## Usage/Examples

```typescript
import { QueueProcessor, Document } from 'theta-mn-queue';

/**
 * The method setupQueue itself is given for demonstration purposes.
 */
async function setupQueue() {
//QueueProcessor is a singleton and the method getInstance provides the live object.
const queueProcessor: QueueProcessor = QueueProcessor.getInstance();

//Get the length of the queue by calling the length method
let id = await queueProcessor.length() + 1;

//The item will be enqued at the front of the queue
let document: Document;
document = new Document({id: 1, key: 'hello', content: 'world'});
await queueProcessor.enqueue(document);

document = new Document({id: 2, key: 'hello', content: 'world'});
await queueProcessor.enqueue(document);

//The item in the front of the queue will be dequeued
const queuedDataItem: Document = await queueProcessor.dequeue(); 

//Calling the method commit will commit the data stored in the queue to the data storage set in the .env file. If this method is not called then the data in the queue is not persisted and is in memory.
await queueProcessor.commit();
}

setupQueue();

```

## Features
The features that have been marked as check have been implemented while those that are planned to be implemented are marked as unchecked.

- [x] Queue implementation with public API
- [x] Structured architecture for clean and easy development
- [x] Single file based persistant layer
- [X] Redis based persistant layer
- [X] Improved Documentation
- [ ] MySQL based persistant layer
- [ ] MongoDB based persistant layer
- [ ] PostgreSQL based persistant layer
- [ ] Unit Tests
- [ ] Code of Conduct
- [ ] Contribution documentation and plan of action
- [ ] Add support for multiple/parallel queues
- [ ] Add support for job scheduling with rate limiting

## Environment Variables

Please refer to the file .env.example that has been provided in the codebase with keys and their sample values.

## Tech Stack

**Server:** TypeScript, NodeJS

## Authors

- [@mustafaneguib](https://www.github.com/mustafaneguib)


## Feedback

If you have any feedback, please reach out to us at mustafa.neguib@gmail.com


## License

[MIT](https://choosealicense.com/licenses/mit/)

