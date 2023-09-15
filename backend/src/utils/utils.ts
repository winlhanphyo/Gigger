import path from "path";
import fs from "fs";
import { USER_VIDEO_PATH } from "./constant";


export const rootDir = path.join(__dirname, "../../" + USER_VIDEO_PATH);

export const deleteFile = (fileName: string) => {
  console.log('filename', fileName);
  fs.unlink(path.join(rootDir, fileName), (err) => {
    if (err) console.log(err);
  });
};