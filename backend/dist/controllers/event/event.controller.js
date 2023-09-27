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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const event_1 = require("../../services/event");
const constant_1 = require("../../utils/constant");
let EventController = class EventController {
    /**
     * get all events data.
     * @param req
     * @param res
     * @returns
     */
    getAllEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let offset = Number(req.query.page) - 1 || 0;
            const size = Number(req.query.size) || constant_1.PAGINATION_LIMIT;
            let page = offset * size;
            const response = yield event_1.eventService.getEventList(undefined, undefined, page, size, res);
            return response;
        });
    }
    /**
     * create Event.
     * @param req
     * @param res
     */
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = {
                eventName: req.body.eventName,
                fromTime: req.body.fromTime,
                toTime: req.body.toTime,
                address: req.body.address,
                date: req.body.date,
                description: req.body.description,
                participants: req.body.participants,
                beforeReminder: req.body.beforeReminder,
                reminderStatus: req.body.reminderStatus,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                artists: req.body.artists,
                color: req.body.color,
                createdUserId: req.headers['userid']
            };
            const result = yield event_1.eventService.createEvent(eventData, res);
            return result;
        });
    }
    /**
     * update Event.
     * @param req
     * @param res
     * @returns
     */
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            console.log('update id----------', id);
            const checkEvent = yield event_1.eventService.getEventById(id, res);
            if (!checkEvent) {
                return res.status(404).send("Event is not found");
            }
            const eventData = {
                eventName: req.body.eventName,
                fromTime: req.body.fromTime,
                toTime: req.body.toTime,
                address: req.body.address,
                date: req.body.date,
                description: req.body.description,
                participants: req.body.participants,
                beforeReminder: req.body.beforeReminder,
                reminderStatus: req.body.reminderStatus,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                artists: req.body.artists,
                color: req.body.color,
                updatedUserId: req.headers['userId']
            };
            eventData.id = +req.params.id;
            const updateEventData = yield event_1.eventService.updateEvent(eventData, res);
            return updateEventData;
        });
    }
    /**
      * delete event.
      * @param req
      * @param res
      */
    deleteEvent(req, res) {
        const data = event_1.eventService.deleteEvent(req, res);
        return data;
    }
    /**
     * event Detail
     * @param req
     * @param res
     */
    detailEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const eventData = yield event_1.eventService.getEventById(id, res);
            return eventData;
        });
    }
    upComingEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers['userid'];
            console.log('upComing event---------controller', userId);
            if (userId) {
                const eventData = yield event_1.eventService.upComingEventList(userId, res);
                return eventData;
            }
            else {
                res.status(400).send({
                    "message": "Please add login userId in request header"
                });
            }
        });
    }
};
EventController = __decorate([
    autobind_decorator_1.default
], EventController);
exports.eventController = new EventController();
