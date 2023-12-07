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
const googleapis_1 = require("googleapis");
const moment_1 = __importDefault(require("moment"));
const database_1 = require("../../database");
const passport_1 = require("../../config/passport");
class EventService {
    /**
     * get events list.
     * @param eventAttributes
     * @param otherFindOptions
     * @returns
     */
    getEventList(eventAttributes, otherFindOptions, offset, limit, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // limit = limit && limit > 0 ? limit : undefined;
                // let eventList = await EventDbModel.findAll({
                //   ...otherFindOptions,
                //   attributes: eventAttributes,
                //   limit,
                //   offset,
                //   include: [
                //     {
                //       model: UserDbModel,
                //       through: { attributes: [] },
                //       as: "users",
                //       attributes: []
                //     }
                //   ]
                // });
                // for (let i = 0; i < eventList.length; i++) {
                //   let artists = eventList[i].dataValues?.artists;
                //   if (artists) {
                //     const artistList = await UserDbModel.findAll({
                //       where: {
                //         id: artists
                //       }
                //     });
                //     eventList[i].dataValues.artists = artistList;
                //   }
                // }
                // return res.json({
                //   success: true,
                //   count: eventList.length,
                //   data: eventList
                // });
                const list = [];
                const calendar = yield googleapis_1.google.calendar({ version: 'v3', auth: passport_1.oauth2Client });
                const response = yield calendar.events.list({
                    calendarId: 'primary',
                    timeMin: (0, moment_1.default)().toISOString(),
                    maxResults: 30,
                    singleEvents: true,
                    orderBy: 'startTime',
                });
                const events = response.data.items;
                if (events === null || events === void 0 ? void 0 : events.length) {
                    for (let i = 0; i < (events === null || events === void 0 ? void 0 : events.length); i++) {
                        const start = ((_b = (_a = events[i]) === null || _a === void 0 ? void 0 : _a.start) === null || _b === void 0 ? void 0 : _b.dateTime) || ((_c = events[i]) === null || _c === void 0 ? void 0 : _c.start.date);
                        const end = ((_e = (_d = events[i]) === null || _d === void 0 ? void 0 : _d.end) === null || _e === void 0 ? void 0 : _e.dateTime) || ((_f = events[i]) === null || _f === void 0 ? void 0 : _f.end.date);
                        list.push({
                            id: events[i].id,
                            start,
                            end,
                            summary: (_g = events[i]) === null || _g === void 0 ? void 0 : _g.summary,
                            status: (_h = events[i]) === null || _h === void 0 ? void 0 : _h.status
                        });
                    }
                }
                else {
                    console.log('No upcoming events found.');
                }
                return res.json({
                    success: true,
                    data: list,
                    count: list.length
                });
            }
            catch (e) {
                console.log('------get event list API error----', e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = eventObj.participants;
                const attendees = [];
                participants.map((participant) => {
                    attendees.push({
                        email: participant
                    });
                });
                const calendar = yield googleapis_1.google.calendar({ version: 'v3', auth: passport_1.oauth2Client });
                yield calendar.events.insert({
                    calendarId: "primary",
                    auth: passport_1.oauth2Client,
                    requestBody: {
                        summary: eventObj.eventName,
                        description: eventObj.description,
                        location: `${eventObj.latitude}, ${eventObj.longitude}`,
                        start: {
                            dateTime: (0, moment_1.default)(eventObj.fromDateTime).toISOString(),
                            timeZone: 'Asia/Rangoon'
                        },
                        end: {
                            dateTime: (0, moment_1.default)(eventObj.toDateTime).toISOString(),
                            timeZone: 'Asia/Rangoon'
                        },
                        attendees: attendees,
                        status: 'confirmed',
                        reminders: {
                            useDefault: false,
                            overrides: [
                                { method: 'email', minutes: eventObj.beforeReminder },
                                { method: 'popup', minutes: eventObj.beforeReminder },
                            ],
                        },
                        colorId: (eventObj === null || eventObj === void 0 ? void 0 : eventObj.color) || "5",
                    }
                });
                res.json({
                    success: true,
                    msg: "Event is created succeessfully"
                });
            }
            catch (e) {
                console.log("-----Create Event API error----", e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
                });
            }
        });
    }
    /**
     * update Event data.
     * @param eventObj
     */
    updateEvent(body, oldData, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('-------body', body);
                console.log('------oldData', oldData);
                // const updateEvent = await EventDbModel.update(eventObj, {
                //   where: { id: eventObj.id as number }
                // });
                const participants = oldData === null || oldData === void 0 ? void 0 : oldData.participants;
                const attendees = [];
                participants === null || participants === void 0 ? void 0 : participants.map((participant) => {
                    attendees.push({
                        email: participant
                    });
                });
                const calendar = yield googleapis_1.google.calendar({ version: 'v3', auth: passport_1.oauth2Client });
                (body === null || body === void 0 ? void 0 : body.eventName) ? oldData.summary = body === null || body === void 0 ? void 0 : body.eventName : null;
                (body === null || body === void 0 ? void 0 : body.location) ? oldData.location = body === null || body === void 0 ? void 0 : body.eventName : null;
                (oldData === null || oldData === void 0 ? void 0 : oldData.description) ? oldData.description = body === null || body === void 0 ? void 0 : body.description : null;
                if (body === null || body === void 0 ? void 0 : body.fromDateTime) {
                    oldData.start = {
                        dateTime: (0, moment_1.default)(body.fromDateTime).toISOString(),
                        timeZone: "Asia/Rangoon"
                    };
                }
                else {
                    oldData.start = {
                        dateTime: (0, moment_1.default)(oldData.start.dateTime).toISOString(),
                        timeZone: "Asia/Rangoon"
                    };
                }
                if (body === null || body === void 0 ? void 0 : body.toDateTime) {
                    oldData.end = {
                        dateTime: (0, moment_1.default)(body.toDateTime).toISOString(),
                        timeZone: "Asia/Rangoon"
                    };
                }
                else {
                    oldData.end = {
                        dateTime: (0, moment_1.default)(oldData.end.dateTime).toISOString(),
                        timeZone: "Asia/Rangoon"
                    };
                }
                (body === null || body === void 0 ? void 0 : body.status) ? oldData.status = body === null || body === void 0 ? void 0 : body.status : null;
                if ((body === null || body === void 0 ? void 0 : body.latitude) && (body === null || body === void 0 ? void 0 : body.longitude)) {
                    oldData.location = `${body.latitude}, ${body.longitude}`;
                }
                console.log('old Data-----', oldData);
                const id = oldData.id;
                delete oldData.id;
                const result = yield calendar.events.update({
                    calendarId: 'primary',
                    eventId: id,
                    auth: passport_1.oauth2Client,
                    requestBody: oldData
                });
                return res.json({
                    success: true,
                    message: 'Event is updated successfully'
                });
            }
            catch (e) {
                console.log('------update event error----', e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
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
                const calendar = yield googleapis_1.google.calendar({ version: 'v3', auth: passport_1.oauth2Client });
                // const detailEvent = await EventDbModel.findOne({
                //   where: {
                //     id
                //   },
                //   include: [
                //     {
                //       model: UserDbModel,
                //       through: { attributes: [] }
                //     }
                //   ]
                // }) as any;
                const detailEvent = yield calendar.events.get({
                    calendarId: 'primary',
                    eventId: id
                });
                if (!detailEvent) {
                    return res.status(400).json({
                        message: "Event is not found by this id"
                    });
                }
                // const removeEventData = await EventDbModel.destroy(
                //   {
                //     where: {
                //       id
                //     },
                //   }
                // );
                const removeEventData = yield calendar.events.delete({
                    calendarId: 'primary',
                    eventId: id
                });
                return res.json({
                    success: true,
                    message: `Delete Event is successful.`,
                    data: removeEventData
                });
            }
            catch (e) {
                console.log("Delete Event API Error", e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const eventData = await EventDbModel.findOne({
                //   where: {
                //     id: event_id
                //   },
                //   include: [
                //     {
                //       model: UserDbModel,
                //       through: { attributes: [] }
                //     }
                //   ]
                // }) as any;
                // console.log('Event Data', eventData);
                // if (!eventData) {
                //   return res.status(404).json({
                //     message: "Event data is not found by this id"
                //   });
                // }
                // eventData.dataValues.participants = eventData.dataValues.users;
                // delete eventData.dataValues.users;
                // let artists = eventData.dataValues?.artists;
                // if (artists) {
                //   const artistList = await UserDbModel.findAll({
                //     where: {
                //       id: artists
                //     }
                //   });
                //   eventData.dataValues.artists = artistList;
                // }
                const calendar = yield googleapis_1.google.calendar({ version: 'v3', auth: passport_1.oauth2Client });
                const detailEvent = yield calendar.events.get({
                    calendarId: 'primary',
                    eventId: event_id
                });
                const event = detailEvent.data;
                const start = ((_a = event === null || event === void 0 ? void 0 : event.start) === null || _a === void 0 ? void 0 : _a.dateTime) || (event === null || event === void 0 ? void 0 : event.start.date);
                const end = ((_b = event === null || event === void 0 ? void 0 : event.end) === null || _b === void 0 ? void 0 : _b.dateTime) || (event === null || event === void 0 ? void 0 : event.end.date);
                const data = {
                    id: event.id,
                    start,
                    end,
                    summary: event === null || event === void 0 ? void 0 : event.summary,
                    status: event === null || event === void 0 ? void 0 : event.status
                };
                console.log('---------data', data);
                // return res.json({
                //   success: true,
                //   data
                // })
                return data;
            }
            catch (e) {
                console.log("--Get Event By Id API Error---", e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
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
                    success: true,
                    data: eventData,
                    count: eventData.length
                });
            }
            catch (e) {
                console.log("--Upcoming Event API Error---", e);
                return res.status(400).json({
                    success: false,
                    message: e.toString()
                });
            }
        });
    }
}
exports.eventService = new EventService();
