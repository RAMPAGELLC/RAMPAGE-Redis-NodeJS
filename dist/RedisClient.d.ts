declare class RedisClient {
    private redis;
    constructor(host: string, port: number, password?: string);
    set(key: string, value: string): void;
    get(key: string): Promise<string>;
    delete(key: string): void;
    close(): void;
}
export = RedisClient;
