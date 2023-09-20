"use strict";
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
exports.eventService = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("sequelize");
const database_1 = require("../../database");
const eventUser_model_1 = require("../../database/models/eventUser.model");
class EventService {
    /**
     * get events list.
     * @param eventAttributes
     * @param otherFindOptions
     * @returns
     */
    getEventList(eventAttributes, otherFindOptions, offset, limit, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                limit = limit && limit > 0 ? limit : undefined;
                let eventList = yield database_1.EventDbModel.findAll(Object.assign(Object.assign({}, otherFindOptions), { attributes: eventAttributes, limit,
                    offset, include: [
                        {
                            model: database_1.UserDbModel,
                            through: { attributes: [] },
                            as: "users",
                            attributes: []
                        }
                    ] }));
                for (let i = 0; i < eventList.length; i++) {
                    let artists = (_a = eventList[i].dataValues) === null || _a === void 0 ? void 0 : _a.artists;
                    if (artists) {
                        const artistList = yield database_1.UserDbModel.findAll({
                            where: {
                                id: artists
                            }
                        });
                        eventList[i].dataValues.artists = artistList;
                    }
                }
                return res.json({
                    count: eventList.length,
                    data: eventList
                });
            }
            catch (e) {
                console.log('------get event list API error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * create event data.
     * @param eventObj
     * @returns
     */
    createEvent(eventObj, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = eventObj.participants;
                delete eventObj.participants;
                const createEvent = yield database_1.EventDbModel.create(Object.assign(Object.assign({}, eventObj), { createdAt: new Date().toISOString() }));
                const eventUserData = [];
                if (participants && participants.length > 0 && ((_a = createEvent === null || createEvent === void 0 ? void 0 : createEvent.dataValues) === null || _a === void 0 ? void 0 : _a.id)) {
                    yield participants.map((userId) => {
                        eventUserData.push({
                            eventId: createEvent.dataValues.id,
                            userId,
                            status: "going",
                            createdAt: new Date().toISOString()
                        });
                    });
                    const createEventUser = yield eventUser_model_1.EventUserDbModel.bulkCreate(eventUserData);
                    res.json({
                        message: 'Event is created successfully',
                        data: createEventUser
                    });
                }
                return createEvent;
            }
            catch (e) {
                console.log("-----Create Event API error----", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * update Event data.
     * @param eventObj
     */
    updateEvent(eventObj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateEvent = yield database_1.EventDbModel.update(eventObj, {
                    where: { id: eventObj.id }
                });
                return res.json({
                    message: 'Event is updated successfully',
                    data: updateEvent
                });
            }
            catch (e) {
                console.log('------update event error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * delete campaign.
     * @param req
     * @param res
     * @returns
     */
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const detailEvent = yield database_1.EventDbModel.findOne({
                    where: {
                        id
                    },
                    include: [
                        {
                            model: database_1.UserDbModel,
                            through: { attributes: [] }
                        }
                    ]
                });
                if (!detailEvent) {
                    return res.status(400).json({
                        msg: "Event is not found by this id"
                    });
                }
                const removeEventData = yield database_1.EventDbModel.destroy({
                    where: {
                        id
                    },
                });
                return res.json({
                    message: `Delete Event is successful.`,
                    data: removeEventData
                });
            }
            catch (e) {
                console.log("Delete Event API Error", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * get Event by Id.
     * @param event_id
     * @returns
     */
    getEventById(event_id, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventData = yield database_1.EventDbModel.findOne({
                    where: {
                        id: event_id
                    },
                    include: [
                        {
                            model: database_1.UserDbModel,
                            through: { attributes: [] }
                        }
                    ]
                });
                console.log('Event Data', eventData);
                if (!eventData) {
                    return res.status(404).json({
                        msg: "Event data is not found by this id"
                    });
                }
                eventData.dataValues.participants = eventData.dataValues.users;
                delete eventData.dataValues.users;
                let artists = (_a = eventData.dataValues) === null || _a === void 0 ? void 0 : _a.artists;
                if (artists) {
                    const artistList = yield database_1.UserDbModel.findAll({
                        where: {
                            id: artists
                        }
                    });
                    eventData.dataValues.artists = artistList;
                }
                return res.json({
                    data: eventData
                });
            }
            catch (e) {
                console.log("--Get Event By Id API Error---", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
    /**
     * upcoming event.
     * @param userId
     * @param res
     * @returns
     */
    upComingEventList(userId, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                const startOfDateRange = new Date();
                const endOfDateRange = new Date(date.setDate(date.getDate() + 2));
                const eventData = yield database_1.EventDbModel.findAll({
                    where: {
                        [sequelize_2.Op.and]: [
                            sequelize_1.default.literal(`DATE(date) >= '${startOfDateRange.toISOString()}'`),
                            sequelize_1.default.literal(`DATE(date) <= '${endOfDateRange.toISOString()}'`),
                            sequelize_1.default.or({ createdUser: userId }, sequelize_1.default.where(sequelize_1.default.col('participants'), 'LIKE', `%"${userId}"%`)),
                        ],
                    },
                    include: [
                        {
                            model: database_1.UserDbModel,
                            through: { attributes: [] },
                        },
                    ],
                });
                if (!eventData) {
                    return res.status(200).json({
                        data: [],
                        count: 0
                    });
                }
                eventData.dataValues.participants = eventData.dataValues.users;
                delete eventData.dataValues.users;
                let artists = (_a = eventData.dataValues) === null || _a === void 0 ? void 0 : _a.artists;
                if (artists) {
                    const artistList = yield database_1.UserDbModel.findAll({
                        where: {
                            id: artists
                        }
                    });
                    eventData.dataValues.artists = artistList;
                }
                console.log('eventData', eventData);
                return res.status(200).json({
                    data: eventData,
                    count: eventData.length
                });
            }
            catch (e) {
                console.log("--Upcoming Event API Error---", e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
}
exports.eventService = new EventService();
