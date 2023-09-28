import fs from "fs";
import nodemailer from "nodemailer";

export const deleteFile = (filePath: string) => {
  console.log('filename', filePath);
  fs.unlink(filePath, (err: any) => {
    if (err) console.log(err);
  });
};

export const sendEmail = async (email: any, subject: any, html: any = false, text: any) => {
  try {
    console.log(process.env.USER, process.env.PASS);
    const transporter = nodemailer.createTransport({
      host: "gigger-api.orionmmtecheng.com",
      port: 465,
      secure: true,
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

      // host: "oscar-admin.orionmmtecheng.com",
      // port: 465,
      // secure: true,
      // auth: {
      //   user: "support@oscar-admin.orionmmtecheng.com",
      //   pass: "M4tZjdsKYeTNKaWV"
      // },
    });

    const mailObj: any = {
      from: "support@gigger-api.orionmmtecheng.com",
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