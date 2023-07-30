import { FindOptions } from "sequelize";
import { IArtistModel, ArtistDbModel, ArtistVideoDbModel, GenreDbModel } from "../../database";
import { VideoDbModel } from "../../database/models/video.model";

class ArtistService {
  /**
   * get artists list.
   * @param artistAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getArtistList(artistAttributes?: Array<keyof IArtistModel>, otherFindOptions?: FindOptions, offset?: number, limit?: number): Promise<any> {
    try {
      limit = limit && limit > 0 ? limit : undefined;
      const artistList = await ArtistDbModel.findAll({
        ...otherFindOptions,
        attributes: artistAttributes,
        limit,
        offset,
        include: [
          {
            model: VideoDbModel,
            through: { attributes: [] }
          }
        ]
      }) as any;
      for (let i = 0; i < artistList.length; i++) {
        console.log('artist', artistList[i].dataValues.genre);
        let genre = artistList[i].dataValues?.genre;
        if (genre) {
          const genreList = await GenreDbModel.findAll({
            where: {
              id: genre
            }
          });
          artistList[i].dataValues.genre = genreList;
        }
      }
      return artistList;
    } catch (e: any) {
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
   * create artist video to upload.
   * @param artistId
   * @param artistVideoObj 
   * @returns 
   */
  async createArtistVideo(artistId: number, artistVideoObj: Partial<any>): Promise<ArtistDbModel> {
    try {
      const createVideo = await VideoDbModel.create({ ...artistVideoObj, createdAt: new Date().toISOString() });

      if (createVideo?.dataValues?.id) {
        const createArtistVideoData = await ArtistVideoDbModel.create({
          artistId,
          videoId: createVideo?.dataValues?.id
        });
        console.log("--------create Artist--------", createArtistVideoData);
      }
      return createVideo;
    } catch (e: any) {
      console.log("Create Artist API Error", e);
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
        include: [
          {
            model: VideoDbModel,
            through: { attributes: [] }
          }
        ]
      }) as any;
      let genre = artistData.dataValues?.genre;
      if (genre) {
        const genreList = await GenreDbModel.findAll({
          where: {
            id: genre
          }
        });
        artistData.dataValues.genre = genreList;
      }
      return artistData;
    } catch (e: any) {
      console.log("--Get Artist By Id API Error---", e);
      return e.toString();
    }
  }
}

export const artistService = new ArtistService();