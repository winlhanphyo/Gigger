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
    // const eventAttributes = ["id", "eventName", "address"];
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    const event = await eventService.getEventList(undefined, undefined, page, size);
    return res.json({
      count: event.length,
      data: event
    });
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
      color: req.body.color
    } as any;

    const result = await eventService.createEvent(eventData);

    res.json({
      message: 'Event is created successfully',
      data: result
    });
  }

  /**
   * update Event.
   * @param req 
   * @param res 
   * @returns 
   */
  async updateEvent(req: Request, res: Response) {
    const id = +req.params.id
    const checkEvent = await eventService.getEventById(id);

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
      color: req.body.color
    } as any;

    eventData.id = +req.params.id;
    const updateEventData = await eventService.updateEvent(eventData);

    res.json({
      message: 'Event is updated successfully',
      data: updateEventData
    });
  }

  /**
   * event Detail
   * @param req 
   * @param res 
   */
  async detailEvent(req: Request, res: Response) {
    const id = +req.params.id
    const eventData = await eventService.getEventById(id);
    res.json({
      data: eventData
    })
  }
}

export const eventController = new EventController();