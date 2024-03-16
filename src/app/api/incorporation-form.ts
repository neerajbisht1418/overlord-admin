"use server"

import tempWrite from 'temp-write';
import { PDFDocument, rgb } from 'pdf-lib';
import { Buffer } from 'buffer';

export async function incorporationForm(data: any) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    return day + month + year;
  }

  function formatDate(dateString: any) {
    const [day, month, year] = dateString.match(/\d+/g);
    const date = new Date(`${month}/${day}/${year}`);

    const formattedDay = date.getDate().toString().padStart(2, '0');
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedYear = date.getFullYear().toString();

    return formattedDay + formattedMonth + formattedYear;
  }

  try {
    await page.goto('https://procedures.inpi.fr/?/');

    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });


    await login_page()

    // =============================================================LOGIN PAGE================================================================================================

    async function login_page() {
      await page.waitForSelector('#ref', { visible: true });
      await page.type('#ref', process.env.INCORPORATION_MAIL);

      await page.waitForSelector('#password', { visible: true });
      await page.type('#password', process.env.INCORPORATION_PASS);

      await page.click('#login_submit'),
        await category_panel()

    }

    // =========================================================category_panel================================================================================================

    async function category_panel() {

      try {
        await page.waitForSelector('#categoryPanel', { visible: true, timeout: 15000 });
        await page.evaluate(() => {
          const link = document.querySelector('a[href="front/v1/website/token?websiteCode=COMPANY_FORM_NEW"]');
          if (link) {
            link.removeAttribute('target');
          }
        });

        await page.click('a[href="front/v1/website/token?websiteCode=COMPANY_FORM_NEW"]');
        await SingleWindow()
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // =========================================================SINGLE WINDOW=================================================================================================

    async function SingleWindow() {
      await page.waitForSelector('a[href="/create"]', { visible: true, timeout: 15000 });
      await page.click('a[href="/create"]'),
        // await page.waitForNavigation({ waitUntil: 'networkidle0' }),
        await BusinessCreationProcess()
    }

    // =====================================================BUSINESS CREATION PROCESS==========================================================================================

    async function BusinessCreationProcess() {

      await page.waitForSelector('#personType', { visible: true, timeout: 15000 })
      await page.select('#personType', 'M');

      if (true) {

        setTimeout(async () => {
          await page.waitForSelector('#formeJuridique', { visible: true, timeout: 15000 });
          await page.click('#formeJuridique');
          await page.type('#formeJuridique', 'Société commerciale pluripersonnelle');
          await page.keyboard.press('Enter');
        }, 2000)

        await page.waitForSelector('#formeJuridique2', { visible: true, timeout: 15000 });
        await page.click('#formeJuridique2');
        await page.type('#formeJuridique2', 'Société par actions simplifiée');
        await page.keyboard.press('Enter');

        await page.waitForSelector('#formeJuridique3', { visible: true, timeout: 15000 });
        await page.click('#formeJuridique3');
        await page.type('#formeJuridique3', 'Société par actions simplifiée');
        await page.keyboard.press('Enter');

      } else {

        setTimeout(async () => {
          await page.waitForSelector('#formeJuridique', { visible: true, timeout: 15000 });
          await page.click('#formeJuridique');
          await page.type('#formeJuridique', 'Société civile');
          await page.keyboard.press('Enter');
        }, 2000)

        await page.waitForSelector('#formeJuridique2', { visible: true, timeout: 15000 });
        await page.click('#formeJuridique2');
        await page.type('#formeJuridique2', 'Autre société civile');
        await page.keyboard.press('Enter');

        await page.waitForSelector('#formeJuridique3', { visible: true, timeout: 15000 });
        await page.click('#formeJuridique3');
        await page.type('#formeJuridique3', 'Autre société civile');
        await page.keyboard.press('Enter');

      }

      try {
        await page.waitForSelector('#entrepriseAgricole_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#entrepriseAgricole_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #entrepriseAgricole_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #entrepriseAgricole_1: ${error.message}`);
      }

      try {
        await page.waitForSelector('#relieeEntrepriseAgricole_1', { visible: true, timeout: 15000 });
        const radioButton2 = await page.$('#relieeEntrepriseAgricole_1');
        if (radioButton2) {
          await radioButton2.click();
        } else {
          throw new Error('Radio button #relieeEntrepriseAgricole_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #relieeEntrepriseAgricole_1: ${error.message}`);
      }

      await page.waitForSelector('button[type="submit"].btn.btn-primary', { visible: true })
      await page.click('button[type="submit"].btn.btn-primary');
      // await page.waitForNavigation({ waitUntil: 'networkidle0' })

      await Form_01()

    }

    // ==========================================================structure-entreprise (Form_01)===========================================================================================

    async function Form_01() {

      if (false) {
        try {
          await page.waitForSelector('#description-personne-morale\\.isBeneficiairesEffectifOptional', { visible: true, timeout: 5000 });
          const radioButton1 = await page.$('#description-personne-morale\\.isBeneficiairesEffectifOptional');
          if (radioButton1) {
            await radioButton1.click();
          } else {
            throw new Error('Radio button #description-personne-morale\\.isBeneficiairesEffectifOptional not found');
          }
        } catch (error: any) {
          console.error(`Error selecting radio button #description-personne-morale\\.isBeneficiairesEffectifOptional: ${error.message}`);
        }

      } else {
        try {
          await page.waitForSelector('#structure-entreprise\\.indicateurDomicileEntrepreneur_1', { visible: true, timeout: 5000 });
          const radioButton1 = await page.$('#structure-entreprise\\.indicateurDomicileEntrepreneur_1');
          if (radioButton1) {
            await radioButton1.click();
          } else {
            throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
          }
        } catch (error: any) {
          console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
        }

      }


      try {
        await page.waitForSelector('#structure-entreprise\\.domiciliataire_1', { visible: true, timeout: 5000 });
        const radioButton1 = await page.$('#structure-entreprise\\.domiciliataire_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #description-personne-morale\\.societeMission_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
      }


      try {
        await page.waitForSelector('#content .row .col-md-6 .app-input input[name="nomDossier"]', { visible: true, timeout: 5000 });
        await page.type('#content .row .col-md-6 .app-input input[name="nomDossier"]', data?.form_01?.CompanyName);
      } catch (error) {
        console.error('Error typing into the textarea:', error);
      }

      try {
        await page.waitForSelector('#content .is-validated .card .card-body input[name="denomination"]', { visible: true, timeout: 5000 });
        await page.type('#content .is-validated .card .card-body input[name="denomination"]', data?.form_01?.CompanyName);
      } catch (error) {
        console.error('Error typing into the textarea:', error);
      }

      try {
        await page.waitForSelector('#content .is-validated .card .card-body .row textarea', { visible: true, timeout: 5000 });
        await page.type('#content .is-validated .card .card-body .row textarea', 'holding');
      } catch (error) {
        console.error('Error typing into the textarea:', error);
      }

      await page.waitForSelector('#content .is-validated .card .card-body input[name="duree"]', { visible: true, timeout: 5000 })
      await page.type('#content .is-validated .card .card-body input[name="duree"]', '99');

      await page.waitForSelector('#dateClotureExerciceSocial\\.day', { visible: true, timeout: 5000 });
      await page.select('#dateClotureExerciceSocial\\.day', '31');

      await page.waitForSelector('#dateClotureExerciceSocial\\.month', { visible: true, timeout: 5000 });
      await page.select('#dateClotureExerciceSocial\\.month', '12');

      await page.waitForSelector('#description-personne-morale\\.datePremiereCloture', { visible: true, timeout: 5000 })
      await page.evaluate(() => {
        const dateInput = document.querySelector('#description-personne-morale\\.datePremiereCloture') as HTMLInputElement | null;
        if (dateInput !== null) {
          dateInput.value = '31/12/2024';
        }
      });

      try {
        await page.waitForSelector('#description-personne-morale\\.ess_1', { visible: true, timeout: 5000 });
        const radioButton1 = await page.$('#description-personne-morale\\.ess_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #description-personne-morale.ess_1 not found');
        }
      } catch (error: any) {
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
      } catch (error: any) {
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
      } catch (error: any) {
        console.error(`Error selecting radio button #id="description-personne-morale.capitalVariable": ${error.message}`);
      }

      try {
        await page.waitForSelector('#description-personne-morale\\.montantCapital', { visible: true, timeout: 5000 });
        await page.type('#description-personne-morale\\.montantCapital', data?.form_01?.MontantCapital);
        console.log('Successfully typed into the textarea.');
      } catch (error) {
        console.error('Error typing into the textarea:', error);
      }

      try {
        await page.waitForSelector('#description-personne-morale\\.capitalMinimum', { visible: true, timeout: 5000 });
        await page.type('#description-personne-morale\\.capitalMinimum', data?.form_01?.CapitalMinimum);
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
      } catch (error: any) {
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
      } catch (error: any) {
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
      } catch (error: any) {
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
      } catch (error: any) {
        console.error(`Error selecting radio button #description-personne-morale.societeMission_1: ${error.message}`);
      }

      await page.waitForSelector('button[type="button"].btn.btn-primary', { visible: true })
      await page.click('button[type="button"].btn.btn-primary');

      await form_02()

    }

    // ==========================================================(Form_02) (PUBLICATIONS LEGALES)===========================================================================================

    async function form_02() {

      try {
        const variableToSelect = "Autre";
        await page.waitForSelector('input#publication-legale\\.journalPublication.app-select__input', { visible: true, timeout: 5000 });
        const inputElement = await page.$('input#publication-legale\\.journalPublication.app-select__input');

        if (inputElement) {
          await inputElement.focus();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');
        } else {
          console.log('Input element not found');
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      try {
        await page.waitForSelector('#body-accordion_formality_content_person_publication_legale .card-body input[name="datePublication"]', { visible: true, timeout: 5000 });
        await page.click('#body-accordion_formality_content_person_publication_legale .card-body input[name="datePublication"]');
        await page.type('#body-accordion_formality_content_person_publication_legale .card-body input[name="datePublication"]', '31122420');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.log(error.message)
      }

      try {
        await page.waitForSelector('#body-accordion_formality_content_person_publication_legale .card-body #publication-legale\\.journalPublication-group #div-journalPublication .app-select__single-value', { visible: true, timeout: 15000 });
        await page.type('#body-accordion_formality_content_person_publication_legale .card-body #publication-legale\\.journalPublication-group #div-journalPublication .app-select__single-value', '20minutes.fr');
      } catch (error: any) {
        console.log(error.message);
      }

      await page.waitForSelector('button[type="button"].btn.btn-primary', { visible: true })
      await page.click('button[type="button"].btn.btn-primary');
      await form_03()
    }

    // ======================================================FORM_03 ======================================================================================


    async function form_03() {

      await page.waitForSelector('#list\\.pouvoirs .row button[type="button"].btn.btn-primary', { visible: true })
      await page.click('button[type="button"].btn.btn-primary');

      try {
        await page.waitForSelector('input#composition-description-pouvoir\\.roleEntreprise', { visible: true, timeout: 15000 });
        await page.click('input#composition-description-pouvoir\\.roleEntreprise');
        const inputElement = await page.$('input#composition-description-pouvoir\\.roleEntreprise');

        if (inputElement) {
          await inputElement.focus();
          for (let i = 0; i <= 8; i++) {
            await page.keyboard.press('ArrowDown');
          }
          await page.keyboard.press('Enter');
        } else {
          console.log('Input element not found');
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      if (false) {
        await page.waitForSelector('#composition-description-pouvoir\\.typeDePersonne', { visible: true, timeout: 15000 });
        await page.select('#composition-description-pouvoir\\.typeDePersonne', 'ENTREPRISE');
      } else {
        await page.waitForSelector('#composition-description-pouvoir\\.typeDePersonne', { visible: true, timeout: 15000 });
        await page.select('#composition-description-pouvoir\\.typeDePersonne', 'INDIVIDU');
      }

      try {
        await page.waitForSelector('#composition-description-pouvoir\\.indicateurSecondRoleEntreprise_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#composition-description-pouvoir\\.indicateurSecondRoleEntreprise_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.indicateurSecondRoleEntreprise_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.indicateurSecondRoleEntreprise_1: ${error.message}`);
      }

      try {
        await page.waitForSelector('#composition-adresse-individu\\.codePays', { visible: true, timeout: 15000 });
        await page.type('#composition-adresse-individu\\.codePays', data?.form_03?.Country);
        const inputElement = await page.$('#composition-adresse-individu\\.codePays');
        if (inputElement) {
          await inputElement.focus();
          await page.keyboard.press('Enter');
        } else {
          console.log('Input element not found');
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      await page.waitForSelector('#composition-description-individu\\.prenoms', { visible: true })
      await page.type('#composition-description-individu\\.prenoms', data?.form_03?.FirstName);


      await page.waitForSelector('#composition-description-individu\\.nom', { visible: true })
      await page.type('#composition-description-individu\\.nom', data?.form_03?.LastName);

      await page.waitForSelector('#composition-description-individu\\.genre', { visible: true, timeout: 15000 });
      await page.select('#composition-description-individu\\.genre', data?.form_03?.Gender === "male" ? "1" : "2");


      try {
        await page.waitForSelector('#composition-description-individu\\.dateDeNaissance', { visible: true, timeout: 15000 });
        await page.click('#composition-description-individu\\.dateDeNaissance');
        await page.type('#composition-description-individu\\.dateDeNaissance', data?.form_03?.DateOfBirth);
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.log(error.message)
      }

      await page.waitForSelector('#composition-contact-individu\\.telephone', { visible: true, timeout: 15000 })
      await page.type('#composition-contact-individu\\.telephone', data?.form_03?.Telephone);

      try {
        await page.waitForSelector('#composition-description-individu\\.codeNationalite', { visible: true, timeout: 15000 });
        await page.click('#composition-description-individu\\.codeNationalite');
        await page.type('#composition-description-individu\\.codeNationalite', data?.form_03?.Nationality);
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#composition-description-individu\\.paysNaissance', { visible: true, timeout: 15000 });
        await page.type('#composition-description-individu\\.paysNaissance', data?.form_03?.NativeCountry);
        const inputElement = await page.$('#composition-description-individu\\.paysNaissance');
        if (inputElement) {
          await inputElement.focus();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');
        } else {
          console.log('Input element not found');
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      try {
        await page.waitForSelector('#composition-description-pouvoir\\.beneficiaireEffectif_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#composition-description-pouvoir\\.beneficiaireEffectif_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      setTimeout(async () => {
        try {
          const address = "75001 Paris";
          await page.waitForSelector('input#composition-description-individu\\.lieuDeNaissance', { visible: true, timeout: 15000 });
          await page.type('input#composition-description-individu\\.lieuDeNaissance', address);
          setTimeout(async () => {
            await page.waitForSelector('div#composition-description-individu\\.lieuDeNaissance', { visible: true, timeout: 15000 });
            await page.type('div#composition-description-individu\\.lieuDeNaissance', address);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter')
          }, 5000);

        } catch (error: any) {
          console.log("Error:", error.message);
        }
      }, 1000)

      setTimeout(async () => {
        try {
          const address = data?.form_03?.Address;
          await page.waitForSelector('input#composition-adresse-individu\\.voie', { visible: true, timeout: 15000 });
          await page.type('input#composition-adresse-individu\\.voie', address);
          setTimeout(async () => {
            await page.waitForSelector('div#composition-adresse-individu\\.voie', { visible: true, timeout: 15000 });
            await page.type('div#composition-adresse-individu\\.voie', address);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter')
            await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true })
            await page.click('.bottom button[type="button"].btn.btn-primary');

            // ==========================

            setTimeout(async () => {
              await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true })
              await page.click('.bottom button[type="button"].btn.btn-primary');
              await form_003()
            }, 1000)

            // ==========================

          }, 5000);

        } catch (error: any) {
          console.log("Error:", error.message);
        }
      }, 7000)
    }

    async function form_003() {
      try {
        await page.waitForSelector('#effectif-salarie\\.presenceSalarie_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#effectif-salarie\\.presenceSalarie_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      try {
        await page.waitForSelector('#effectif-salarie\\.emploiPremierSalarie_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#effectif-salarie\\.emploiPremierSalarie_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      try {
        const address = data?.form_04?.Address;
        await page.waitForSelector('input#adresse-etablissement\\.voie', { visible: true, timeout: 5000 });
        await page.type('input#adresse-etablissement\\.voie', address);
        const suggestionVisible = await page.waitForSelector('div#adresse-etablissement\\.voie', { visible: true, timeout: 5000 })
          .then(() => true)
          .catch(() => false);

        if (suggestionVisible) {
          setTimeout(async () => {
            await page.type('div#adresse-etablissement\\.voie', address);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
            await page.waitForSelector('button[type="button"].btn.btn-primary', { visible: true })
            await page.click('button[type="button"].btn.btn-primary')

            // ========================

            await form_04()

            // ========================

          }, 3000)
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }

    }

    // ==============================================================FORM_04 ESTABLISSMENT========================================================================================

    async function form_04() {

      await page.waitForSelector('#list\\.activites .row button[type="button"].btn.btn-primary', { visible: true })
      await page.click('#list\\.activites .row button[type="button"].btn.btn-primary');

      try {
        await page.waitForSelector('#description-activite\\.indicateurPrincipal', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#description-activite\\.indicateurPrincipal');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      try {
        await page.waitForSelector('#description-activite\\.dateDebut', { visible: true, timeout: 15000 });
        await page.click('#description-activite\\.dateDebut');
        await page.type('#description-activite\\.dateDebut', getCurrentDate());
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.log(error.message)
      }

      try {
        await page.waitForSelector('#description-activite\\.indicateurNonSedentaire_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#description-activite\\.indicateurNonSedentaire_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      try {
        await page.waitForSelector('#description-activite\\.exerciceActivite', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#description-activite\\.exerciceActivite');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      try {
        await page.waitForSelector('#description-activite\\.indicateurProlongement_1', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#description-activite\\.indicateurProlongement_1');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #composition-description-pouvoir\\.beneficiaireEffectif_1 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #composition-description-pouvoir\\.beneficiaireEffectif_1: ${error.message}`);
      }

      await page.waitForSelector('#description-activite\\.descriptionDetaillee', { visible: true })
      await page.type('#description-activite\\.descriptionDetaillee', 'holding');

      try {
        await page.waitForSelector('#description-activite\\.categorisationActivite1', { visible: true, timeout: 15000 });
        await page.click('#description-activite\\.categorisationActivite1');
        await page.type('#description-activite\\.categorisationActivite1', 'Activités de services');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#description-activite\\.categorisationActivite2', { visible: true, timeout: 15000 });
        await page.click('#description-activite\\.categorisationActivite2');
        await page.type('#description-activite\\.categorisationActivite2', 'Activités administratives, agents commerciaux et autres activités de soutien aux entreprises');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#description-activite\\.categorisationActivite3', { visible: true, timeout: 15000 });
        await page.click('#description-activite\\.categorisationActivite3');
        await page.type('#description-activite\\.categorisationActivite3', 'Autres activités commerciales de soutien aux entreprises');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#activite-old-address\\.typeOrigine', { visible: true, timeout: 15000 });
        await page.click('#activite-old-address\\.typeOrigine');
        await page.type('#activite-old-address\\.typeOrigine', 'Création');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true })
      await page.click('.bottom button[type="button"].btn.btn-primary');
      await page.click('.bottom button[type="button"].btn.btn-primary');
      await page.click('.bottom button[type="button"].btn.btn-primary');

      await form_05()

    }

    // ===========================================================FORM_05 BENEFICIAIRE EFFECTIF===================================================================================

    async function form_05() {

      await page.waitForSelector('.is-validated .row button[type="button"].btn.btn-primary', { visible: true, timeout: 15000 })
      await page.click('.is-validated .row button[type="button"].btn.btn-primary');

      try {
        await page.waitForSelector('#beneficiairesEffectifs-description-dateEntree\\.dateEffetRoleDeclarant', { visible: true, timeout: 15000 });
        await page.click('#beneficiairesEffectifs-description-dateEntree\\.dateEffetRoleDeclarant');
        await page.type('#beneficiairesEffectifs-description-dateEntree\\.dateEffetRoleDeclarant', getCurrentDate());
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.log(error.message)
      }

      await page.waitForSelector('#beneficiairesEffectifs-description\\.prenoms', { visible: true, timeout: 15000 })
      await page.type('#beneficiairesEffectifs-description\\.prenoms', data?.form_05?.FirstName);

      await page.waitForSelector('#beneficiairesEffectifs-description\\.nom', { visible: true, timeout: 15000 })
      await page.type('#beneficiairesEffectifs-description\\.nom', data?.form_05?.BirthName);

      if (data?.form_05?.Gender === "male") {
        await page.waitForSelector('#beneficiairesEffectifs-description\\.genre', { visible: true, timeout: 15000 })
        await page.select('#beneficiairesEffectifs-description\\.genre', '1');
      } else {
        await page.waitForSelector('#beneficiairesEffectifs-description\\.genre', { visible: true, timeout: 15000 })
        await page.select('#beneficiairesEffectifs-description\\.genre', '2');
      }

      try {
        await page.waitForSelector('#beneficiairesEffectifs-description\\.dateDeNaissance', { visible: true, timeout: 15000 });
        await page.click('#beneficiairesEffectifs-description\\.dateDeNaissance');
        await page.type('#beneficiairesEffectifs-description\\.dateDeNaissance', data?.form_05?.DateOfBirth);
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.log(error.message)
      }

      try {
        await page.waitForSelector('#beneficiairesEffectifs-description\\.paysNaissance', { visible: true, timeout: 15000 });
        await page.click('#beneficiairesEffectifs-description\\.paysNaissance');
        await page.type('#beneficiairesEffectifs-description\\.paysNaissance', data?.form_05?.NativeCountry);
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#beneficiairesEffectifs-description\\.codeNationalite', { visible: true, timeout: 15000 });
        await page.click('#beneficiairesEffectifs-description\\.codeNationalite');
        await page.type('#beneficiairesEffectifs-description\\.codeNationalite', data?.form_05?.Nationality);
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#beneficiairesEffectifs-adresse\\.codePays', { visible: true, timeout: 15000 });
        await page.click('#beneficiairesEffectifs-adresse\\.codePays');
        await page.type('#beneficiairesEffectifs-adresse\\.codePays', data?.form_05?.Country);
        await page.keyboard.press('Enter');
        console.log("Option Activités de services' selected successfully.");
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('#beneficiairesEffectifs-modalite\\.modalitesDeControle_3', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('#beneficiairesEffectifs-modalite\\.modalitesDeControle_3');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #beneficiairesEffectifs-modalite\\.modalitesDeControle_3 not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #beneficiairesEffectifs-modalite\\.modalitesDeControle_3: ${error.message}`);
      }

      setTimeout(async () => {
        try {
          const address = data?.form_05?.PlaceOfBirth;
          await page.waitForSelector('input#beneficiairesEffectifs-description\\.lieuDeNaissance', { visible: true, timeout: 15000 });
          await page.type('input#beneficiairesEffectifs-description\\.lieuDeNaissance', address);
          setTimeout(async () => {
            await page.waitForSelector('div#beneficiairesEffectifs-description\\.lieuDeNaissance', { visible: true, timeout: 15000 });
            await page.type('div#beneficiairesEffectifs-description\\.lieuDeNaissance', address);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter')
          }, 5000);

        } catch (error: any) {
          console.log("Error:", error.message);
        }
      }, 1000)

      setTimeout(async () => {
        try {
          const address = data?.form_05?.Address;
          await page.waitForSelector('input#beneficiairesEffectifs-adresse\\.voie', { visible: true, timeout: 15000 });
          await page.type('input#beneficiairesEffectifs-adresse\\.voie', address);
          setTimeout(async () => {
            await page.waitForSelector('div#beneficiairesEffectifs-adresse\\.voie', { visible: true, timeout: 15000 });
            await page.type('div#beneficiairesEffectifs-adresse\\.voie', address);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter')
            await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true, timeout: 15000 })
            await page.click('.bottom button[type="button"].btn.btn-primary');

            // ==========================

            setTimeout(async () => {
              await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true, timeout: 15000 })
              await page.click('.bottom button[type="button"].btn.btn-primary');
              await form_06()
            }, 1000)

            // ==========================

          }, 5000);

        } catch (error: any) {
          console.log("Error:", error.message);
        }
      }, 7000)

    }

    // ====================================================================OPTIONS FISCALes========================================================================================

    async function form_06() {

      try {
        await page.waitForSelector('input#options-fiscales\\.regimeImpositionBenefices', { visible: true, timeout: 15000 });
        await page.click('input#options-fiscales\\.regimeImpositionBenefices');
        await page.type('input#options-fiscales\\.regimeImpositionBenefices', 'Réel simplifié IS');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      try {
        await page.waitForSelector('input#options-fiscales\\.regimeImpositionTVA', { visible: true, timeout: 15000 });
        await page.click('input#options-fiscales\\.regimeImpositionTVA');
        await page.type('input#options-fiscales\\.regimeImpositionTVA', 'Franchise en base TVA');
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true })
      await page.click('.bottom button[type="button"].btn.btn-primary');

      await form_07()
    }

    // =====================================================================Pièces jointes=========================================================================================

    async function form_07() {
      const axios = require('axios');

      try {
        await page.waitForSelector('input#documentTypeSelect', { visible: true, timeout: 15000 });
        await page.click('input#documentTypeSelect');
        await page.type('input#documentTypeSelect', data?.form_07?.room_type);
        await page.keyboard.press('Enter');
      } catch (error: any) {
        console.error(`An error occurred while selecting the option: ${error.message}`);
      }

      const url_01 = data?.form_07?.doc_01;
      const selector_01 = 'input[aria-labelledby="piecesJointes\\.PJPM0001-file-drop-label"]';

      const url_02 = data?.form_07?.doc_02;
      const selector_02 = 'input[aria-labelledby="piecesJointes\\.PJPM0021-file-drop-label"]';

      const url_03 = data?.form_07?.doc_03;
      const selector_03 = 'input[aria-labelledby="piecesJointes\\.PJPM0068-file-drop-label"]';

      const url_04 = data?.form_07?.doc_04;
      const selector_04 = 'input[aria-labelledby="piecesJointes\\.PJPM0115-file-drop-label"]';

      const url_05 = data?.form_07?.doc_05;
      const selector_05 = 'input[aria-labelledby="piecesJointes\\.PJPM0012-file-drop-label"]';

      const url_06 = data?.form_07?.doc_06;
      const selector_06 = 'input[aria-labelledby="piecesJointes\\.PJPM0069-file-drop-label"]';

      const url_07 = data?.form_07?.doc_07;
      const selector_07 = 'input[aria-labelledby="piecesJointes\\.PJPM0018-file-drop-label"]';

      const url_08 = data?.form_07?.doc_08;
      const selector_08 = 'input[aria-labelledby="piecesJointes\\.PJPM0014-file-drop-label"]';



      async function insertDateIntoPDF(pdfUrl: any) {
        const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const existingPdfBytes = Buffer.from(response.data);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const today = new Date().toLocaleDateString();
        firstPage.drawText(today, {
          x: 50,
          y: 50,
          size: 12,
          color: rgb(0, 0, 0),
        });

        const modifiedPdfBytes = await pdfDoc.save();
        console.log("Modified PDF content:");
        return modifiedPdfBytes;
      }

      async function uploadFileToElement(selector: string, pdfUrl: string) {
        try {
          const modifiedPdfBytes = await insertDateIntoPDF(pdfUrl);
          const modifiedPdfBuffer = Buffer.from(modifiedPdfBytes);
          const tempFilePath = tempWrite.sync(modifiedPdfBuffer, 'modified_file.pdf');
          const fileInput = await page.$(selector);
          await fileInput.uploadFile(tempFilePath);
          console.log("File uploaded successfully with date inserted");

        } catch (error: any) {
          console.log("Error uploading file:", error.message);
        }
      }

      await uploadFileToElement(selector_01, url_01);

      await uploadFileToElement(selector_02, url_02);

      await uploadFileToElement(selector_03, url_03);

      await uploadFileToElement(selector_04, url_04);

      await uploadFileToElement(selector_05, url_05);

      await uploadFileToElement(selector_06, url_06);

      await uploadFileToElement(selector_07, url_07);

      await uploadFileToElement(selector_08, url_08);



      setTimeout(async () => {
        await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true, timeout: 15000 })
        await page.click('.bottom button[type="button"].btn.btn-primary');
        await form_08()
      }, 15000)

    }

    // ===============================================================Observations et correspondance===============================================================================

    async function form_08() {

      try {
        await page.waitForSelector('input#observation\\.diffusionCommerciale', { visible: true, timeout: 15000 });
        const radioButton1 = await page.$('input#observation\\.diffusionCommerciale');
        if (radioButton1) {
          await radioButton1.click();
        } else {
          throw new Error('Radio button #observation\\.diffusionCommerciale not found');
        }
      } catch (error: any) {
        console.error(`Error selecting radio button #observation\\.diffusionCommerciale: ${error.message}`);
      }

      await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true, timeout: 15000 })
      await page.click('.bottom button[type="button"].btn.btn-primary');

      await form_09()

    }

    // =============================================================== Recapitulatif================================================================================================

    async function form_09() {
      setTimeout(async () => {
        await page.waitForSelector('.bottom button[type="button"].btn.btn-primary', { visible: true })
        await page.click('.bottom button[type="button"].btn.btn-primary');
      }, 1000)

    }

    // =============================================================================================================================================================================


  } catch (error) {

    return false;
  } finally {
    // window.location.href = 'http://localhost:3000/onboarding';
    // await browser.close();
  }
}

