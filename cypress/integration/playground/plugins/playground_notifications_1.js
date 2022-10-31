/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  BASE_PATH,
  NOTIFICATIONS_DELAY,
  NOTIFICATIONS_PLUGIN_NAME,
} from '../../../utils/constants';

describe('Test create email senders', () => {
  beforeEach(() => {
    cy.visit(`${BASE_PATH}/app/${NOTIFICATIONS_PLUGIN_NAME}#email-senders`);
    cy.wait(NOTIFICATIONS_DELAY * 3);
  });

  it('creates ssl sender', () => {
    cy.get('.euiButton__text')
      .contains('Create SMTP sender')
      .click({ force: true });
    cy.get('[data-test-subj="create-sender-form-name-input"]').type(
      'test-ssl-sender'
    );
    cy.get('.euiButton__text').contains('Create').click({ force: true });
    cy.contains('Some fields are invalid.').should('exist');

    cy.get('[data-test-subj="create-sender-form-email-input"]').type(
      'sample@email.com'
    );
    cy.get('[data-test-subj="create-sender-form-host-input"]').type(
      'sample-host.com'
    );
    cy.get('[data-test-subj="create-sender-form-port-input"]').type('123');
    cy.get('.euiButton__text').contains('Create').click({ force: true });
    cy.contains('successfully created.').should('exist');
    cy.contains('sample-ssl-sender').should('exist');
  });

  it('creates tls sender', () => {
    cy.get('.euiButton__text')
      .contains('Create SMTP sender')
      .click({ force: true });
    cy.get('[data-test-subj="create-sender-form-name-input"]').type(
      'sample-tls-sender'
    );
    cy.get('[data-test-subj="create-sender-form-email-input"]').type(
      'sample@email.com'
    );
    cy.get('[data-test-subj="create-sender-form-host-input"]').type(
      'sample-host.com'
    );
    cy.get('[data-test-subj="create-sender-form-port-input"]').type('123');
    cy.get('[data-test-subj="create-sender-form-encryption-input"]').click({
      force: true,
    });
    cy.wait(NOTIFICATIONS_DELAY);
    cy.get('.euiContextMenuItem__text').contains('TLS').click({ force: true });
    cy.wait(NOTIFICATIONS_DELAY);

    cy.get('.euiButton__text').contains('Create').click({ force: true });
    cy.contains('successfully created.').should('exist');
    cy.contains('sample-ssl-sender').should('exist');
  });

  it('creates SES sender', () => {
    cy.get('.euiButton__text')
      .contains('Create SES sender')
      .click({ force: true });
    cy.get('[data-test-subj="create-ses-sender-form-name-input"]').type(
      'sample-ses-sender-region1'
    );
    cy.get('[data-test-subj="create-ses-sender-form-email-input"]').type(
      'sample@email.com'
    );
    cy.get('[data-test-subj="create-ses-sender-form-role-arn-input"]').type(
      'arn:aws:iam::012345678912:role/NotificationsSESRole'
    );
    cy.get('[data-test-subj="create-ses-sender-form-aws-region-input"]').type(
      'us-east-1'
    );

    cy.get('.euiButton__text').contains('Create').click({ force: true });
    cy.contains('successfully created.').should('exist');
    cy.contains('sample-ses-sender-region1').should('exist');
  });
});

describe('Test create, edit and delete recipient group', () => {
  beforeEach(() => {
    cy.visit(
      `${BASE_PATH}/app/${NOTIFICATIONS_PLUGIN_NAME}#email-recipient-groups`
    );
    cy.wait(NOTIFICATIONS_DELAY * 3);
  });

  it('creates recipient group', () => {
    cy.get('.euiButton__text')
      .contains('Create recipient group')
      .click({ force: true });
    cy.get('[data-test-subj="create-recipient-group-form-name-input"]').type(
      'sample recipient group region1'
    );
    cy.get('.euiButton__text').contains('Create').click({ force: true });
    cy.contains('Some fields are invalid.').should('exist');

    cy.get(
      '[data-test-subj="create-recipient-group-form-description-input"]'
    ).type('sample group description');
    cy.get('[data-test-subj="comboBoxInput"]').type(
      'custom.email.1@email.com{enter}'
    );
    cy.get('[data-test-subj="comboBoxInput"]').type(
      'custom.email.2@email.com{enter}'
    );
    cy.get('[data-test-subj="comboBoxInput"]').type(
      'custom.email.3@email.com{enter}'
    );
    cy.wait(NOTIFICATIONS_DELAY);

    cy.get('.euiButton__text').contains('Create').click({ force: true });
    cy.contains('successfully created.').should('exist');
    cy.contains('sample recipient group region1').should('exist');
    cy.wait(NOTIFICATIONS_DELAY);
  });
});
