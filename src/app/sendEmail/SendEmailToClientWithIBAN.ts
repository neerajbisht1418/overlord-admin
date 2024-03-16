"use server"

const nodemailer = require('nodemailer');

export async function SendEmailToClientWithIBAN(props: any) {

  const data = props?.answers

  // if (!!!data?.iBANDocument) {
  //   return { status: 'error', message: 'Error sending email' };
  // }

  if (props.isEmailType === "IBANsendToClient") {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        }
      });

      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: data?.email || "overlord-admin-cc@yopmail.com",
        subject: 'Sending Email to the client',
        html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: start;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: start;">
         <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
          Cher Monsieur,
         </p>
         <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
          Je vous invite à trouver en annexe le RIB établi dans cette affaire.
         </p>
         <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
          Cordialement.
         </p>
         <p><a href="${data.iBANDocument}" target="_blank">View Document</a></p>
        </div>
       </div>
     `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return { status: 'success', message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { status: 'error', message: 'Error sending email' };
    }
  }


  if (props.isEmailType === "sendEmail (In case the money has not been sent)") {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        }
      });

      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: data?.email || "overlord-admin-cc@yopmail.com",
        subject: 'Sending Email to the client',
        html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: start;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: start;">
         <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
          Cher Monsieur,
         </p>
         <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
         Ceci est un rappel pour que vous déposiez votre argent dans l'annexe suivante du RIB.
         </p>
         <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
          Cordialement.
         </p>
         <p><a href="${data.iBANDocument}" target="_blank">View Document</a></p>
        </div>
       </div>
     `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return { status: 'success', message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { status: 'error', message: 'Error sending email' };
    }
  }




}
