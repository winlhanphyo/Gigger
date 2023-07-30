import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { deleteFile } from '../../utils/utils';
import { artistService } from '../../services/artist';
import { IArtistModel, IVideoModel } from '../../database';
import { PAGINATION_LIMIT } from '../../utils/constant';

@autobind
class ArtistController {
  /**
   * get all artists data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllArtist(req: Request, res: Response) {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || PAGINATION_LIMIT;
    const artist = await artistService.getArtistList(undefined, undefined, page, size);
    return res.json({
      count: artist.length,
      data: artist
    });
  }

  /**
   * create artist.
   * @param req 
   * @param res 
   */
  async createArtist(req: any, res: Response) {
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
    const result = await artistService.createArtist(artistData);
    res.json({
      message: 'Artist is created successfully',
      data: result
    });
  }

  /**
   * update Artist.
   * @param req 
   * @param res 
   * @returns 
   */
   async updateArtist(req: any, res: Response) {
    const id = +req.params.id
    const checkArtist = await artistService.getArtistById(id);

    if (!checkArtist) {
       return res.status(404).send("Artist is not found");
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
    const updateArtistData = await artistService.updateArtist(artistData);

    res.json({
      message: 'Artist data is updated successfully',
      data: updateArtistData
    });
  }

  /**
   * artist Detail
   * @param req 
   * @param res 
   */
  async detailArtist(req: Request, res: Response) {
    const id = +req.params.id
    const artistData = await artistService.getArtistById(id);
    res.json({
      data: artistData
    })
  }

  /**
   * create Artist Video.
   * @param req 
   * @param res 
   */
  async createArtistVideo(req: any, res: Response) {
    try {
      let video: string = "";
      const id = +req.params.id;
      console.log('--------video------------', req.body.files);
      if (req.files?.video?.length > 0) {
        video = req.files.video[0].path.replaceAll("\\", "/");
      }
  
      const artistData: IVideoModel = {
        name: req.body.name,
        description: req.body.description,
        url: req.body.video
      } as any;
  
      const result = await artistService.createArtistVideo(id, artistData);
      res.json({
        message: 'Artist video is created successfully',
        data: result
      });
    } catch (err) {
      console.log('-------Create Artist Video Error---------');
      console.log(err);
    }
  }
}

export const artistController = new ArtistController();