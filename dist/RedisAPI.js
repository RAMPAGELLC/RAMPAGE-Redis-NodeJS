"use strict";
/*
  Copyright (©) 2023 RAMPAGE Interactive
  Redis 7 for RAMPAGE.Host.
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
class RedisAPI {
    constructor(host, port) {
        try {
            this.connect(host, port);
        }
        catch (error) {
            throw new Error(`Unable to connect to Redis server: ${error.message}`);
        }
    }
    connect(host, port) {
        this.socket = net.createConnection(port, host);
        this.socket.on('error', (error) => {
            throw new Error(`Unable to connect to Redis server: ${error.message}`);
        });
    }
    sendCommand(command, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandString = this.buildCommandString(command, params);
            this.socket.write(commandString);
            return yield this.readResponse();
        });
    }
    buildCommandString(command, params) {
        let commandString = `*${params.length + 1}\r\n${command}\r\n`;
        params.forEach(param => {
            commandString += `${param}\r\n`;
        });
        return commandString;
    }
    readResponse() {
        return new Promise((resolve, reject) => {
            this.socket.once('data', (data) => {
                const response = data.toString('utf-8').trim();
                resolve(response);
            });
            this.socket.once('error', (error) => {
                reject(new Error(`Error reading from Redis server: ${error.message}`));
            });
        });
    }
    close() {
        this.socket.end();
    }
}
exports.default = RedisAPI;