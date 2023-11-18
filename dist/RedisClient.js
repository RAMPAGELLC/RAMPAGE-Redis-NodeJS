"use strict";
/*
  Copyright (©) 2023 RAMPAGE Interactive
  Redis 7 for RAMPAGE.Host.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const RedisAPI_1 = __importDefault(require("./RedisAPI"));
class RedisClient {
    constructor(host, port, password) {
        this.redis = new RedisAPI_1.default(host, port, password);
    }
    set(key, value) {
        this.redis.sendCommand('SET', [key, value]);
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.sendCommand('GET', [key]);
        });
    }
    delete(key) {
        this.redis.sendCommand('DEL', [key]);
    }
    close() {
        this.redis.close();
    }
}
module.exports = RedisClient;
