import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { USER_VIDEO_PATH } from "./constant";


export const rootDir = path.join(__dirname, "../../" + USER_VIDEO_PATH);

export const deleteFile = (fileName: string) => {
  console.log('filename', fileName);
  fs.unlink(path.join(rootDir, fileName), (err) => {
    if (err) console.log(err);
  });
};

export const sendEmail = async (email: any, subject: any, text: any) => {
  try {
    console.log(process.env.USER, process.env.PASS);
    const transporter = nodemailer.createTransport({
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true, // use SSL
      // service: "gmail",
      // host: "oscar-admin.orionmmtecheng.com",
      // port: 465,
      // secure: true,
      // auth: {
      //   user: "support@oscar-admin.orionmmtecheng.com",
      //   pass: "M4tZjdsKYeTNKaWV"
      // },
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "spprt.oscar@gmail.com",
        pass: "cdbxlblhmnpobpyl"
      }
    });

    await transporter.sendMail({
      from: "spprt.oscar@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};