import { Response, Request } from 'express';
import autobind from 'autobind-decorator';

import { artistService } from '../../services/artist';
import { IVideoModel } from '../../database';

@autobind
class ArtistController {
  /**
   * get all artists data.
   * @param req 
   * @param res 
   * @returns 
   */
  async getAllArtist(req: Request, res: Response) {
    const artist = await artistService.getArtistList(req, res);
    return artist;
  }

  /**
   * create artist.
   * @param req 
   * @param res 
   */
  async createArtist(req: any, res: Response) {
    const result = await artistService.createArtist(req, res);
    return result;
  }

  /**
   * update Artist.
   * @param req 
   * @param res 
   * @returns 
   */
   async updateArtist(req: any, res: Response) {
    const updateArtistData = await artistService.updateArtist(req, res);
    return updateArtistData;
  }

  /**
   * artist Detail
   * @param req 
   * @param res 
   */
  async detailArtist(req: Request, res: Response) {
    const artistData = await artistService.getArtistById(req, res);
    return artistData;
  }
}

export const artistController = new ArtistController();