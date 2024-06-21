/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  delayTime,
  moveToCreatePage,
  landOnEventHome,
  moveToEventsHome,
  moveToNotebook,
  moveToPanelHome,
  expectMessageOnHover,
  baseQuery,
  nameOne,
  description,
  trace_one,
  trace_two,
  TYPING_DELAY,
  TIMEOUT_DELAY,
} from '../../../utils/constants';

describe('Creating application', () => {
  beforeEach(() => {
    moveToCreatePage();
  });

  it('Creates an application and redirects to application', () => {
    expectMessageOnHover('createButton', 'Name is required.');
    cy.get('[data-test-subj="nameFormRow"]', { timeout: TIMEOUT_DELAY }).type(
      nameOne
    );
    expectMessageOnHover(
      'createButton',
      'Provide at least one log source, service, entity or trace group.'
    );
    cy.get('[data-test-subj="descriptionFormRow"]', {
      timeout: TIMEOUT_DELAY,
    }).type(description);
    cy.get('[data-test-subj="servicesEntitiesAccordion"]', {
      timeout: TIMEOUT_DELAY,
    })
      .trigger('mouseover')
      .click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]', {
      timeout: TIMEOUT_DELAY,
    }).click();
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.get('[data-test-subj="servicesEntitiesCountBadge"]', {
      timeout: TIMEOUT_DELAY,
    }).should('contain', '1');
    cy.get('[data-test-subj="logSourceAccordion"]', { timeout: TIMEOUT_DELAY })
      .trigger('mouseover')
      .click();
    cy.get('[data-test-subj="createButton"]').should('not.be.disabled');
    cy.get('[data-test-subj="createAndSetButton"]').should('be.disabled');
    expectMessageOnHover(
      'createAndSetButton',
      'Log source is required to set availability.'
    );
    cy.get('[data-test-subj="searchAutocompleteTextArea"]', {
      timeout: TIMEOUT_DELAY,
    }).type(baseQuery, { delay: TYPING_DELAY });
    cy.get('[data-test-subj="traceGroupsAccordion"]', {
      timeout: TIMEOUT_DELAY,
    })
      .trigger('mouseover')
      .click();
    cy.get('[data-test-subj="traceGroupsComboBox"]', { timeout: TIMEOUT_DELAY })
      .scrollIntoView()
      .type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('[data-test-subj="traceGroupsCountBadge"]', {
      timeout: TIMEOUT_DELAY,
    }).should('contain', '2');
    cy.get('[data-test-subj="createButton"]', {
      timeout: TIMEOUT_DELAY,
    }).should('not.be.disabled');
    cy.get('[data-test-subj="createButton"]', {
      timeout: TIMEOUT_DELAY,
    }).click();
    // cy.get('[data-test-subj="applicationTitle"]', {
    //   timeout: TIMEOUT_DELAY,
    // }).should('contain', nameOne);
    // cy.get('[data-test-subj="app-analytics-panelTab"]', {
    //   timeout: TIMEOUT_DELAY,
    // }).click();
    // cy.get('[data-test-subj="addFirstVisualizationText"]', {
    //   timeout: TIMEOUT_DELAY,
    // }).should('exist');
  });
});

describe('Click actions for adding sample', () => {
  beforeEach(() => {
    landOnEventHome();
  });

  it('Actions - add sample data', () => {
    cy.get('[data-test-subj="eventHomeAction"]').click();
    cy.wait(delayTime);
    cy.get('[data-test-subj="eventHomeAction__addSamples"]').click();
    cy.get('[data-test-subj="confirmModalConfirmButton"]').click();
    // cy.contains('Sample events added successfully.', { timeout: 10000 });
  });
});

describe('Adding sample visualization', () => {
  beforeEach(() => {
    moveToEventsHome();
  });

  it('Add sample observability data', () => {
    cy.get('button[data-test-subj="eventHomeAction"]')
      .trigger('mouseover')
      .click();
    cy.wait(100);
    cy.get('button[data-test-subj="eventHomeAction__addSamples"]')
      .trigger('mouseover')
      .click();
    cy.wait(100 * 3);
    cy.get('.euiModalHeader__title[data-test-subj="confirmModalTitleText"]')
      .contains('Add samples')
      .should('exist');
    cy.wait(100);

    cy.get('button[data-test-subj="confirmModalConfirmButton"]')
      .trigger('mouseover')
      .click();
    cy.wait(100 * 5);
    cy.get('.euiToastHeader__title', { timeout: delayTime * 3 }).should(
      'contain',
      'successfully'
    );
    cy.wait(100);
  });
});

describe('Adding sample for notebook', () => {
  beforeEach(() => {
    moveToNotebook();
  });

  it('Add sample observability data', () => {
    cy.get('.euiButton__text').contains('Add samples').click();
    cy.wait(delayTime);
    cy.get('.euiModalHeader__title[data-test-subj="confirmModalTitleText"]')
      .contains('Add sample')
      .should('exist');
    cy.wait(100);

    cy.get('button[data-test-subj="confirmModalConfirmButton"]')
      .trigger('mouseover')
      .click();
    cy.wait(100 * 5);
    cy.get('.euiToastHeader__title', { timeout: delayTime * 3 }).should(
      'contain',
      'successfully'
    );
    cy.wait(100);
  });
});

describe('Adding sample for dashboards', () => {
  beforeEach(() => {
    moveToPanelHome();
  });

  it('Add sample observability data for dashboards', () => {
    cy.get('button[data-test-subj="operationalPanelsActionsButton"]')
      .trigger('mouseover')
      .click();
    cy.wait(100);
    cy.get('button[data-test-subj="addSampleContextMenuItem"]')
      .trigger('mouseover')
      .click();
    cy.wait(100 * 3);
    cy.get('.euiModalHeader__title[data-test-subj="confirmModalTitleText"]')
      .contains('Add samples')
      .should('exist');
    cy.wait(100);

    cy.get('button[data-test-subj="confirmModalConfirmButton"]')
      .trigger('mouseover')
      .click();
    cy.wait(100 * 5);
    cy.get('.euiToastHeader__title', { timeout: delayTime * 3 }).should(
      'contain',
      'successfully'
    );
    cy.wait(100);
  });
});
