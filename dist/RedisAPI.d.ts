declare class RedisAPI {
    private host;
    private port;
    private password?;
    private socket;
    constructor(host: string, port: number, password?: string);
    private connect;
    private authenticate;
    sendCommand(command: string, params: string[]): Promise<string>;
    private buildCommandString;
    private readResponse;
    close(): void;
}
export default RedisAPI;
