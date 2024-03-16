"use server"
const nodemailer = require('nodemailer');

function createDocumentList(documents: any) {
  console.log("documents", documents)
  return Object.entries(documents)
    .filter(([key, value]) => value)
    .map(([key, value]) => {
      if (Array.isArray(value)) {

        if (value?.length < 1) {
          return ""
        }
        const documentLinks = value.map((document, index) => `
          <a href="${document?.Document}" target="_blank" rel="noopener noreferrer" style="display: inline-block; border-radius:10px; padding: 10px 15px; margin: 5px; background-color: #4CAF50; color: white; text-align: center; text-decoration: none; font-size: 16px; cursor: pointer;">
            View Document ${index + 1}
          </a>
        `);
        return `<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;"><strong>${key}:</strong> ${documentLinks.join(', ')}</p>`;
      } else if (typeof value === 'string') {
        return `<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
        <strong>${key}:</strong>
        <a href="${value}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 15px; border-radius:10px; background-color: #4CAF50; color: white; text-align: center; text-decoration: none; font-size: 16px; cursor: pointer;">
          View Document
        </a>
      </p>`;
      }

      return '';
    })
    .join('\n');
}

export async function sendEmailToJoinStockCompany(data: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    });

    const legalRepresentativeName = data?.legalRepresentativeName
    const physicalPersonName = data?.physicalPersonName
    const physicalPersonFamilyName = data?.physicalPersonFamilyName

    const currentDate = new Date();
    const options: any = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = currentDate.toLocaleString('en-US', options).replace(/ GMT[+-]\d{4} \(.*\)$/, '');

    const detailHTML = `
    ${legalRepresentativeName ? (
        '<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px; font-style: italic;">' +
        `Name: ${legalRepresentativeName}` +
        '</p>' +
        '<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px; font-style: italic;">' +
        `${formattedDate}` +
        '</p>'
      ) : (
        '<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px; font-style: italic;">' +
        `Name: ${physicalPersonName}` +
        '</p>' +
        '<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px; font-style: italic;">' +
        `Father Name: ${physicalPersonFamilyName}` +
        '</p>' +
        '<p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px; font-style: italic;">' +
        `${formattedDate}` +
        '</p>'
      )}
  `;


    const documentListHTML = createDocumentList(data?.documents);

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: data?.email,
      cc: "overlord-admin-cc@yopmail.com",
      subject: 'Sending Email to Dépôt de capital SPIM',
      html: `
   
   <p style="font-size: 18px; color: #333; margin-bottom: 15px;">Objet : Dépôt de capital SPIM</p>
   <p style="font-size: 18px; color: #333; margin-bottom: 15px;">Cher Monsieur,</p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Je vous soumets par cet e-mail une demande d'ouverture de compte de dépôt de capital auprès du SPIM.
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Veuillez trouver ci-joint toute la documentation nécessaire à l'ouverture dudit compte, à savoir :
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   projet de statuts (avec la mention relative au dépôt des sommes correspondant au capital social sur un compte CARPA),
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   une copie de la pièce d'identité des bénéficiaires effectifs de la société,
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Kbis et RBE des actionnaires ; Et
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   la liste des abonnés signés.
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Je vous remercie beaucoup pour votre diligence et reste à votre entière disposition pour tout renseignement complémentaire.
   </p>
     
   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-top: 20px;">
     Bien pour vous,,<br>
     Gaspard De Monclin<br>
     Avocat
   </p>

   <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 15px;">
   Veuillez trouver ci-joint toute la documentation nécessaire à l'ouverture dudit compte, à savoir :
   </p>
 ${documentListHTML}

 ${detailHTML}
   

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


