"use strict";
/*
  Copyright (©) 2023 RAMPAGE Interactive
  Redis 7 for RAMPAGE.Host.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = exports.RedisAPI = void 0;
const RedisAPI_1 = __importDefault(require("./RedisAPI"));
exports.RedisAPI = RedisAPI_1.default;
const RedisClient_1 = __importDefault(require("./RedisClient"));
exports.RedisClient = RedisClient_1.default;
