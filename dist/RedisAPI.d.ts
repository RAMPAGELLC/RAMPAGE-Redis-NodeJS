declare class RedisAPI {
    private socket;
    constructor(host: string, port: number);
    private connect;
    sendCommand(command: string, params: string[]): Promise<string>;
    private buildCommandString;
    private readResponse;
    close(): void;
}
export default RedisAPI;
