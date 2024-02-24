
# Theta MN Queue

Theta Queue is an easy to use queue system with support for multiple data sources developed in TypeScript and has been designed and developed from the ground up.

## **Important: This library is currently in active development and the public API might get changed, until the design and APIs have been locked. Use this library wisely.**

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
![npm](https://img.shields.io/npm/v/theta-mn-queue)
[![Open Source Helpers](https://www.codetriage.com/mustafaneguib/theta-mn-queue/badges/users.svg)](https://www.codetriage.com/mustafaneguib/theta-mn-queue)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Changelog

A history of changes have been given in the file CHANGELOG.md (https://github.com/mustafaneguib/theta-mn-queue/blob/master/CHANGELOG.md)


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
import { Queue, Document } from 'theta-mn-queue';

/**
 * The method setupQueue itself is given for demonstration purposes.
 */
async function setupQueue() {

  let queue_name = 'queue1';
  //A new queue will be created with the name queue1
  let queue: Queue = new Queue(queue_name);
  await queue.purge();//This method will remove any lingering queues in the database that have the same name as the one that has been provided.

  //A new document has been created and is being queued into the queue. The method call queue.getNextIndex() returns the next usable index. Use this method to get a sequence of numbers that can be used as ids.
  let document: Document = new Document({id: (await queue.getNextIndex()), key: 'hello', content: 'world'});
  await queue.enqueue(document);
  
  document = new Document({id: (await queue.getNextIndex()), key: 'hello', content: 'world'});
  await queue.enqueue(document);

  //At this stage the queue will be containing two items

  //The commit method ensures that the queue is persisted and saved to the database.
  await queue.commit();

}

setupQueue();

```

## API

### Resource

This is a TypeScript interface that is being used as a type and has the following structure:

```typescript
{
    id: number;
    key: string;
    content: string;    
}
```
This is the basic type that gets stored in the data storage as well. The definition of this type has only been given for sake of completion and is not exported and should not be used directly. The Document class uses Resource type directly.

### Document

#### public getResource(): Resource
The getResource method returns a Resource type.

#### public getId(): number
The getItd method gets the id of the document.

#### public getKey(): string
The getKey method gets the key of the document.

#### public getContent(): string
The getContent method gets the content of the document.

The public methods of QueueProcessor accept the Document object where required.

### Queue

#### public getName(): string

This method returns the name of the queue

### public async initialize(): Promise<boolean>

This method initializes the queue and sets up the required infrastructure for the queue to function smoothly

#### public async commit(): Promise<boolean>

This method writes to the designated data storage persisting it permanently unless removed from the data storage.

### public async purge(): Promise<boolean>

This method purges(removes) the queue from the database.

#### public async enqueue(document: Document): Promise<boolean>

This method enqueues the document to the back of the queue.

#### public async dequeue(): Promise<Document>

This method dequeues the document from the front of the queue and returns it.

#### public async peek(): Promise<Document>

This method returns the document at the front of the queue without removing 
it from the queue.

#### public async isEmpty(): Promise<boolean>

This method returns whether the queue is empty or not.

#### public async length(): Promise<number>

This method returns the number of items in the queue.

#### public async getNextIndex(): Promise<number>
This method gets the next index of the queue


## Features
The features that have been marked as check have been implemented while those that are planned to be implemented are marked as unchecked.

- [x] Queue implementation with public API
- [x] Structured architecture for clean and easy development
- [x] Single file based persistant layer
- [X] Redis based persistant layer
- [X] Code of conduct document
- [X] Changelog document 
- [X] Unit Tests
- [X] Add support for multiple/parallel queues
- [ ] Add support for job scheduling (Inprogress)
- [ ] Rate limiting of jobs
- [ ] Contribution documentation and plan of action
- [ ] MySQL based persistant layer
- [ ] MongoDB based persistant layer
- [ ] PostgreSQL based persistant layer

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

