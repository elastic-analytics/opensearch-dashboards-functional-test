/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  PANEL_DELAY as delay,
  SAMPLE_PANEL,
  PPL_VISUALIZATIONS,
  PPL_VISUALIZATIONS_NAMES,
  supressResizeObserverIssue,
  BASE_PATH,
} from '../../../utils/constants';

const moveToEventsHome = () => {
  cy.visit(`${BASE_PATH}/app/observability-dashboards#/event_analytics/`);
  cy.wait(delay * 3);
};

const moveToPanelHome = () => {
  cy.visit(`${BASE_PATH}/app/observability-dashboards#/operational_panels/`);
  cy.wait(delay * 3);
};

const moveToTestPanel = () => {
  moveToPanelHome();
  cy.get('.euiTableCellContent')
    .contains(SAMPLE_PANEL)
    .trigger('mouseover')
    .click();
  cy.wait(delay * 3);
  cy.get('h1').contains(SAMPLE_PANEL).should('exist');
  cy.wait(delay);
};

describe('Creating visualizations', () => {
  beforeEach(() => {
    moveToEventsHome();
  });

  it('Create first visualization in event analytics', () => {
    cy.get('[id^=autocomplete-textarea]').focus().type(PPL_VISUALIZATIONS[0], {
      delay: 50,
    });
    cy.get('.euiButton__text').contains('Refresh').trigger('mouseover').click();
    cy.wait(delay);
    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]')
      .contains('Visualizations')
      .trigger('mouseover')
      .click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]')
      .trigger('mouseover')
      .click();
    cy.wait(1000);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]')
      .focus()
      .type(PPL_VISUALIZATIONS_NAMES[0], {
        delay: 50,
      });
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Create second visualization in event analytics', () => {
    cy.get('[id^=autocomplete-textarea]').focus().type(PPL_VISUALIZATIONS[1], {
      delay: 50,
    });
    cy.get('.euiButton__text').contains('Refresh').trigger('mouseover').click();
    cy.wait(delay);
    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]')
      .contains('Visualizations')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]')
      .trigger('mouseover')
      .click();
    cy.wait(1000);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]')
      .focus()
      .type(PPL_VISUALIZATIONS_NAMES[1], {
        delay: 50,
      });
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});

describe('Testing panels table', () => {
  beforeEach(() => {
    moveToPanelHome();
  });

  it('Creates a panel and redirects to the panel', () => {
    cy.get('.euiButton__text')
      .contains('Create panel')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('input.euiFieldText').focus().type(SAMPLE_PANEL, {
      delay: 50,
    });
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .trigger('mouseover')
      .click();
    cy.wait(delay);

    cy.contains(SAMPLE_PANEL).should('exist');
  });
});

describe('Testing a panel', () => {
  it('Move to test panel', () => {
    moveToTestPanel();
  });

  it('Opens visualization flyout from empty panel', () => {
    cy.get('.euiButton')
      .eq(4)
      .contains('Add visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Select existing visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiButton').contains('Cancel').trigger('mouseover').click();
    cy.get('.euiButton')
      .eq(2)
      .contains('Add visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Select existing visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiButton').contains('Cancel').trigger('mouseover').click();
    cy.get('.euiButton')
      .contains('Add visualization')
      .first()
      .trigger('mouseover')
      .click();
    cy.get('.euiContextMenuItem__text')
      .contains('Create new visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiBreadcrumb').contains('Explorer').should('exist');
    // cy.get('.euiCallOut')
    //   .contains('No results match your search criteria')
    //   .should('exist');
  });

  it('Redirects to correct page on breadcrumb click', () => {
    moveToTestPanel();
    cy.get('.euiBreadcrumb')
      .contains(SAMPLE_PANEL)
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(SAMPLE_PANEL).should('exist');
    cy.get('.euiBreadcrumb')
      .contains('Operational panels')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Operational panels').should('exist');
    cy.get('.euiBreadcrumb')
      .contains('Observability')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });

  it('Change date filter of the panel', () => {
    moveToTestPanel();
    cy.get(
      '.euiButtonEmpty[data-test-subj="superDatePickerToggleQuickMenuButton"]'
    ).click({
      force: true,
    });
    cy.get('.euiLink').contains('This year').trigger('mouseover').click();
    cy.wait(delay * 2);
    cy.get(
      '.euiSuperDatePicker__prettyFormat[data-test-subj="superDatePickerShowDatesButton"]'
    )
      .contains('This year')
      .should('exist');
    cy.wait(delay);
  });

  it('Add existing visualization #1', () => {
    cy.get('.euiButton__text')
      .contains('Add visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Select existing visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('select').select(PPL_VISUALIZATIONS_NAMES[0]);
    cy.get('button[aria-label="refreshPreview"]').trigger('mouseover').click();
    cy.wait(delay * 2);
    cy.get('.plot-container').should('exist');
    cy.get('.euiButton__text')
      .contains(new RegExp('^Add$', 'g'))
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Add existing visualization #2', () => {
    cy.get('.euiButton__text')
      .contains('Add visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Select existing visualization')
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('select').select(PPL_VISUALIZATIONS_NAMES[1]);
    cy.get('button[aria-label="refreshPreview"]').trigger('mouseover').click();
    cy.wait(delay * 2);
    cy.get('.plot-container').should('exist');
    cy.get('.euiButton__text')
      .contains(new RegExp('^Add$', 'g'))
      .trigger('mouseover')
      .click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});
