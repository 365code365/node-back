import * as nodemailer from 'nodemailer';
import {Transporter} from 'nodemailer';

export default class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // 使用 SSL
      auth: {
        user: '896696554@qq.com',
        pass: 'wopiwqiocvecbded', // 使用生成的授权码
      },
    });
  }

  async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
