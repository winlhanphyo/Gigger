import { FindOptions } from "sequelize";
import { IGenreModel, GenreDbModel } from "../../database";
class GenreService {

  /**
   * get genre list.
   * @param genreAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getGenreList(genreAttributes?: Array<keyof IGenreModel>, otherFindOptions?: FindOptions, res?: any): Promise<any> {
    try {
      const genre = await GenreDbModel.findAll({
        ...otherFindOptions,
        attributes: genreAttributes
      });
      return res.json({
        count: genre.length,
        data: genre
      });
    } catch (e: any) {
      console.log('------get genre list API error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }
}

export const genreService = new GenreService();