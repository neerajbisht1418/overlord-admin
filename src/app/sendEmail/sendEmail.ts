"use server"
const nodemailer = require('nodemailer');

export async function sendEmail(data: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    });
    const emailLink = 'https://tally.so/r/wQM9xg'
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: data?.email,
      subject: 'Sending Email to the client',
      html: `
   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: start;">
   <p style="font-size: 18px; color: #333; margin-bottom: 15px;">Dear ${data?.clientName},</p>
   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
     I trust this email finds you well. I am writing to initiate a crucial step in the process of creating a tailored investment solution that aligns seamlessly with your financial goals and aspirations. At Overlord, we are fully committed to delivering exceptional value and personalized service to our esteemed clients.
   </p>
   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
     To ensure that we design an investment vehicle that precisely addresses your unique needs, we kindly request you to provide us with essential information through the following link: <a href="${emailLink}" target="_blank" style="color: #007bff; text-decoration: none;">${emailLink}</a>. This form has been meticulously crafted to gather insights into your financial objectives, risk tolerance, time horizon, and any other pertinent considerations.
   </p>
   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
     By sharing this information, you allow our team of experienced professionals to leverage their expertise in curating a solution that not only meets but exceeds your expectations. We understand that your financial journey is distinctive, and it is our commitment to tailor our offerings to your exact requirements.
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Should you have any queries or require assistance in completing the form, please do not hesitate to reach out to our dedicated client service team at g.demonclin@monclinassocies.fr .We are here to ensure a seamless and transparent process every step of the way.
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   We deeply appreciate your trust in Overlord as your partner in achieving financial success. Your collaboration in providing the requested information will significantly contribute to the efficiency and effectiveness of our endeavor.
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Thank you for entrusting us with this responsibility. We eagerly anticipate receiving your input through the provided link and look forward to working closely with you to shape your financial future.
   </p>
     
   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-top: 20px;">
     Best regards,<br>
     Gaspard De Monclin<br>
     CEO, Overlord
   </p>
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


