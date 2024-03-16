// src/app/api/automate-form.js
"use server"

import { automateFormTwo } from './automate-form2';

export async function automateForm(data: any) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1024 });

  try {
    await page.goto('https://www.annonces-legales.fr/constitution-societe-commerciale/constitution-sas');

    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });

    try {
      await page.waitForSelector('#didomi-notice-agree-button', { visible: true, timeout: 5000 });
      await page.click('#didomi-notice-agree-button');
    } catch (error) {
      console.error("Error clicking the button:", error);
    }

    await page.waitForSelector('input[name="rel_president.address.zip"]', { timeout: 5000 });
    await page.type('input[name="rel_president.address.zip"]', '66700');

    await page.waitForSelector('input[name="rel_president.address.street"]', { timeout: 5000 });
    await page.type('input[name="rel_president.address.street"]', 'Your address Number');

    await page.waitForSelector('select[name="deed_nature"]', { timeout: 5000 });
    await page.select('select[name="deed_nature"]', 'private');

    try {
      await page.waitForSelector('input#deed_sign_date', { visible: true, timeout: 10000 })
      await page.evaluate(() => {
        const inputField = document.querySelector('input#deed_sign_date');
        if (inputField !== null) {
          inputField.classList.add('active');
        }
      });


      await page.click('input#deed_sign_date');
      await new Promise(resolve => setTimeout(resolve, 2000));
      let calendarVisible = await page.waitForSelector('.flatpickr-calendar', { visible: true, timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      if (!calendarVisible) {

        await page.evaluate(() => {
          const calendarContainer = document.querySelector('.flatpickr-calendar');
          if (calendarContainer !== null) {
            calendarContainer.classList.add('open');
          }
        });


        calendarVisible = await page.waitForSelector('.flatpickr-calendar', { visible: true, timeout: 10000 })
          .then(() => true)
          .catch(() => false);
      }

      if (calendarVisible) {
        await page.click('.flatpickr-day.today');
      }
    } catch (error: any) {
      return error.message
    }


    // ================================================================================================================================================================


    await page.waitForSelector('select[name="legal_form"]', { timeout: 5000 });
    await page.select('select[name="legal_form"]', 'CV');

    await page.waitForSelector('input[name="capital_min"]', { timeout: 5000 });
    await page.type('input[name="capital_min"]', '5000');

    await page.waitForSelector('input[name="capital_subscribed"]', { timeout: 5000 });
    await page.type('input[name="capital_subscribed"]', '5000');

    await page.waitForSelector('input[name="capital_max"]', { timeout: 5000 });
    await page.type('input[name="capital_max"]', '5000000');

    await page.waitForSelector('input[name="name"]', { timeout: 5000 });
    await page.type('input[name="name"]', 'GFM');

    await page.waitForSelector('textarea[name="purpose"]', { timeout: 5000 });
    await page.type('textarea[name="purpose"]', 'holding');

    await page.waitForSelector('input[name="duration"]', { timeout: 5000 });
    await page.type('input[name="duration"]', '99');


    // ================================================================================================================================================================


    await page.waitForSelector('input[name="rel_hq.street"]', { timeout: 5000 });
    await page.type('input[name="rel_hq.street"]', '16 Rue Washington');

    await page.waitForSelector('input[name="rel_hq.zip"]', { timeout: 5000 });
    await page.type('input[name="rel_hq.zip"]', '75008');

    try {
      await page.click('select[name="rel_hq.city"]');
      await page.waitForFunction(() => {
        const dropdown = document.querySelector('select[name="rel_hq.city"]') as HTMLSelectElement;
        return dropdown !== null && dropdown.options.length > 1;
      }, { timeout: 10000 });


      await page.select('select[name="rel_hq.city"]', 'Paris 08');
    } catch (error) {
      console.error('Error selecting the city:', error);
    }

    await page.waitForSelector('select[name="office_city"]', { timeout: 5000 });
    await page.select('select[name="office_city"]', '112');

    await page.waitForSelector('select[name="right_vote_select"]', { timeout: 5000 });
    await page.select('select[name="right_vote_select"]', 'CP');


    // ================================================================================================================================================================

    await page.waitForSelector('select[name="right_vote_select"]', { timeout: 5000 });
    await page.select('select[name="right_vote_select"]', 'CP');

    await page.waitForSelector('textarea[name="default_conditions_of_vote"]', { timeout: 5000 });
    await page.$eval('textarea[name="default_conditions_of_vote"]', (textarea: any) => {
      textarea.value = 'Une actionnaire, une voix';
    });

    await page.waitForSelector('select[name="action_type"]', { timeout: 5000 });
    await page.select('select[name="action_type"]', 'TP');

    await page.waitForSelector('textarea[name="agreements"]', { timeout: 5000 });
    await page.$eval('textarea[name="agreements"]', (textarea: any) => {
      textarea.value = 'librement cessible avec du président';
    });


    // ================================================================================================================================================================


    await page.waitForSelector('select[name="rel_president.type"]', { timeout: 5000 });
    await page.select('select[name="rel_president.type"]', 'L');

    try {
      await page.waitForSelector('input[name="rel_president.title"][value="M"]', { visible: true, timeout: 5000 });
      const radioButton = await page.$('input[name="rel_president.title"][value="M"]');
      if (radioButton) {
        await radioButton.evaluate((radio: HTMLElement) => radio.click());
      }
    } catch (error: any) {
      return error.message
    }

    await page.waitForSelector('input[name="rel_president.name"]', { timeout: 5000 });
    await page.type('input[name="rel_president.name"]', 'CAP 54 SAS');

    try {
      await page.waitForSelector('select[name="rel_president.society_status"]', { timeout: 5000 });
      await page.select('select[name="rel_president.society_status"]', 'SAS');
    } catch (error) {
      console.error('Error selecting the option:', error);
    }

    await page.waitForSelector('select[name="rel_president.address.country"]', { timeout: 5000 });
    await page.select('select[name="rel_president.address.country"]', 'FR');

    try {
      const valueToSet = '27 ALLEE du Racou';
      await page.waitForSelector('input[name="rel_president.address.street"]', { timeout: 5000 });
      await page.$eval('input[name="rel_president.address.street"]', (textarea: any, value: any) => {
        textarea.value = value;
      }, valueToSet);
    } catch (error) {
      console.error('Error setting the value of the textarea:', error);
    }



    await page.waitForSelector('select[name="rel_president.address.city"]', { timeout: 5000 });
    await page.select('select[name="rel_president.address.city"]', 'Argelès-sur-Mer');


    await page.waitForSelector('input[name="rel_president.rcs"]', { timeout: 5000 });
    await page.type('input[name="rel_president.rcs"]', '123456789');


    // ================================================================================================================================================================

    await page.waitForSelector('input[name="toggle_group_41570"]', { timeout: 5000 });
    await page.click('input[value="1"]');

    await page.waitForSelector('input[name="toggle_group_30177"]', { timeout: 5000 });
    await page.click('input[value="1"]');

    await page.waitForSelector('input[name="toggle_group_30605"]', { timeout: 5000 });
    await page.click('input[value="1"]');

    await page.waitForSelector('textarea[name="extra_info"]', { timeout: 5000 });
    await page.type('textarea[name="extra_info"]', 'éventuelle rédaction libre');


    try {
      await page.waitForSelector('button[type="button"].mdc-button.mdc-button--raised.large:not(.disabled)', { visible: true, timeout: 5000 });
      await page.click('button[type="button"].mdc-button.mdc-button--raised.large:not(.disabled)');
      await page.waitForNavigation();
      await automateFormTwo(page);
      return true;
    } catch (error) {

      return false;
    }
  } catch (error) {

    return false;
  } finally {
    // window.location.href = 'http://localhost:3000/onboarding';
    // await browser.close();
  }
}

