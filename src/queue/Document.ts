import { Response } from '../types/Response';
export class Document {
    private resource: Response;

    constructor(resource: Response) {
        this.resource = resource;
    }

    public getResource(): Response {
        return this.resource;
    }
}