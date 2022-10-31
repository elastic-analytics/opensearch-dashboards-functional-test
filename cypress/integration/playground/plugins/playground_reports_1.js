/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  visitReportingLandingPage,
  WAIT_TIME,
  BASE_PATH,
} from '../../../utils/constants';

describe('Test reports', () => {
  // add sample data
  before(() => {
    // Sample data already added
  });

  it('Visits Reporting homepage', () => {
    visitReportingLandingPage();
  });

  it('Visit Create page', () => {
    visitCreateReportDefinitionPage();
  });

  it('Create a new on-demand dashboard report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('dashboard on-demand report');
    setReportDefinitionDescription('sample dashboard report');
    selectReportSourceComboBox();

    // // select drop-down option in report source list
    cy.contains('[Logs] Web Traffic').click();

    cy.wait(500);
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new on-demand visualization report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('visualization on-demand report');
    setReportDefinitionDescription('visualization report');
    selectReportSource('#visualizationReportSource');
    selectReportSourceComboBox();
    cy.wait(500);
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new on-demand saved search report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('saved search on-demand report');
    setReportDefinitionDescription('saved search report');
    selectReportSource('#savedSearchReportSource');
    selectReportSourceComboBox();
    cy.wait(500);
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new dashboard daily recurring report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample dashboard daily scheduled report');
    setReportDefinitionDescription('dashboard daily scheduled report');
    selectReportSourceComboBox();

    // select drop-down option in report source list
    cy.contains('[Logs] Web Traffic').click();

    cy.wait(500);
    setReportTriggerToSchedule();
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new visualization daily recurring report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample visualization daily recurring report');
    setReportDefinitionDescription('visualization daily recurring report');
    selectReportSource('#visualizationReportSource');
    selectReportSourceComboBox();
    cy.wait(500);
    setReportTriggerToSchedule();
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new saved search daily recurring report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample saved search daily recurring report');
    setReportDefinitionDescription('saved search daily recurring report');
    selectReportSource('#savedSearchReportSource');
    selectReportSourceComboBox();
    setReportTriggerToSchedule();
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new dashboard interval recurring report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample dashboard interval recurring report');
    setReportDefinitionDescription('dashboard interval recurring report');
    selectReportSourceComboBox();

    // select drop-down option in report source list
    cy.contains('[Logs] Web Traffic').click();

    cy.wait(500);
    setReportTriggerToSchedule();
    cy.wait(WAIT_TIME);
    selectIntervalScheduleFrequency();
    inputTextIntoField('#recurringByIntervalNumber', '900');
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new visualization interval recurring report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample visualization interval recurring report');
    selectReportSource('#visualizationReportSource');
    selectReportSourceComboBox();
    cy.wait(3000);
    setReportTriggerToSchedule();
    cy.wait(WAIT_TIME);
    selectIntervalScheduleFrequency();
    inputTextIntoField('#recurringByIntervalNumber', '900');
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a new saved search interval recurring report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample saved search interval recurring report');
    selectReportSource('#savedSearchReportSource');
    selectReportSourceComboBox();
    cy.wait(3000);
    setReportTriggerToSchedule();
    cy.wait(WAIT_TIME);
    selectIntervalScheduleFrequency();
    inputTextIntoField('#recurringByIntervalNumber', '900');
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a dashboard cron-based report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample dashboard cron-based report');
    selectReportSourceComboBox();

    // select drop-down option in report source list
    cy.contains('[Logs] Web Traffic').click();
    cy.wait(500);
    setReportTriggerToSchedule();
    selectCronBasedRequestTime();
    cy.wait(WAIT_TIME);
    inputTextIntoField('#cronExpressionFieldText', '0 12 * * *');
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a visualization cron-based report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample visualization cron-based report');
    selectReportSource('#visualizationReportSource');
    selectReportSourceComboBox();
    setReportTriggerToSchedule();
    selectCronBasedRequestTime();
    cy.wait(WAIT_TIME);
    inputTextIntoField('#cronExpressionFieldText', '0 12 * * *');
    cy.wait(500);
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });

  it('Create a saved search cron-based report definition', () => {
    visitCreateReportDefinitionPage();
    setReportDefinitionName('sample saved search cron-based report');
    selectReportSource('#savedSearchReportSource');
    selectReportSourceComboBox();
    setReportTriggerToSchedule();
    selectCronBasedRequestTime();
    cy.wait(WAIT_TIME);
    inputTextIntoField('#cronExpressionFieldText', '0 12 * * *');
    cy.wait(500);
    clickCreateReportDefinitionButton();
    cy.wait(3000);
    verifyOnReportingLandingPage();
  });
});

function visitCreateReportDefinitionPage() {
  cy.visit(`${BASE_PATH}/app/reports-dashboards#/`, {
    waitForGetTenant: false,
  });
  cy.location('pathname', { timeout: 60000 }).should(
    'include',
    '/reports-dashboards'
  );
  cy.wait(3000);
  cy.get('#createReportHomepageButton').click();
}

function setReportDefinitionName(name) {
  cy.get('#reportSettingsName').type(name);
}

function setReportDefinitionDescription(description) {
  cy.get('#reportSettingsDescription').type(description);
}

function selectReportSource(name) {
  cy.get(name).click({ force: true });
}

function selectReportSourceComboBox() {
  cy.get('[data-test-subj="comboBoxInput"]').eq(0).click({ force: true });
}

function setReportTriggerToSchedule() {
  cy.get('#Schedule').check({ force: true });
}

function selectIntervalScheduleFrequency() {
  cy.get('#recurringFrequencySelect').select('By interval');
}

function selectCronBasedRequestTime() {
  cy.contains('Cron based').click({ force: true });
}

function inputTextIntoField(selector, text) {
  cy.get(selector).type(text);
}

function clickCreateReportDefinitionButton() {
  cy.get('#createNewReportDefinition').click({ force: true });
}

function verifyOnReportingLandingPage() {
  cy.get('#reportDefinitionDetailsLink').should('exist');
}
