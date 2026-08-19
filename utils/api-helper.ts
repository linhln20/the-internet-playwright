import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
    readonly request: APIRequestContext;
    
    // Add default headers here if needed later (e.g. Authorization tokens)
    readonly defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.request.get(url, {
            headers: { ...this.defaultHeaders, ...headers }
        });
    }

    async post(url: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.request.post(url, {
            headers: { ...this.defaultHeaders, ...headers },
            data: data
        });
    }
}
