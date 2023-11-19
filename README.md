
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
- [X] Code of conduct document
- [X] Changelog document 
- [ ] Unit Tests
- [ ] Contribution documentation and plan of action
- [ ] MySQL based persistant layer
- [ ] MongoDB based persistant layer
- [ ] PostgreSQL based persistant layer
- [ ] Add support for multiple/parallel queues
- [ ] Add support for job scheduling with rate limiting

## Environment Variables

Please refer to the file .env.example that has been provided in the codebase with keys and their sample values.

`BASE_URL`
`PORT`
`MONGO_URL` 
`REDIS_PORT`
`DATA_DRIVER`

## Tech Stack

**Server:** TypeScript, NodeJS

## Authors

- [@mustafaneguib](https://www.github.com/mustafaneguib)


## Feedback

If you have any feedback, please reach out to us at mustafa.neguib@gmail.com

## Contributing

Theta MN Queue is in active development and invites software engineers and software developers to help us in making this library one of the best queue and job scheduling library that there can be. We are actively seeking contributors to help us take this project forward.

We are also interested in getting help in improving the documentation for this project so that it is easy to read and understand.

If you find a bug in the code do create an issue in the issue tracker https://github.com/mustafaneguib/theta-mn-queue/issues and if you work on fixing it do create a merge request with the details of the fix so that it can be applied.


## License

[MIT](https://choosealicense.com/licenses/mit/)

