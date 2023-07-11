import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { interestService } from '../../services/interest';

@autobind
class InterestController {
/**
 * get all intersts data.
 * @param req 
 * @param res 
 * @returns 
 */
  async getAllInterest(req: Request, res: Response) {
    const interest = await interestService.getInterestList();
    return res.json({
      count: interest.length,
      data: interest
    });
  }
}

export const interestController = new InterestController();