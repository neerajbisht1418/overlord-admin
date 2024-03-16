"use server"

export async function automateFormTwo(page: any) {
 try {
  await page.waitForSelector('.form-field-line .MuiFormControl-root #civility', { visible: true, timeout: 5000 });
  await page.evaluate(() => {
   const civilityRadioGroup = document.querySelector('.form-field-line .MuiFormControl-root #civility');
   if (civilityRadioGroup) {
    const radioButtonM = civilityRadioGroup.querySelector('input[value="M"]');
    if (radioButtonM) {
     (radioButtonM as HTMLElement).click();
    }

   }
  });

  await page.waitForSelector('input#lastName', { timeout: 5000 });
  await page.type('input#lastName', 'De Monclin');

  await page.waitForSelector('input#firstName', { timeout: 5000 });
  await page.type('input#firstName', 'Gaspard');

  await page.waitForSelector('input[name="address.street"]', { timeout: 5000 });
  await page.type('input[name="address.street"]', '32 A Avenue Pierre Semard');

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
    (checkbox as HTMLElement).click()
    checkbox.dispatchEvent(new Event('change'));
   }
  });

  await page.waitForSelector('input[name="noCommercialOffers"]', { timeout: 5000 });
  await page.evaluate(() => {
   const checkbox = document.querySelector('input[name="noCommercialOffers"]');
   if (checkbox) {
    (checkbox as HTMLElement).click()
    checkbox.dispatchEvent(new Event('change'));
   }
  });

  try {
   await page.waitForSelector('button[type="button"].mdc-button.mdc-button--raised.large:not(.disabled)', { visible: true, timeout: 5000 });
   await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="button"].mdc-button.mdc-button--raised.large')
   ]);

  } catch (error) {
   console.error("Error clicking the button or navigating to the payment page:", error);
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

