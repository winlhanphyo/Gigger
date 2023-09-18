import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { eventService } from '../../services/event';
import { IEventModel } from '../../database';
import { PAGINATION_LIMIT } from '../../utils/constant';

@autobind
class EventController {
  /**
   * get all events data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllEvent(req: Request, res: Response) {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    const response = await eventService.getEventList(undefined, undefined, page, size, res);
    return response;
  }

  /**
   * create Event.
   * @param req 
   * @param res 
   */
  async createEvent(req: Request, res: Response) {
    const eventData: IEventModel = {
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
    } as any;

    const result = await eventService.createEvent(eventData, res);
    return result;
  }

  /**
   * update Event.
   * @param req 
   * @param res 
   * @returns 
   */
  async updateEvent(req: Request, res: Response) {
    const id = +req.params.id;
    console.log('update id----------', id);
    const checkEvent = await eventService.getEventById(id, res);

    if (!checkEvent) {
      return res.status(404).send("Event is not found");
    }

    const eventData: IEventModel = {
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
    } as any;

    eventData.id = +req.params.id;
    const updateEventData = await eventService.updateEvent(eventData, res);
    return updateEventData;
  }

  /**
    * delete event.
    * @param req 
    * @param res 
    */
  deleteEvent(req: any, res: any) {
    const data = eventService.deleteEvent(req, res);
    return data;
  }

  /**
   * event Detail
   * @param req 
   * @param res 
   */
  async detailEvent(req: Request, res: Response) {
    const id = +req.params.id
    const eventData = await eventService.getEventById(id, res);
    return eventData;
  }

  async upComingEvent(req: Request, res: Response) {
    const userId = req.headers['userid'];
    console.log('upComing event---------controller', userId);
    if (userId) {
      const eventData = await eventService.upComingEventList(userId, res);
      return eventData;
    } else {
      res.status(400).send({
        "msg": "Please add login userId in request header"
      });
    }
  }
}

export const eventController = new EventController();