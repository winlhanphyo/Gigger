import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { artistService } from '../../services/artist';
import { IArtistModel } from '../../database';
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
  async createArtist(req: Request, res: Response) {
    const artistData: IArtistModel = {
      artistName: req.body.artistName,
      profile: req.body.profile,
      highlight: req.body.highlight,
      address: req.body.address,
      description: req.body.description,
      status: req.body.status,
      liveURL: req.body.liveURL
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
   async updateArtist(req: Request, res: Response) {
    const id = +req.params.id
    const checkArtist = await artistService.getArtistById(id);

    if (!checkArtist) {
       return res.status(404).send("Artist is not found");
    }

    const artistData: IArtistModel = {
      artistName: req.body.artistName,
      profile: req.body.profile,
      highlight: req.body.highlight,
      address: req.body.address,
      description: req.body.description,
      status: req.body.status,
      liveURL: req.body.liveURL
    } as any;

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
}

export const artistController = new ArtistController();