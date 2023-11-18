/*
  Copyright (©) 2023 RAMPAGE Interactive
  Redis 7 for RAMPAGE.Host.
*/

import RedisAPI from "./RedisAPI";

class RedisClient {
    private redis: RedisAPI;

    constructor(host: string, port: number, password?: string) {
        this.redis = new RedisAPI(host, port, password);
    }

    set(key: string, value: any): void {
        this.redis.sendCommand('SET', [key, this.serializeValue(value)]);
    }

    async get<T>(key: string): Promise<T | null> {
        const serializedValue = await this.redis.sendCommand('GET', [key]);

        if (serializedValue) return this.deserializeValue<T>(serializedValue);

        return null;
    }

    delete(key: string): void {
        this.redis.sendCommand('DEL', [key]);
    }

    close(): void {
        this.redis.close();
    }

    private serializeValue(value: any): string {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return String(value);
        }
    }

    private deserializeValue<T>(serializedValue: string): T | null {
        try {
            return JSON.parse(serializedValue) as T;
        } catch (error) {
            return null;
        }
    }
}

export = RedisClient;