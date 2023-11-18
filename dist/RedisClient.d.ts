declare class RedisClient {
    private redis;
    constructor(host: string, port: number, password?: string);
    set(key: string, value: any): void;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): void;
    close(): void;
    private serializeValue;
    private deserializeValue;
}
export = RedisClient;
