// src/app/api/automate-form.js
"use server"

export async function incorporationForm() {
 const puppeteer = require('puppeteer');
 const browser = await puppeteer.launch({ headless: false });
 const page = await browser.newPage();

 await page.setViewport({ width: 1080, height: 1024 });

 try {
  await page.goto('https://procedures.inpi.fr/?/');

  const pageData = await page.evaluate(() => {
   return {
    html: document.documentElement.innerHTML,
   };
  });


  // =============================================================================================================

  await page.waitForSelector('#ref', { visible: true });
  await page.type('#ref', process.env.INCORPORATION_MAIL);

  await page.waitForSelector('#password', { visible: true });
  await page.type('#password', process.env.INCORPORATION_PASS);

  await Promise.all([
   page.click('#login_submit'),
   page.waitForNavigation({ waitUntil: 'networkidle0' }) // Adjust according to the page load behavior
  ]);

  // ==============================================================================================================

  await page.evaluate(() => {
   const link = document.querySelector('a[href="front/v1/website/token?websiteCode=COMPANY_FORM_NEW"]');
   if (link) {
    link.removeAttribute('target');
   }
  });
  await page.click('a[href="front/v1/website/token?websiteCode=COMPANY_FORM_NEW"]');
  page.waitForNavigation({ waitUntil: 'networkidle0' })

  // =============================================================================================================

  await page.waitForSelector('a[href="/create"]', { visible: true });
  await Promise.all([
   page.click('a[href="/create"]'),
   page.waitForNavigation({ waitUntil: 'networkidle0' }) // Wait until there are no more than 0 network connections for at least 500 ms
  ]);


  // =============================================================================================================

  await page.waitForSelector('#personType', { visible: true, timeout: 5000 })
  await page.select('#personType', 'M');

  if (false) {
   try {
    await page.waitForSelector('#formeJuridique', { visible: true, timeout: 5000 });
    await page.click('#formeJuridique');
    await page.type('#formeJuridique', 'Société commerciale pluripersonnelle');
    await page.keyboard.press('Enter');
    console.log("Option 'Société commerciale pluripersonnelle' selected successfully.");
   } catch (error) {
    console.error(`An error occurred while selecting the option: ${error.message}`);
   }

   await page.waitForSelector('#formeJuridique2', { visible: true, timeout: 5000 });
   await page.type('#formeJuridique2', 'Société par actions simplifiée');
   await page.keyboard.press('Enter');

   await page.waitForSelector('#formeJuridique3', { visible: true, timeout: 5000 });
   await page.type('#formeJuridique3', 'Société par actions simplifiée');
   await page.keyboard.press('Enter');

  } else {

   try {
    await page.waitForSelector('#formeJuridique', { visible: true, timeout: 5000 });
    await page.click('#formeJuridique');
    await page.type('#formeJuridique', 'Société civile');
    await page.keyboard.press('Enter');
    console.log("Option 'Société commerciale pluripersonnelle' selected successfully.");
   } catch (error) {
    console.error(`An error occurred while selecting the option: ${error.message}`);
   }

   await page.waitForSelector('#formeJuridique2', { visible: true, timeout: 5000 });
   await page.type('#formeJuridique2', 'Autre société civile');
   await page.keyboard.press('Enter');

   await page.waitForSelector('#formeJuridique3', { visible: true, timeout: 5000 });
   await page.type('#formeJuridique3', 'Autre société civile');
   await page.keyboard.press('Enter');

  }

  try {
   await page.waitForSelector('#entrepriseAgricole_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#entrepriseAgricole_1');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #entrepriseAgricole_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #entrepriseAgricole_1: ${error.message}`);
  }

  try {
   await page.waitForSelector('#relieeEntrepriseAgricole_1', { visible: true, timeout: 5000 });
   const radioButton2 = await page.$('#relieeEntrepriseAgricole_1');
   if (radioButton2) {
    await radioButton2.click();
   } else {
    throw new Error('Radio button #relieeEntrepriseAgricole_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #relieeEntrepriseAgricole_1: ${error.message}`);
  }

  await page.waitForSelector('button[type="submit"].btn.btn-primary', { visible: true })
  await page.click('button[type="submit"].btn.btn-primary');
  await page.waitForNavigation({ waitUntil: 'networkidle0' })


  // =============================================================================================================


  try {
   await page.waitForSelector('#structure-entreprise\\.indicateurDomicileEntrepreneur_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#structure-entreprise\\.indicateurDomicileEntrepreneur_1');
   console.log("radioButton1", radioButton1);
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
  }

  try {
   await page.waitForSelector('#structure-entreprise\\.domiciliataire_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#structure-entreprise\\.domiciliataire_1');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
  }


  try {
   await page.waitForSelector('#content .row .col-md-6 .app-input input[name="nomDossier"]', { visible: true, timeout: 5000 });
   await page.type('#content .row .col-md-6 .app-input input[name="nomDossier"]', 'Dummy Company');
   console.log('Successfully typed into the textarea.');
  } catch (error) {
   console.error('Error typing into the textarea:', error);
  }

  try {
   await page.waitForSelector('#content .is-validated .card .card-body input[name="denomination"]', { visible: true, timeout: 5000 });
   await page.type('#content .is-validated .card .card-body input[name="denomination"]', 'Dummy Company');
   console.log('Successfully typed into the textarea.');
  } catch (error) {
   console.error('Error typing into the textarea:', error);
  }

  try {
   await page.waitForSelector('#content .is-validated .card .card-body .row textarea', { visible: true, timeout: 5000 });
   await page.type('#content .is-validated .card .card-body .row textarea', 'holding');
   console.log('Successfully typed into the textarea.');
  } catch (error) {
   console.error('Error typing into the textarea:', error);
  }

  await page.waitForSelector('#content .is-validated .card .card-body input[name="duree"]', { visible: true, timeout: 5000 })
  await page.type('#content .is-validated .card .card-body input[name="duree"]', '99');

  await page.waitForSelector('#dateClotureExerciceSocial\\.day', { visible: true, timeout: 5000 });
  await page.select('#dateClotureExerciceSocial\\.day', '31');

  await page.waitForSelector('#dateClotureExerciceSocial\\.month', { visible: true, timeout: 5000 });
  await page.select('#dateClotureExerciceSocial\\.month', '12');

  await page.waitForSelector('#description-personne-morale\\.datePremiereCloture', { visible: true, visible: true })
  await page.evaluate(() => {
   const dateInput = document.querySelector('#description-personne-morale\\.datePremiereCloture');
   dateInput.value = '31/12/2024';
  });

  try {
   await page.waitForSelector('#description-personne-morale\\.ess_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#description-personne-morale\\.ess_1');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale.ess_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.ess_1: ${error.message}`);
  }

  try {
   await page.waitForSelector('#description-personne-morale\\.societeMission_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#description-personne-morale\\.societeMission_1');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
  }

  try {
   await page.waitForSelector('#description-personne-morale\\.capitalVariable', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#description-personne-morale\\.capitalVariable');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #id="description-personne-morale.capitalVariable" not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #id="description-personne-morale.capitalVariable": ${error.message}`);
  }

  try {
   await page.waitForSelector('#description-personne-morale\\.montantCapital', { visible: true, timeout: 5000 });
   await page.type('#description-personne-morale\\.montantCapital', '5');
   console.log('Successfully typed into the textarea.');
  } catch (error) {
   console.error('Error typing into the textarea:', error);
  }

  try {
   await page.waitForSelector('#description-personne-morale\\.capitalMinimum', { visible: true, timeout: 5000 });
   await page.type('#description-personne-morale\\.capitalMinimum', '5');
   console.log('Successfully typed into the textarea.');
  } catch (error) {
   console.error('Error typing into the textarea:', error);
  }

  try {
   await page.waitForSelector('#div-deviseCapital ', { visible: true });
   await page.click('#div-deviseCapital');
   await page.waitForSelector('#description-personne-morale\\.deviseCapital', { visible: true });
   await page.type('#description-personne-morale\\.deviseCapital', 'Euro');
   await page.keyboard.press('Enter');
   console.log("Option 'Société commerciale pluripersonnelle' selected successfully.");
  } catch (error) {
   console.error(`An error occurred while selecting the option: ${error.message}`);
  }

  try {
   await page.waitForSelector('#description-personne-morale\\.indicateurOrigineFusionScission_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#description-personne-morale\\.indicateurOrigineFusionScission_1');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
  }



  try {
   await page.waitForSelector('#structure-entreprise\\.aucuneActivite_1', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#structure-entreprise\\.aucuneActivite_1');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
  }

  try {
   await page.waitForSelector('#structure-entreprise\\.indicateurPrincipalIdemSiege', { visible: true, timeout: 5000 });
   const radioButton1 = await page.$('#structure-entreprise\\.indicateurPrincipalIdemSiege');
   if (radioButton1) {
    await radioButton1.click();
   } else {
    throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
   }
  } catch (error) {
   console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
  }



  await page.waitForSelector('button[type="button"].btn.btn-primary', { visible: true })
  await page.click('button[type="button"].btn.btn-primary');
  // await page.waitForNavigation()



  // ==============================================================FORM_02==============================================================================

  try {
   await page.waitForSelector('#publication-legale\\.publicationUrl', { visible: true, timeout: 5000 });
   await page.click('#publication-legale\\.publicationUrl');
   await page.type('#publication-legale\\.publicationUrl', '20minutes.fr');
   await page.keyboard.press('Enter');
  } catch (error) {
   console.error(`An error occurred while selecting the option: ${error.message}`);
  }

  try {
   await page.waitForSelector('#body-accordion_formality_content_person_publication_legale .card-body input[name="datePublication"]', { visible: true, timeout: 5000 });
   await page.click('#body-accordion_formality_content_person_publication_legale .card-body input[name="datePublication"]');
   await page.type('#body-accordion_formality_content_person_publication_legale .card-body input[name="datePublication"]', '31122024');
   await page.keyboard.press('Enter');
  } catch (error) {
   console.log(error.message)
  }

  // try {
  //  await page.waitForSelector('#body-accordion_formality_content_person_publication_legale .card-body #publication-legale\\.journalPublication-group #publication-legale\\.journalPublication', { visible: true, timeout: 5000 });
  //  await page.click('#body-accordion_formality_content_person_publication_legale .card-body #publication-legale\\.journalPublication-group #publication-legale\\.journalPublication');
  //  await page.type('#body-accordion_formality_content_person_publication_legale .card-body #publication-legale\\.journalPublication-group #publication-legale\\.journalPublication', 'Autre');
  // } catch (error) {
  //  console.log(error.message)
  // }
  try {
   await page.waitForSelector('#publication-legale\\.journalPublication', { visible: true, timeout: 5000 });
   // await page.click('#publication-legale\\.journalPublication');
   await page.type('#publication-legale\\.journalPublication', '20minutes.fr');
   await page.waitForNavigation('.app-select__single-value css-1dimb5e-singleValue', { visible: true, timeout: 5000 })
   await page.type('.app-select__single-value css-1dimb5e-singleValue', '20minutes.fr');

   // await page.waitForSelector('.app-select__option', { visible: true, timeout: 5000 });
   // const dropdownOptions = await page.$$('.app-select__option');
   // if (dropdownOptions.length >= 2) {
   //  await dropdownOptions[1].click();
   // } else {
   //  console.log('Dropdown does not have enough options');
   // }
  } catch (error) {
   console.log(error.message);
  }

  await page.waitForSelector('button[type="button"].btn.btn-primary', { visible: true })
  await page.click('button[type="button"].btn.btn-primary');



  // ==============================================================FORM_03===============================================================================

















  // ==============================================================FORM_04===============================================================================



 } catch (error) {

  return false;
 } finally {
  // window.location.href = 'http://localhost:3000/onboarding';
  // await browser.close();
 }
}

