import { FindOptions } from "sequelize";
import { IArtistModel, ArtistDbModel } from "../../database";

class ArtistService {
  /**
   * get artists list.
   * @param artistAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getArtistList(artistAttributes?: Array<keyof IArtistModel>, otherFindOptions?: FindOptions, offset?: number, limit?: number): Promise<any> {
    try{
      limit = limit && limit > 0 ? limit : undefined;
      const res = await ArtistDbModel.findAll({
        ...otherFindOptions,
        attributes: artistAttributes,
        limit,
        offset
      });
      return res;
    } catch(e: any) {
      console.log('------get Artist API Error----', e);
      return e.toString();
    }
  }

  /**
   * create artist data.
   * @param artistObj 
   * @returns 
   */
  async createArtist(artistObj: Partial<IArtistModel>): Promise<ArtistDbModel> {
    try {
      const createArtist = await ArtistDbModel.create({ ...artistObj, createdAt: new Date().toISOString() });
      console.log("--------create Artist--------", createArtist);
      return createArtist;
    } catch (e: any) {
      console.log("Create Artist API Error", e);
      return e.toString();
    }
  }

  /**
   * update Artist data.
   * @param artistObj
   */
   async updateArtist(artistObj: Partial<IArtistModel>): Promise<any> {
    try {
      const updateArtist = await ArtistDbModel.update(artistObj, {
        where: { id: artistObj.id as number }
      });
      return updateArtist;
    } catch (e: any) {
      console.log('------update artist error----', e);
      return e.toString();
    }
  }

  /**
   * get Artist by Id.
   * @param artist_id 
   * @returns 
   */
  async getArtistById(artist_id: number): Promise<any> {
    try {
      const artistData = await ArtistDbModel.findOne({
        where: {
          id: artist_id
        },
        // include: [
        //   {
        //     model: UserDbModel,
        //     through: { attributes: [] }
        //   }
        // ]
      }) as any;
      // artistData.dataValues.participants = artistData.dataValues.users;
      // delete artistData.dataValues.users;
      return artistData;
    } catch (e: any) {
      console.log("--Get Artist By Id API Error---", e);
      return e.toString();
    }
  }
}

export const artistService = new ArtistService();