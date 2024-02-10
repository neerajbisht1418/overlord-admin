// src/app/api/automate-form.js
"use server"

export async function automateFormTwo() {
 const puppeteer = require('puppeteer');

 const browser = await puppeteer.launch({ headless: false });
 const page = await browser.newPage();

 try {
  await page.goto('https://www.annonces-legales.fr/constitution-societe-commerciale/constitution-sas/step-2');

  const pageData = await page.evaluate(() => {
   return {
    html: document.documentElement.innerHTML,
   };
  });

  await page.waitForSelector('.form-field-line .MuiFormControl-root #civility', { visible: true, timeout: 5000 });
  await page.evaluate(() => {
   const civilityRadioGroup = document.querySelector('.form-field-line .MuiFormControl-root #civility');
   if (civilityRadioGroup) {
    const radioButtonM = civilityRadioGroup.querySelector('input[value="M"]');
    if (radioButtonM) {
     radioButtonM.click();
    }
   }
  });



  await page.waitForSelector('input#lastName', { timeout: 5000 });
  await page.type('input#lastName', 'De Monclin');

  await page.waitForSelector('input#firstName', { timeout: 5000 });
  await page.type('input#firstName', 'Gaspard');

  // await page.waitForSelector('input#companyName', { timeout: 5000 });
  // await page.type('input#companyName', 'Example Company');

  // await page.waitForSelector('input#companyRegistrationNumber', { timeout: 5000 });
  // await page.type('input#companyRegistrationNumber', '123456789');

  await page.waitForSelector('input[name="address.street"]', { timeout: 5000 });
  await page.type('input[name="address.street"]', '32 A Avenue Pierre Semard');


  // await page.waitForSelector('input[name="address.street2"]', { timeout: 5000 });
  // await page.type('input[name="address.street2"]', 'Apt 101');

  await page.waitForSelector('input[name="living_abroad"][value="yes"]', { timeout: 5000 });
  await page.click('input[name="living_abroad"][value="yes"]');

  await page.waitForSelector('input[name="address.zipCode"]', { visible: true, timeout: 5000 });
  await page.type('input[name="address.zipCode"]', '94200');

  await page.waitForSelector('select[name="city"]', { timeout: 5000 });
  await page.select('select[name="city"]', 'Ivry-sur-Seine');

  await page.waitForSelector('input#email', { visible: true, timeout: 5000 });
  await page.type('input#email', 'g.demonclin@monclinassocies.fr');

  await page.waitForSelector('input#emailConfirmation', { visible: true, timeout: 5000 });
  await page.type('input#emailConfirmation', 'g.demonclin@monclinassocies.fr');

  await page.waitForSelector('.form-control[type="tel"][placeholder="1 (702) 123-4567"]', { visible: true, timeout: 5000 });
  await page.type('.form-control[type="tel"][placeholder="1 (702) 123-4567"]', '618448222');

  await page.waitForSelector('input[name="termsAccepted"]', { timeout: 5000 });
  await page.evaluate(() => {
   const checkbox = document.querySelector('input[name="termsAccepted"]');
   if (checkbox) {
    checkbox.click()
    checkbox.dispatchEvent(new Event('change'));
   }
  });

  await page.waitForSelector('input[name="noCommercialOffers"]', { timeout: 5000 });
  await page.evaluate(() => {
   const checkbox = document.querySelector('input[name="noCommercialOffers"]');
   if (checkbox) {
    checkbox.click()
    checkbox.dispatchEvent(new Event('change'));
   }
  });

  try {
   await page.waitForSelector('button[type="button"].mdc-button.mdc-button--raised.large', { visible: true, timeout: 5000 });
   await page.click('button[type="button"].mdc-button.mdc-button--raised.large');
   console.log("Clicked on the 'Passer au règlement' button.");
  } catch (error) {
   console.error("Error occurred while clicking the button:", error);
  }


  console.log('Form fields-2 filled successfully.');
  return true;

 } catch (error) {
  console.error('Error automating form:', error);
  return false;
 } finally {
  // await browser.close();
 }
}

