// src/app/api/automate-form.js
"use server"

export async function automateForm() {
 const puppeteer = require('puppeteer');

 const browser = await puppeteer.launch({ headless: false });
 const page = await browser.newPage();

 try {
  await page.goto('https://www.annonces-legales.fr/constitution-societe-commerciale/constitution-sas');

  const pageData = await page.evaluate(() => {
   return {
    html: document.documentElement.innerHTML,
   };
  });

  await page.waitForSelector('input[name="rel_president.address.street"]', { timeout: 5000 });
  await page.type('input[name="rel_president.address.street"]', 'Your address Number');

  await page.waitForSelector('select[name="deed_nature"]', { timeout: 5000 });
  await page.select('select[name="deed_nature"]', 'notarial');

  await page.click('input#deed_sign_date');
  await page.waitForSelector('.flatpickr-calendar');
  const currentDate = new Date()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = String(currentDate.getFullYear());

  const desiredDate = `${day}/${month}/${year}`;
  await page.$eval('input#deed_sign_date', (element, date) => {
   element.value = date;
  }, desiredDate);



  await page.waitForSelector('select[name="legal_form"]', { timeout: 5000 });
  await page.select('select[name="legal_form"]', 'CF');

  await page.waitForSelector('input[name="capital_fixed"]', { timeout: 5000 });
  await page.type('input[name="capital_fixed"]', '3432');

  await page.waitForSelector('input[name="name"]', { timeout: 5000 });
  await page.type('input[name="name"]', 'sdfsdfsd');

  await page.waitForSelector('input[name="initials"]', { timeout: 5000 });
  await page.type('input[name="initials"]', 'fdsfds');

  await page.waitForSelector('textarea[name="purpose"]', { timeout: 5000 });
  await page.type('textarea[name="purpose"]', 'sdfsdfsd');

  await page.waitForSelector('input[name="duration"]', { timeout: 5000 });
  await page.type('input[name="duration"]', '34');

  await page.waitForSelector('input[name="rel_hq.street"]', { timeout: 5000 });
  await page.type('input[name="rel_hq.street"]', 'fsdfsdf');

  await page.waitForSelector('input[name="rel_hq.street2"]', { timeout: 5000 });
  await page.type('input[name="rel_hq.street2"]', 'sdfsdfsd');

  await page.waitForSelector('input[name="rel_hq.zip"]', { timeout: 5000 });
  await page.type('input[name="rel_hq.zip"]', '95880');

  await page.waitForSelector('select[name="rel_hq.city"]', { timeout: 5000 });
  await page.select('select[name="rel_hq.city"]', 'Enghien-les-Bains');

  await page.waitForSelector('select[name="office_city"]', { timeout: 5000 });
  await page.select('select[name="office_city"]', 'Pontoise');

  await page.waitForSelector('select[name="right_vote_select"]', { timeout: 5000 });
  await page.select('select[name="right_vote_select"]', 'CP');

  await page.waitForSelector('textarea[name="default_conditions_of_vote"]', { timeout: 5000 });
  await page.type('textarea[name="default_conditions_of_vote"]', 'Chaque actionnaire est convoqué aux Assemblées. Chaque action donne droit à une voix.');

  await page.waitForSelector('select[name="action_type"]', { timeout: 5000 });
  await page.select('select[name="action_type"]', 'TP');

  await page.waitForSelector('textarea[name="agreements"]', { timeout: 5000 });
  await page.type('textarea[name="agreements"]', 'Les actions sont librement cessible ou les actions sont cessible avec l\'accord du président de la société aux tiers');

  await page.waitForSelector('input[name="rel_president.living_abroad"][value="0"]', { timeout: 5000 });
  await page.click('input[name="rel_president.living_abroad"][value="0"]');

  await page.waitForSelector('select[name="rel_president.type"]', { timeout: 5000 });
  await page.select('select[name="rel_president.type"]', 'N');

  try {
   await page.waitForSelector('input[name="rel_president.title"][value="M"]', { visible: true, timeout: 5000 });
   const radioButton = await page.$('input[name="rel_president.title"][value="M"]');
   console.log("radioButton", radioButton);
   if (radioButton) {
    await radioButton.evaluate(radio => radio.click());
    console.log('Radio button selected successfully.');
   } else {
    console.error('Error: Radio button not found.');
   }
  } catch (error) {
   console.error('Error selecting radio button:', error);
  }

  await page.waitForSelector('input[name="rel_president.firstname"]', { timeout: 5000 });
  await page.type('input[name="rel_president.firstname"]', 'John');

  await page.waitForSelector('input[name="rel_president.lastname"]', { timeout: 5000 });
  await page.type('input[name="rel_president.lastname"]', 'Smith');

  await page.waitForSelector('select[name="rel_president.address.country"]', { timeout: 5000 });
  await page.select('select[name="rel_president.address.country"]', 'FR');

  await page.waitForSelector('input[name="rel_president.address.street"]', { timeout: 5000 });
  await page.type('input[name="rel_president.address.street"]', '123 Main Street');

  await page.waitForSelector('input[name="rel_president.address.street2"]', { timeout: 5000 });
  await page.type('input[name="rel_president.address.street2"]', 'Apt 123');

  await page.waitForSelector('input[name="rel_president.address.zip"]', { timeout: 5000 });
  await page.type('input[name="rel_president.address.zip"]', '78370');

  await page.waitForSelector('select[name="rel_president.address.city"]', { timeout: 5000 });
  await page.select('select[name="rel_president.address.city"]', 'Plaisir');

  await page.waitForSelector('input[name="rel_president.birthname"]', { timeout: 5000 });
  await page.type('input[name="rel_president.birthname"]', '5 ans');


  await page.waitForSelector('input[name="toggle_group_41570"]', { timeout: 5000 });
  await page.click('input[value="1"]');

  await page.waitForSelector('input[name="toggle_group_30177"]', { timeout: 5000 });
  await page.click('input[value="1"]');

  await page.waitForSelector('input[name="toggle_group_30605"]', { timeout: 5000 });
  await page.click('input[value="1"]');

  await page.waitForSelector('textarea[name="extra_info"]', { timeout: 5000 });
  await page.type('textarea[name="extra_info"]', 'Your free writing text here.');

  // await page.waitForSelector('button[type="button"].mdc-button.mdc-button--raised.large:not(.disabled)', { visible: true });
  // await page.click('button[type="button"].mdc-button.mdc-button--raised.large:not(.disabled)');


  // const confirmationMessage = await page.evaluate(() => {
  //  const confirmationElement = document.querySelector('.confirmation-message');
  //  return confirmationElement ? confirmationElement.textContent.trim() : null;
  // });

  // if (confirmationMessage) {
  //  console.log('Form submitted successfully:', confirmationMessage);
  // } else {
  //  console.error('Submission failed or no confirmation message found');
  // }


  // let button;
  // let retries = 0;
  // while (!button && retries < 3) {
  //  try {
  //   await page.waitForSelector('button[type="button"]', { visible: true });
  //  } catch (error) {
  //   console.error('Error waiting for button:', error);
  //   retries++;
  //   console.log(`Retrying (${retries})...`);
  //  }
  // }

  // if (button) {
  //  await button.click();
  //  console.log('Button clicked successfully');
  // } else {
  //  console.error('Button not found or not clickable after retries');
  // }

  console.log('Form fields filled successfully.');
  return true;

 } catch (error) {
  console.error('Error automating form:', error);
  return false;
 } finally {
  // await browser.close();
 }
}

