import sequelize from "sequelize";
import { FindOptions, Op, fn } from "sequelize";
import { IEventModel, EventDbModel, EventInputModel, UserDbModel, ArtistDbModel } from "../../database";
import { EventUserDbModel } from "../../database/models/eventUser.model";

class EventService {
  /**
   * get events list.
   * @param eventAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getEventList(eventAttributes?: Array<any>, otherFindOptions?: FindOptions, offset?: number, limit?: number, res?: any): Promise<any> {
    try {
      limit = limit && limit > 0 ? limit : undefined;
      let eventList = await EventDbModel.findAll({
        ...otherFindOptions,
        attributes: eventAttributes,
        limit,
        offset,
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] },
            as: "users",
            attributes: []
          }
        ]
      });
      for (let i = 0; i < eventList.length; i++) {
        let artists = eventList[i].dataValues?.artists;
        if (artists) {
          const artistList = await ArtistDbModel.findAll({
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

    } catch (e: any) {
      console.log('------get event list API error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * create event data.
   * @param eventObj 
   * @returns 
   */
  async createEvent(eventObj: Partial<EventInputModel>, res: any): Promise<EventDbModel> {
    try {
      const participants: any = eventObj.participants;
      delete eventObj.participants;
      const createEvent = await EventDbModel.create({ ...eventObj, createdAt: new Date().toISOString() });
      const eventUserData: { eventId: any; userId: any; status: string; createdAt: any }[] = [];

      if (participants && participants.length > 0 && createEvent?.dataValues?.id) {
        await participants.map((userId: any) => {
          eventUserData.push({
            eventId: createEvent.dataValues.id,
            userId,
            status: "going",
            createdAt: new Date().toISOString()
          });
        });
        const createEventUser = await EventUserDbModel.bulkCreate(eventUserData);
        res.json({
          message: 'Event is created successfully',
          data: createEventUser
        });
      }
      return createEvent;
    } catch (e: any) {
      console.log("-----Create Event API error----", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * update Event data.
   * @param eventObj 
   */
  async updateEvent(eventObj: Partial<IEventModel>, res: any): Promise<any> {
    try {
      const updateEvent = await EventDbModel.update(eventObj, {
        where: { id: eventObj.id as number }
      });
      return res.json({
        message: 'Event is updated successfully',
        data: updateEvent
      });
    } catch (e: any) {
      console.log('------update event error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * get Event by Id.
   * @param event_id 
   * @returns 
   */
  async getEventById(event_id: number, res: any): Promise<any> {
    try {
      const eventData = await EventDbModel.findOne({
        where: {
          id: event_id
        },
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] }
          }
        ]
      }) as any;
      console.log('Event Data', eventData);
      if (!eventData) {
        return res.status(404).json({
          msg: "Event data is not found by this id"
        });
      }
      eventData.dataValues.participants = eventData.dataValues.users;
      delete eventData.dataValues.users;

      let artists = eventData.dataValues?.artists;
      if (artists) {
        const artistList = await ArtistDbModel.findAll({
          where: {
            id: artists
          }
        });
        eventData.dataValues.artists = artistList;
      }
      return res.json({
        data: eventData
      })
    } catch (e: any) {
      console.log("--Get Event By Id API Error---", e);
      return res.status(400).json({
        msg: e.toString()
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
        const artistList = await ArtistDbModel.findAll({
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
    } catch (e: any) {
      console.log("--Upcoming Event API Error---", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }
}

export const eventService = new EventService();