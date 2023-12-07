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
    let offset = Number(req.query.page) - 1 || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    let page = offset * size;
    const response = await eventService.getEventList(undefined, undefined, page, size, res);
    return response;
  }

  // /**
  //  * get other user event.
  //  * @param req 
  //  * @param res 
  //  */
  // async getOtherUserEvent(req: Request, res: Response) {
  //   let offset = Number(req.query.page) - 1 || 0;
  //   const size = Number(req.query.size) || PAGINATION_LIMIT;
  //   let page = offset * size;
  //   const response = await eventService.getOtherUserEvent(undefined, undefined, page, size, res);
  //   return response;
  // }

  /**
   * create Event.
   * @param req 
   * @param res 
   */
  async createEvent(req: Request, res: Response) {
    console.log('create event------------');
    const eventData: IEventModel = {
      eventName: req.body.eventName,
      fromDateTime: req.body.fromDateTime,
      toDateTime: req.body.toDateTime,
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
    const id = req.params.id;
    console.log('Event Data by id', id);
    const checkEvent = await eventService.getEventById(id, res);
    const oldData = checkEvent;

    if (!oldData) {
      return res.status(404).send("Event is not found");
    }

    const data = req.body;
    const updateEventData = await eventService.updateEvent(data, oldData, res);
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
   * detail user event.
   * @param req 
   * @param res 
   */
  async detailEvent(req: Request, res: Response) {
    const id = req.params.id
    const eventData = await eventService.getEventById(id, res);
    return res.json({
      success: true,
      data: eventData
    })
  }

  /**
   * upcoming event.
   * @param req 
   * @param res 
   * @returns 
   */
  async upComingEvent(req: Request, res: Response) {
    const userId = req.headers['userid'];
    console.log('upComing event---------controller', userId);
    if (userId) {
      const eventData = await eventService.upComingEventList(userId, res);
      return eventData;
    } else {
      res.status(400).send({
        "message": "Please add login userId in request header"
      });
    }
  }
}

export const eventController = new EventController();