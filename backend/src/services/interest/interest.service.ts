import { FindOptions } from "sequelize";

import { IInterestModel, InterestDbModel } from "../../database";
class InterestService {

  /**
   * get interests list.
   * @param interestAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  getInterestList(interestAttributes?: Array<keyof IInterestModel>, otherFindOptions?: FindOptions): Promise<any> {
    return InterestDbModel.findAll({
      ...otherFindOptions,
      attributes: interestAttributes
    });
  }
}

export const interestService = new InterestService();