/*
  Copyright (©) 2023 RAMPAGE Interactive
  Redis 7 for RAMPAGE.Host.
*/

import * as net from 'net';

class RedisAPI {
    private socket: net.Socket;

    constructor(private host: string, private port: number, private password?: string) {
        try {
            this.connect();
            if (password) this.authenticate(password);
        } catch (error) {
            throw new Error(`Unable to connect to Redis server: ${error.message}`);
        }
    }

    private connect(): void {
        this.socket = net.createConnection(this.port, this.host);

        this.socket.on('error', (error: Error) => {
            throw new Error(`Unable to connect to Redis server: ${error.message}`);
        });
    }

    private async authenticate(password: string): Promise<void> {
        const response = await this.sendCommand('HELLO', [password]);
        
        if (!response.includes('OK')) {
            throw new Error('Authentication failed');
        }
    }

    public async sendCommand(command: string, params: string[]): Promise<string> {
        const commandString: string = this.buildCommandString(command, params);
        this.socket.write(commandString);

        return await this.readResponse();
    }

    private buildCommandString(command: string, params: string[]): string {
        let commandString: string = `*${params.length + 1}\r\n${command}\r\n`;

        params.forEach(param => {
            commandString += `$${Buffer.from(param).length}\r\n${param}\r\n`;
        });

        return commandString;
    }

    private readResponse(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.socket.once('data', (data: Buffer) => {
                const response: string = data.toString('utf-8').trim();
                resolve(response);
            });

            this.socket.once('error', (error: Error) => {
                reject(new Error(`Error reading from Redis server: ${error.message}`));
            });
        });
    }

    public close(): void {
        this.socket.end();
    }
}

export default RedisAPI;