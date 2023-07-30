import { FindOptions } from "sequelize";

import { IGenreModel, GenreDbModel } from "../../database";
class GenreService {

  /**
   * get genre list.
   * @param genreAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  getGenreList(genreAttributes?: Array<keyof IGenreModel>, otherFindOptions?: FindOptions): Promise<any> {
    return GenreDbModel.findAll({
      ...otherFindOptions,
      attributes: genreAttributes
    });
  }
}

export const genreService = new GenreService();