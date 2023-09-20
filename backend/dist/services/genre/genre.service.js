"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreService = void 0;
const database_1 = require("../../database");
class GenreService {
    /**
     * get genre list.
     * @param genreAttributes
     * @param otherFindOptions
     * @returns
     */
    getGenreList(genreAttributes, otherFindOptions, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genre = yield database_1.GenreDbModel.findAll(Object.assign(Object.assign({}, otherFindOptions), { attributes: genreAttributes }));
                return res.json({
                    count: genre.length,
                    data: genre
                });
            }
            catch (e) {
                console.log('------get genre list API error----', e);
                return res.status(400).json({
                    msg: e.toString()
                });
            }
        });
    }
}
exports.genreService = new GenreService();
