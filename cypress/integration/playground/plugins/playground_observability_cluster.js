/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  moveToCreatePage,
  moviegeekDataSet,
  expectMessageOnHover,
  moviegeekQuery,
  moviegeekdescription,
  TYPING_DELAY,
  TIMEOUT_DELAY,
} from '../../../utils/constants';

describe('Adds moviegeek related stuff', () => {
  it('Adds moviegeek documents', () => {
    cy.exec(
      'curl http://k8s-default-ingressd-7c01e92c54-1695405417.us-east-1.elb.amazonaws.com/load'
    ).then((result) => {
      cy.log(result.stdout);
      cy.log(result.stderr);
    });
  });
  it('Adds moviegeek-logs index', () => {
    cy.exec(
      'curl http://k8s-default-ingressm-abb5cc84be-1467540175.us-east-1.elb.amazonaws.com'
    ).then((result) => {
      cy.log(result.stdout);
      cy.log(result.stderr);
    });
  });
  it('Enable Movie Geek to search the data', () => {
    const dumpDataSet = (moviegeek_url) => {
      cy.request(moviegeek_url).then((response) => {
        cy.request({
          method: 'POST',
          form: true,
          url: 'api/console/proxy',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'osd-xsrf': true,
          },
          qs: {
            path: '_scripts/simple-search',
            method: 'POST',
          },
          body: response.body,
        });
      });
    };
    moviegeekDataSet.forEach(({ moviegeek_url }) => dumpDataSet(moviegeek_url));
  });
  it('Delete Movie Geek index instead of reindex', () => {
    cy.request({
      method: 'POST',
      form: true,
      url: 'api/console/proxy',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'osd-xsrf': true,
      },
      qs: {
        path: 'moviegeek-logs-*',
        method: 'DELETE',
      },
    });
  });
});

describe('Creates an Moviegeek application', () => {
  beforeEach(() => {
    moveToCreatePage();
  });
  it('Creates an Moviegeek application', () => {
    cy.wait(30000);
    expectMessageOnHover('createButton', 'Name is required.');
    cy.get('[data-test-subj="nameFormRow"]', { timeout: TIMEOUT_DELAY }).type(
      'Moviegeek Analytics'
    );
    expectMessageOnHover(
      'createButton',
      'Provide at least one log source, service, entity or trace group.'
    );
    cy.get('[data-test-subj="descriptionFormRow"]', {
      timeout: TIMEOUT_DELAY,
    }).type(moviegeekdescription);
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
    cy.focused().type('{enter}');
    cy.focused().type('{enter}');
    cy.focused().type('{enter}');
    cy.focused().type('{enter}');
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
    })
      .focus()
      .wait(TYPING_DELAY)
      .type(moviegeekQuery, {
        delay: TYPING_DELAY,
        force: true,
      });
    cy.get('[data-test-subj="createButton"]', {
      timeout: TIMEOUT_DELAY,
    }).should('not.be.disabled');
    cy.get('[data-test-subj="createButton"]', {
      timeout: TIMEOUT_DELAY,
    }).click();
  });
});
