import { FindOptions } from "sequelize";
import { IEventModel, EventDbModel } from "../../database";

class EventService {
  /**
   * get events list.
   * @param interestAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  getEventList(eventAttributes?: Array<keyof IEventModel>, otherFindOptions?: FindOptions): Promise<any> {
    return EventDbModel.findAll({
      ...otherFindOptions,
      attributes: eventAttributes
    });
  }

  async createEvent(eventObj: Partial<IEventModel>): Promise<EventDbModel> {
    const createEvent = await EventDbModel.create({ ...eventObj, createdAt: new Date().toISOString() });
    console.log(createEvent);
    return createEvent;
  }
}

export const eventService = new EventService();