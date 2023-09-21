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

export const sendEmail = async (email: any, subject: any, html: any = false, text: any) => {
  try {
    console.log(process.env.USER, process.env.PASS);
    const transporter = nodemailer.createTransport({
      host: "gigger-api.orionmmtecheng.com",
      port: 465,
      secure: true, // use SSL
      // service: "gmail",
      auth: {
        user: "support@gigger-api.orionmmtecheng.com",
        pass: "a0CPCk6n}ho3"
      },
      // host: 'smtp.gmail.com',
      // port: 587,
      // secure: false,
      // auth: {
      //   user: "spprt.oscar@gmail.com",
      //   pass: "cdbxlblhmnpobpyl"
      // }
    });

    const mailObj: any = {
      from: "spprt.oscar@gmail.com",
      to: email,
      subject: subject
    };

    if (html) {
      mailObj.html = text;
    } else {
      mailObj.text = text;
    }

    await transporter.sendMail(mailObj);
  } catch (error) {
    console.log(error);
    throw error;
  }
};