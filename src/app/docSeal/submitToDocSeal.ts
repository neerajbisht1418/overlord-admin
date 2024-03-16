// ./src/app/docSeal/submitToDocSeal.js
"use server"
import axios from 'axios';

export default async function submitToDocSeal(data: any) {
 const apiKey = process.env.NEXT_PUBLIC_API_KEY;
 const apiBaseUrl = 'https://api.docuseal.co';
 const apiLinkBaseUrl = 'https://docuseal.co'

 const options = {
  method: 'POST',
  url: `${apiBaseUrl}/submissions`,
  headers: {
   'X-Auth-Token': apiKey,
   'Content-Type': 'application/json',
   'Accept': 'application/json',
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
   'Access-Control-Allow-Headers': 'Content-Type',
  },
  data,
 };

 try {
  const response = await axios.request(options);
  console.log("response.data", response.data)
  const slug = response.data[0].slug
  const submissionUrl = `${apiLinkBaseUrl}/s/${slug}`;
  const submissionId = response.data[0].submission_id;
  const downloadUrl = `${apiBaseUrl}/submissions/${submissionId}`;
  const templateId = response.data[0].id

  // var option = {
  //  method: 'GET',
  //  url: `https://api.docuseal.co/submissions`,
  //  headers: { 'X-Auth-Token': process.env.NEXT_PUBLIC_API_KEY },
  // };

  // axios.request(option).then(function (response) {
  //  console.log("response.data", response.data);

  //  const pdfUrl = response?.data?.data?.foreach((ele: any) => ele.id === templateId)
  //  console.log(pdfUrl)

  // }).catch(function (error) {
  //  console.error(error);
  // });

  return {
   submissionUrl,
  };
 } catch (error: any) {
  console.error("error.message", error.message);
  throw error;
 }
}
