"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Router_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const express_1 = require("express");
let Router = Router_1 = class Router {
    constructor(options) {
        this.router = (0, express_1.Router)(options);
    }
    get(route, ...middlewares) {
        return this.methodWrapper(this.router.get, route, ...middlewares);
    }
    post(route, ...middlewares) {
        return this.methodWrapper(this.router.post, route, ...middlewares);
    }
    patch(route, ...middlewares) {
        return this.methodWrapper(this.router.patch, route, ...middlewares);
    }
    delete(route, ...middlewares) {
        return this.methodWrapper(this.router.delete, route, ...middlewares);
    }
    use(...middlewares) {
        return this.methodWrapper(this.router.use, ...middlewares);
    }
    toExpressRequestHandler() {
        return this.router;
    }
    methodWrapper(method, ...middlewares) {
        if (!method || typeof method !== 'function') {
            throw new Error('Invalid parameter method');
        }
        const args = middlewares.map(middleware => {
            if (typeof middleware === 'string') {
                return middleware;
            }
            if (middleware instanceof Router_1) {
                return middleware.toExpressRequestHandler();
            }
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield middleware(req, res);
                }
                catch (err) {
                    return next(err);
                }
                next();
                // just to detect if its pipeline
                if (res._eventsCount > 2) {
                    return res;
                }
                return res;
            });
        });
        return method.call(this.router, ...args);
    }
};
Router = Router_1 = __decorate([
    autobind_decorator_1.default
], Router);
exports.Router = Router;
