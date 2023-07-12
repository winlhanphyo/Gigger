import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { eventService } from '../../services/event';
import { IEventModel } from '../../database';

@autobind
class EventController {
/**
 * get all events data.
 * @param req 
 * @param res 
 * @returns 
 */
  async getAllEvent(req: Request, res: Response) {
    const event = await eventService.getEventList();
    return res.json({
      count: event.length,
      data: event
    });
  }

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
        message: 'User sign up successfully',
        data: result
      });
  }
}

export const eventController = new EventController();