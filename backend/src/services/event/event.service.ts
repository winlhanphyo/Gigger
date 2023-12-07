import sequelize from "sequelize";
import { FindOptions, Op, fn } from "sequelize";
import { google } from 'googleapis';
import passport from 'passport';
import moment from "moment";
import { IEventModel, EventDbModel, EventInputModel, UserDbModel } from "../../database";
import { EventUserDbModel } from "../../database/models/eventUser.model";
import { oauth2Client } from "../../config/passport";
import { eventNames } from "process";

class EventService {
  /**
   * get events list.
   * @param eventAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getEventList(eventAttributes?: Array<any>, otherFindOptions?: FindOptions, offset?: number, limit?: number, res?: any): Promise<any> {
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

      const list: any = [];
      const calendar = await google.calendar({ version: 'v3', auth: oauth2Client });
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: moment().toISOString(),
        maxResults: 30,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events: any = response.data.items;
      if (events?.length) {
        for (let i = 0; i < events?.length; i++) {
          const start = events[i]?.start?.dateTime || events[i]?.start.date;
          const end = events[i]?.end?.dateTime || events[i]?.end.date;
          list.push({
            id: events[i].id,
            start,
            end,
            summary: events[i]?.summary,
            status: events[i]?.status
          });
        }
      } else {
        console.log('No upcoming events found.');
      }
      return res.json({
        success: true,
        data: list,
        count: list.length
      });
    } catch (e: any) {
      console.log('------get event list API error----', e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  /**
   * create event data.
   * @param eventObj 
   * @returns 
   */
  async createEvent(eventObj: any, res: any) {
    try {
      const participants: any = eventObj.participants;
      const attendees: any = [];
      participants.map((participant: any) => {
        attendees.push({
          email: participant
        });
      });
      const calendar = await google.calendar({ version: 'v3', auth: oauth2Client });
      await calendar.events.insert({
        calendarId: "primary",
        auth: oauth2Client,
        requestBody: {
          summary: eventObj.eventName,
          description: eventObj.description,
          location: `${eventObj.latitude}, ${eventObj.longitude}`,
          start: {
            dateTime: moment(eventObj.fromDateTime).toISOString(),
            timeZone: 'Asia/Rangoon'
          },
          end: {
            dateTime: moment(eventObj.toDateTime).toISOString(),
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
          colorId: eventObj?.color || "5",
        }
      })

      res.json({
        success: true,
        msg: "Event is created succeessfully"
      });

    } catch (e: any) {
      console.log("-----Create Event API error----", e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  /**
   * update Event data.
   * @param eventObj 
   */
  async updateEvent(body: any, oldData: any, res: any): Promise<any> {
    try {
      console.log('-------body', body);
      console.log('------oldData', oldData);
      // const updateEvent = await EventDbModel.update(eventObj, {
      //   where: { id: eventObj.id as number }
      // });
      const participants: any = oldData?.participants;
      const attendees: any = [];
      participants?.map((participant: any) => {
        attendees.push({
          email: participant
        });
      });
      const calendar = await google.calendar({ version: 'v3', auth: oauth2Client });

      body?.eventName ? oldData.summary = body?.eventName : null;
      body?.location ? oldData.location = body?.eventName : null;
      oldData?.description ? oldData.description = body?.description : null;
      if (body?.fromDateTime) {
        oldData.start = {
          dateTime: moment(body.fromDateTime).toISOString(),
          timeZone: "Asia/Rangoon"
        };
      } else {
        oldData.start = {
          dateTime: moment(oldData.start.dateTime).toISOString(),
          timeZone: "Asia/Rangoon"
        }
      }
      if (body?.toDateTime) {
        oldData.end = {
          dateTime: moment(body.toDateTime).toISOString(),
          timeZone: "Asia/Rangoon"
        };
      } else {
        oldData.end = {
          dateTime: moment(oldData.end.dateTime).toISOString(),
          timeZone: "Asia/Rangoon"
        }
      }

      body?.status ? oldData.status = body?.status : null;
      if (body?.latitude && body?.longitude) {
        oldData.location = `${body.latitude}, ${body.longitude}`;
      }
      console.log('old Data-----', oldData);
      const id = oldData.id;
      delete oldData.id;

      const result = await calendar.events.update({
        calendarId: 'primary',
        eventId: id,
        auth: oauth2Client,
        requestBody: oldData
      });

      return res.json({
        success: true,
        message: 'Event is updated successfully'
      });
    } catch (e: any) {
      console.log('------update event error----', e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  /**
   * delete campaign.
   * @param req
   * @param res 
   * @returns 
   */
  async deleteEvent(req: any, res: any): Promise<EventDbModel> {
    try {
      const id = req.params.id;
      const calendar = await google.calendar({ version: 'v3', auth: oauth2Client });

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

      const detailEvent = await calendar.events.get({
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

      const removeEventData = await calendar.events.delete({
        calendarId: 'primary',
        eventId: id
      });

      return res.json({
        success: true,
        message: `Delete Event is successful.`,
        data: removeEventData
      });
    } catch (e: any) {
      console.log("Delete Event API Error", e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  /**
   * get Event by Id.
   * @param event_id 
   * @returns 
   */
  async getEventById(event_id: any, res: any): Promise<any> {
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

      const calendar = await google.calendar({ version: 'v3', auth: oauth2Client });
      const detailEvent: any = await calendar.events.get({
        calendarId: 'primary',
        eventId: event_id
      });
      const event: any = detailEvent.data;
      const start = event?.start?.dateTime || event?.start.date;
      const end = event?.end?.dateTime || event?.end.date;
      const data = {
        id: event.id,
        start,
        end,
        summary: event?.summary,
        status: event?.status
      }
      console.log('---------data', data);
      // return res.json({
      //   success: true,
      //   data
      // })
      return data;
    } catch (e: any) {
      console.log("--Get Event By Id API Error---", e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }

  /**
   * upcoming event.
   * @param userId 
   * @param res 
   * @returns 
   */
  async upComingEventList(userId: any, res: any) {
    try {
      const date = new Date();
      const startOfDateRange = new Date();
      const endOfDateRange = new Date(date.setDate(date.getDate() + 2));

      const eventData = await EventDbModel.findAll({
        where: {
          [Op.and]: [
            sequelize.literal(`DATE(date) >= '${startOfDateRange.toISOString()}'`),
            sequelize.literal(`DATE(date) <= '${endOfDateRange.toISOString()}'`),
            sequelize.or(
              { createdUser: userId },
              sequelize.where(
                sequelize.col('participants'),
                'LIKE',
                `%"${userId}"%`
              )
            ),
          ],
        },
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] },
          },
        ],
      }) as any;

      if (!eventData) {
        return res.status(200).json({
          data: [],
          count: 0
        });
      }
      eventData.dataValues.participants = eventData.dataValues.users;
      delete eventData.dataValues.users;

      let artists = eventData.dataValues?.artists;
      if (artists) {
        const artistList = await UserDbModel.findAll({
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
    } catch (e: any) {
      console.log("--Upcoming Event API Error---", e);
      return res.status(400).json({
        success: false,
        message: e.toString()
      });
    }
  }
}

export const eventService = new EventService();