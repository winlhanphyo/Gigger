import { FindOptions } from "sequelize";
import { IEventModel, EventDbModel, EventInputModel, UserDbModel } from "../../database";
import { EventUserDbModel } from "../../database/models/eventUser.model";

class EventService {
  /**
   * get events list.
   * @param interestAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getEventList(eventAttributes?: Array<any>, otherFindOptions?: FindOptions, offset?: number, limit?: number): Promise<any> {
    try{
      limit = limit && limit > 0 ? limit : undefined;
      return EventDbModel.findAll({
        ...otherFindOptions,
        attributes: eventAttributes,
        limit,
        offset,
        include: [
          {
            model: UserDbModel,
            through: { attributes: [] },
            as: "users",
            attributes: [["id", "userId"]]
          }
        ]
      });
    } catch(e: any) {
      console.log('------get event list API error----', e);
      return e.toString();
    }
  }



  /**
   * create event data.
   * @param eventObj 
   * @returns 
   */
  async createEvent(eventObj: Partial<EventInputModel>): Promise<EventDbModel> {
    try {
      const participants: any = eventObj.participants;
      delete eventObj.participants;
      const createEvent = await EventDbModel.create({ ...eventObj, createdAt: new Date().toISOString() });
      const eventUserData: { eventId: any; userId: any; status: string; createdAt: any }[] = [];
  
      if (participants && participants.length > 0 && createEvent.dataValues.id) {
        await participants.map((userId: any) => {
          eventUserData.push({
            eventId: createEvent.dataValues.id,
            userId,
            status: "going",
            createdAt: new Date().toISOString()
          });
        });
        const createEventUser = await EventUserDbModel.bulkCreate(eventUserData);
      }
      return createEvent;
    } catch (e: any) {
      console.log("-----Create Event API error----", e);
      return e.toString();
    }
  }

  /**
   * update Event data.
   * @param eventObj 
   */
  async updateEvent(eventObj: Partial<IEventModel>): Promise<any> {
    try {
      const updateEvent = await EventDbModel.update(eventObj, {
        where: { id: eventObj.id as number }
      });
      return updateEvent;
    } catch (e: any) {
      console.log('------update event error----', e);
      return e.toString();
    }
  }

  /**
   * get Event by Id.
   * @param event_id 
   * @returns 
   */
  async getEventById(event_id: number): Promise<any> {
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
      eventData.dataValues.participants = eventData.dataValues.users;
      delete eventData.dataValues.users;
      return eventData;
    } catch (e: any) {
      console.log("--Get Event By Id API Error---", e);
      return e.toString();
    }
  }
}

export const eventService = new EventService();