import { Response, Request } from 'express';
import autobind from 'autobind-decorator';
import { genreService } from '../../services/genre';

@autobind
class GenreController {
/**
 * get all intersts data.
 * @param req 
 * @param res 
 * @returns 
 */
  async getAllGenre(req: Request, res: Response) {
    const genre = await genreService.getGenreList();
    return res.json({
      count: genre.length,
      data: genre
    });
  }
}

export const genreController = new GenreController();