import { PDFDocument, rgb } from 'pdf-lib';
import axios from 'axios';

async function insertDateIntoPDF(pdfUrl: string) {
 const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
 const existingPdfBytes = Buffer.from(response.data);
 const pdfDoc = await PDFDocument.load(existingPdfBytes);

 const pages = pdfDoc.getPages();
 const firstPage = pages[0];

 const today = new Date().toLocaleDateString();
 const publicationDate = "Publication Date: " + today;

 const { width, height } = firstPage.getSize();

 const paddingX = 50;
 const paddingY = 50;
 const textX = width - paddingX
 const textY = height - paddingY;

 firstPage.drawText(publicationDate, {
  x: paddingX,
  y: textY,
  size: 12,
  color: rgb(0, 0, 0),
 });

 const modifiedPdfBytes = await pdfDoc.save();
 return modifiedPdfBytes;
}

async function uploadFileToElement(selector: any, pdfUrl: any, document: any) {
 try {
  const modifiedPdfBytes = await insertDateIntoPDF(pdfUrl);

  const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'modified_file.pdf';
  downloadLink.style.display = 'none';

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  console.log("File uploaded successfully with date inserted");
 } catch (error: any) {
  console.log("Error uploading file:", error.message);
 }
}

export default uploadFileToElement; 