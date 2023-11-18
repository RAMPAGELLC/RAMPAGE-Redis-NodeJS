/*
  Copyright (©) 2023 RAMPAGE Interactive
  Redis 7 for RAMPAGE.Host.
*/

import RedisAPI from "./RedisAPI";

class RedisClient {
    private redis: RedisAPI;

    constructor(host: string, port: number) {
        this.redis = new RedisAPI(host, port);
    }

    set(key: string, value: string): void {
        this.redis.sendCommand('SET', [key, value]);
    }

    async get(key: string): Promise<string> {
        return await this.redis.sendCommand('GET', [key]);
    }

    delete(key: string): void {
        this.redis.sendCommand('DEL', [key]);
    }

    close(): void {
        this.redis.close();
    }
}

export = RedisClient;