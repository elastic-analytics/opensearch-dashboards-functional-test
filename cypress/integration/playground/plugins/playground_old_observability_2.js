/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  delayTime,
  TEST_NOTEBOOK,
  MARKDOWN_TEXT,
  SQL_QUERY_TEXT,
  PPL_QUERY_TEXT,
  SAMPLE_PANEL,
  BASE_PATH,
} from '../../../utils/constants';

const moveToPanelHome = () => {
  cy.visit(`${BASE_PATH}/app/observability-dashboards#/operational_panels/`);
  cy.wait(delayTime * 3);
};

describe('Adding sample visualization', () => {
  it('Add sample observability data', () => {
    moveToPanelHome();
    cy.get('.euiButton__text').contains('Actions').trigger('mouseover').click();
    cy.wait(100);
    cy.get('.euiContextMenuItem__text')
      .contains('Add samples')
      .trigger('mouseover')
      .click();
    cy.wait(100 * 3);
    cy.get('.euiModalHeader__title[data-test-subj="confirmModalTitleText"]')
      .contains('Add samples')
      .should('exist');
    cy.wait(100);
    cy.intercept(
      'POST',
      '/api/observability/operational_panels/panels/addSamplePanels'
    ).as('addSamples');
    cy.get('.euiButton__text').contains('Yes').trigger('mouseover').click();
    cy.wait('@addSamples').then(() => {
      cy.get('.euiTableCellContent').contains(SAMPLE_PANEL).should('exist');
    });
    cy.wait(100);
  });
});

describe('Testing notebooks table', () => {
  beforeEach(() => {
    cy.visit(`${BASE_PATH}/app/observability-dashboards#/notebooks`);
  });

  it('Creates a notebook and redirects to the notebook', () => {
    cy.get('.euiButton__text').contains('Create notebook').click();
    cy.wait(delayTime);
    cy.get('input.euiFieldText').type(TEST_NOTEBOOK);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delayTime);

    cy.contains(TEST_NOTEBOOK).should('exist');
  });
});

describe('Testing paragraphs', () => {
  beforeEach(() => {
    cy.visit(`${BASE_PATH}/app/observability-dashboards#/notebooks`);
    cy.get('.euiTableCellContent').contains(TEST_NOTEBOOK).click();
  });

  it('Goes into a notebook and creates paragraphs', () => {
    cy.get('.euiButton__text').contains('Add').click();
    cy.wait(delayTime);

    cy.get('.euiTextArea').should('exist');

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime);
    cy.get('.euiTextColor').contains('Input is required.').should('exist');
    cy.get('.euiTextArea').clear();
    cy.get('.euiTextArea').type(MARKDOWN_TEXT);
    cy.wait(delayTime);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime);
  });

  it('Has working breadcrumbs', () => {
    cy.get('.euiBreadcrumb').contains(TEST_NOTEBOOK).click();
    cy.wait(delayTime);
    cy.get('.euiTitle').contains(TEST_NOTEBOOK).should('exist');
    cy.get('.euiBreadcrumb').contains('Notebooks').click();
    cy.wait(delayTime);
    cy.get('.euiTitle').contains('Notebooks').should('exist');
    cy.get('.euiBreadcrumb').contains('Observability').click();
    cy.wait(delayTime);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });

  it('Adds a dashboards visualization paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delayTime);
    cy.get('.euiContextMenuItem__text').contains('Visualization').click();
    cy.wait(delayTime);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime);
    cy.get('.euiTextColor')
      .contains('Visualization is required.')
      .should('exist');

    cy.get('.euiButton__text').contains('Browse').click();
    cy.wait(delayTime);
    cy.get('.euiFieldSearch')
      .focus()
      .type('[Flights] Flight Count and Average Ticket Price{enter}');
    cy.wait(delayTime);
    cy.get('.euiButton__text').contains('Select').click();
    cy.wait(delayTime);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime);
    cy.get('div.visualization').should('exist');
  });

  it('Adds a SQL query paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delayTime);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delayTime);

    cy.get('.euiTextArea').type(SQL_QUERY_TEXT);
    cy.wait(delayTime);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime * 5);

    cy.get('b').contains(
      'select * from opensearch_dashboards_sample_data_flights limit 20'
    );

    cy.get('.euiDataGrid__overflow').should('exist');
  });

  it('Adds an observability visualization paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delayTime);
    cy.get('.euiContextMenuItem__text').contains('Visualization').click();
    cy.wait(delayTime);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime);
    cy.get('.euiTextColor')
      .contains('Visualization is required.')
      .should('exist');

    cy.get('.euiButton__text').contains('Browse').click();
    cy.wait(delayTime);
    cy.get('.euiFieldSearch')
      .focus()
      .type('[Logs] Count total requests by tags{enter}');
    cy.wait(delayTime);
    cy.get('.euiButton__text').contains('Select').click();
    cy.wait(delayTime);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime);
    cy.get('h5')
      .contains('[Logs] Count total requests by tags')
      .should('exist');
  });

  it('Adds a PPL query paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delayTime);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delayTime);

    cy.get('.euiTextArea').type(PPL_QUERY_TEXT);
    cy.wait(delayTime);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delayTime * 5);

    cy.get('b').contains('source=opensearch_dashboards_sample_data_flights');

    cy.get('.euiDataGrid__overflow').should('exist');
  });
});
