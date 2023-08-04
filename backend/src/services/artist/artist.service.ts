import { IArtistModel, ArtistDbModel, UserVideoDbModel, GenreDbModel } from "../../database";
import { VideoDbModel } from "../../database/models/video.model";
import { PAGINATION_LIMIT } from "../../utils/constant";
import { deleteFile } from '../../utils/utils';

class ArtistService {
  /**
   * get artists list.
   * @param artistAttributes 
   * @param otherFindOptions 
   * @returns 
   */
  async getArtistList(req: any, res: any): Promise<any> {
    try {
      const offset = Number(req.query.page) || 0;
      const limit = Number(req.query.size) || PAGINATION_LIMIT;
      const artistList = await ArtistDbModel.findAll({
        limit,
        offset,
        // include: [
        //   {
        //     model: VideoDbModel,
        //     through: { attributes: [] }
        //   }
        // ]
      }) as any;
      for (let i = 0; i < artistList.length; i++) {
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
      return res.json({
        count: artistList.length,
        data: artistList
      });
    } catch (e: any) {
      console.log('------get Artist API Error----', e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * create artist data.
   * @param req
   * @param res
   * @returns 
   */
  async createArtist(req: any, res: any): Promise<ArtistDbModel> {
    try {
      let profile: string = req.body.profile;
      const id = +req.params.id;
      if (req.files?.profile?.length > 0) {
        profile = req.files.profile[0].path.replaceAll("\\", "/");
      }

      const artistData: IArtistModel = {
        artistName: req.body.artistName,
        profile,
        highlight: req.body.highlight,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status
      } as any;
      const createArtist = await ArtistDbModel.create({ ...artistData, createdAt: new Date().toISOString() });
      return res.json({
        message: 'Artist is created successfully',
        data: createArtist
      });
    } catch (e: any) {
      console.log("Create Artist API Error", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * update Artist data.
   * @param req
   * @param res
   */
  async updateArtist(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id
      const checkArtist = await this.getArtistById(req, res);
      if (!checkArtist) {
        return res.status(404).json({
          msg: "Artist is not found"
        });
      }

      const artistData: IArtistModel = {
        artistName: req.body.artistName,
        highlight: req.body.highlight,
        address: req.body.address,
        description: req.body.description,
        status: req.body.status
      } as any;

      let profile: any = req.body.profile;
      if (req.files?.profile?.length > 0) {
        profile = req.files.profile[0].path.replace("\\", "/");
        if (checkArtist.profile && checkArtist.profile != profile) {
          deleteFile(checkArtist.profile);
        }
        if (checkArtist) {
          artistData.profile = profile;
        }
      }

      artistData.id = +req.params.id;
      const updateArtist = await ArtistDbModel.update(artistData, {
        where: { id: artistData.id as number }
      });
      return updateArtist;
    } catch (e: any) {
      console.log("Create Artist API Error", e);
      return res.status(400).json({
        msg: e.toString()
      });
    }
  }

  /**
   * get Artist by Id.
   * @param req
   * @param res
   * @returns 
   */
  async getArtistById(req: any, res: any): Promise<any> {
    try {
      const id = +req.params.id;
      const artistData = await ArtistDbModel.findOne({
        where: {
          id
        },
        // include: [
        //   {
        //     model: VideoDbModel,
        //     through: { attributes: [] }
        //   }
        // ]
      }) as any;
      console.log('artist data', artistData);
      if (!artistData) {
        return res.status(404).json({
          msg: "Artist data is not found by this id"
        });
      }
      let genre = artistData.dataValues?.genre;
      if (genre) {
        const genreList = await GenreDbModel.findAll({
          where: {
            id: genre
          }
        });
        artistData.dataValues.genre = genreList;
      }
      return res.json({
        data: artistData
      });
    } catch (e: any) {
      console.log("--Get Artist By Id API Error---", e);
      return res.status(400).json({
        msg: e.toString(),
      });
    }
  }
}

export const artistService = new ArtistService();