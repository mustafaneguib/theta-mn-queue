import { Resource } from '../types/Resource';
export class Document {
    private resource: Resource;

    constructor(resource: Resource) {
        this.resource = resource;
    }

    public getResource(): Resource {
        return this.resource;
    }
}