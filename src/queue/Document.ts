import { Resource } from '../types/Resource';
export class Document {
    private resource: Resource;

    constructor(resource: Resource) {
        this.resource = resource;
    }

    /**
     * This method returns the resource object
     * @returns the resource object
     */
    public getResource(): Resource {
        return this.resource;
    }

    /**
     * This method returns the document id
     * @returns the document id
     */
    public getId(): number {
        return this.resource.id;
    }

    /**
     * This method returns the document key
     * @returns the document key
     */
    public getKey(): string {
        return this.resource.key;
    }

    /**
     * This method returns the document content
     * @returns the document content
     */
    public getContent(): string {
        return this.resource.content;
    }
}