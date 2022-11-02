/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  // CommonUI,
  MiscUtils,
} from '@opensearch-dashboards-test/opensearch-dashboards-test-library';
import { CURRENT_TENANT } from '../../../utils/commands';
import { BASE_PATH } from '../../../utils/base_constants';

// const commonUI = new CommonUI(cy);
const miscUtils = new MiscUtils(cy);

describe('dashboard sample data validation', () => {
  before(() => {});

  after(() => {});

  describe('adding sample data', () => {
    before(() => {});

    after(() => {
      // miscUtils.removeSampleData();
    });

    it('adds sample data', () => {
      CURRENT_TENANT.newTenant = 'global';
      miscUtils.visitPage(`${BASE_PATH}/app/home#`);
      cy.wait(10000);
      cy.visit(`${BASE_PATH}/app/home#/tutorial_directory`);
      miscUtils.addSampleData();
      // cy.wait(10000);
      //miscUtils.addSampleData();
      // cy.visit('app/home#/tutorial_directory');
      // cy.getElementByTestId('account-popove').click();
      // cy.get('[data-test-subj="tenant-switch-modal"]');
      // cy.get('[data-test-subj="confirm"]').click();
      cy.wait(10000);
    });

    // it('checking web logs dashboards displayed', () => {
    //   // cy.visit('/app/home?security_tenant=global#/');
    //   // cy.visit(
    //   //   'app/home?security_tenant=global#/tutorial_directory/sampledata'
    //   // );
    //   // Set welcome screen tracking to false
    //   localStorage.setItem('home:welcome:show', 'false');
    //   CURRENT_TENANT.newTenant = 'global';
    //   // cy.clearCookies();
    //   // cy.visit('app/home?security_tenant=private#/tutorial_directory');
    //   cy.visit('app/home#/tutorial_directory');
    //   cy.wait(10000);
    //   // CURRENT_TENANT.newTenant = 'global';
    //   // const miscUtils = new MiscUtils(cy);
    //   // miscUtils.addSampleData();
    //   //cy.wait(300000);
    //   // cy.visit('app/home?security_tenant=global#/tutorial_directory', {
    //   //   waitForGetTenant: false,
    //   // });
    //   // cy.contains('user-icon-btn').click();
    //   // cy.getElementByTestId('switch-tenants').click();
    //   // cy.getElementByTestId('confirm').click();

    //   // cy.get('button[data-test-subj="addSampleDataSetecommerce"]')
    //   //   .should('be.visible')
    //   //   .click();
    //   // cy.get('button[data-test-subj="addSampleDataSetflights"]')
    //   //   .should('be.visible')
    //   //   .click();
    //   // cy.get('button[data-test-subj="addSampleDataSetlogs"]')
    //   //   .should('be.visible')
    //   //   .click();

    //   // commonUI.checkElementContainsValue(
    //   //   'span[title="[Logs] Web Traffic"]',
    //   //   1,
    //   //   '\\[Logs\\] Web Traffic'
    //   // );
    //   // commonUI.checkElementContainsValue(
    //   //   'div[data-test-subj="markdownBody"] > h3',
    //   //   1,
    //   //   'Sample Logs Data'
    //   // );
    // });
  });
});
