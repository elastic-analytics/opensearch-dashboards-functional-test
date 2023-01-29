/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  delay,
  NOTIFICATIONS_PLUGIN_NAME,
} from '../../../utils/plugins/notifications-dashboards/constants';
import { BASE_PATH } from '../../../utils/base_constants';

describe('Test create channels', () => {
  beforeEach(() => {
    cy.visit(`${BASE_PATH}/app/${NOTIFICATIONS_PLUGIN_NAME}#create-channel`, {
      waitForGetTenant: false,
    });
    cy.wait(delay * 3);
  });

  it('creates a slack channel and send test message', () => {
    cy.get('[data-test-subj="create-channel-create-button"]').click();
    cy.contains('Some fields are invalid.').should('exist');

    cy.get('[placeholder="Enter channel name"]').type('sample slack channel');
    cy.get('[data-test-subj="create-channel-slack-webhook-input"]').type(
      'https://sample-slack-webhook'
    );
    cy.wait(delay);
    cy.get('[data-test-subj="create-channel-send-test-message-button"]').click({
      force: true,
    });
    cy.wait(delay);
    // This needs some time to appear as it will wait for backend call to timeout
    cy.contains('test message.').should('exist');

    cy.get('[data-test-subj="create-channel-create-button"]').click({
      force: true,
    });
    cy.contains('successfully created.').should('exist');
  });

  it('creates a chime channel', () => {
    cy.get('[placeholder="Enter channel name"]').type('sample chime channel');

    cy.get('.euiSuperSelectControl').contains('Slack').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Chime')
      .click({ force: true });
    cy.wait(delay);

    cy.get('[data-test-subj="create-channel-chime-webhook-input"]').type(
      'https://sample-chime-webhook'
    );
    cy.wait(delay);

    cy.get('[data-test-subj="create-channel-create-button"]').click();
    cy.contains('successfully created.').should('exist');
  });

  it('creates a email channel', () => {
    cy.get('[placeholder="Enter channel name"]').type('sample email channel');

    cy.get('.euiSuperSelectControl').contains('Slack').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Email')
      .click({ force: true });
    cy.wait(delay);

    // custom data-test-subj does not work on combo box
    cy.get('[data-test-subj="comboBoxInput"]').eq(0).click({ force: true });
    cy.contains('sample-tls-sender').click();

    cy.get('.euiButton__text')
      .contains('Create recipient group')
      .click({ force: true });
    cy.get('[data-test-subj="create-recipient-group-form-name-input"]').type(
      'sample recipient group region2'
    );
    cy.get('[data-test-subj="comboBoxInput"]')
      .last()
      .type('custom.email@sample.com{enter}');
    cy.get(
      '[data-test-subj="create-recipient-group-form-description-input"]'
    ).type('recipient group created while creating email channel.');
    cy.wait(delay);
    cy.get(
      '[data-test-subj="create-recipient-group-modal-create-button"]'
    ).click();
    cy.contains('successfully created.').should('exist');

    cy.get('[data-test-subj="create-channel-create-button"]').click();
    cy.contains('successfully created.').should('exist');
  });

  it('creates a email channel with ses sender', () => {
    cy.get('[placeholder="Enter channel name"]').type(
      'sample email channel with ses'
    );

    cy.get('.euiSuperSelectControl').contains('Slack').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Email')
      .click({ force: true });
    cy.wait(delay);

    cy.get('input.euiRadio__input#ses_account').click({ force: true });
    cy.wait(delay);

    cy.get('.euiButton__text')
      .contains('Create SES sender')
      .click({ force: true });
    cy.get('[data-test-subj="create-ses-sender-form-name-input"]').type(
      'sample-ses-sender-region2'
    );
    cy.get('[data-test-subj="create-ses-sender-form-email-input"]').type(
      'sample@email.com'
    );
    cy.get('[data-test-subj="create-ses-sender-form-role-arn-input"]').type(
      'arn:aws:iam::012345678910:role/NotificationsSESRole'
    );
    cy.get('[data-test-subj="create-ses-sender-form-aws-region-input"]').type(
      'us-west-1'
    );
    cy.get('[data-test-subj="create-ses-sender-modal-create-button"]').click();
    cy.contains('successfully created.').should('exist');

    // custom data-test-subj does not work on combo box
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click({ force: true });
    cy.contains('sample recipient group region2').click();
    cy.wait(delay);

    cy.get('[data-test-subj="create-channel-create-button"]').click();
    cy.contains('successfully created.').should('exist');
  });

  it('creates a webhook channel', () => {
    cy.get('[placeholder="Enter channel name"]').type('sample webhook channel');

    cy.get('.euiSuperSelectControl').contains('Slack').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Custom webhook')
      .click({ force: true });
    cy.wait(delay);

    cy.get('[data-test-subj="custom-webhook-url-input"]').type(
      'https://custom-webhook-test-url.com:8888/test-path?params1=value1&params2=value2&params3=value3&params4=value4&params5=values5&params6=values6&params7=values7'
    );

    cy.get('[data-test-subj="create-channel-create-button"]').click();
    cy.contains('successfully created.').should('exist');
  });

  it('creates a sns channel', () => {
    cy.get('[placeholder="Enter channel name"]').type('sample sns channel');

    cy.get('.euiSuperSelectControl').contains('Slack').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains('Amazon SNS')
      .click({ force: true });
    cy.wait(delay);

    cy.get('[data-test-subj="sns-settings-topic-arn-input"]').type(
      'arn:aws:sns:us-west-2:123456789012:notifications-sample'
    );
    cy.get('[data-test-subj="sns-settings-role-arn-input"]').type(
      'arn:aws:iam::012345678901:role/NotificationsSNSRole'
    );

    cy.get('[data-test-subj="create-channel-create-button"]').click();
    cy.contains('successfully created.').should('exist');
  });
});

describe('Test channels table', () => {
  beforeEach(() => {
    cy.visit(`${BASE_PATH}/app/${NOTIFICATIONS_PLUGIN_NAME}#channels`);
    cy.wait(delay * 3);
  });

  it('displays channels', () => {
    cy.contains('sample slack channel').should('exist');
    cy.contains('sample email channel').should('exist');
    cy.contains('sample chime channel').should('exist');
    cy.contains('sample webhook channel').should('exist');
  });

  it('mutes channels', () => {
    cy.get('.euiCheckbox__input[aria-label="Select this row"]').eq(0).click(); // chime channel
    cy.get('.euiButton__text').contains('Actions').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Mute').click({ force: true });
    cy.wait(delay);
    cy.get('[data-test-subj="mute-channel-modal-mute-button"]').click({
      force: true,
    });
    cy.wait(delay);
    cy.contains('successfully muted.').should('exist');
    cy.contains('Muted').should('exist');
  });

  it('filters channels', () => {
    cy.get('input[placeholder="Search"]')
      .type('chime{enter}')
      .trigger('search');
    cy.wait(delay);
    cy.contains('sample chime channel').should('exist');
    cy.contains('sample slack channel').should('not.exist');
    cy.contains('sample email channel').should('not.exist');
    cy.contains('sample webhook channel').should('not.exist');

    cy.get('input[placeholder="Search"]')
      .type('Source{enter}')
      .trigger('search');
    cy.wait(delay);
    cy.contains('No channels to display').should('exist');
  });
});

describe('Test channel details', () => {
  beforeEach(() => {
    cy.visit(`${BASE_PATH}/app/${NOTIFICATIONS_PLUGIN_NAME}#channels`);
    cy.contains('sample webhook channel').click();
  });

  it('displays channel details', () => {
    cy.contains('custom-webhook-test-url.com').should('exist');
    cy.contains('test-path').should('exist');
    cy.contains('8888').should('exist');
    cy.contains('2 more').click();
    cy.contains('Query parameters (7)').should('exist');
    cy.contains('params7').should('exist');
  });

  it('mutes and unmutes channels', () => {
    cy.contains('Mute channel').click({ force: true });
    cy.get('[data-test-subj="mute-channel-modal-mute-button"]').click({
      force: true,
    });
    cy.contains('successfully muted.').should('exist');
    cy.contains('Muted').should('exist');

    cy.contains('Unmute channel').click({ force: true });
    cy.contains('successfully unmuted.').should('exist');
    cy.contains('Active').should('exist');
  });

  it('edits channels', () => {
    cy.contains('Actions').click({ force: true });
    cy.contains('Edit').click({ force: true });
    cy.contains('Edit channel').should('exist');
    cy.get('.euiText').contains('Custom webhook').should('exist');
    // TODO: This doesn't have a test subject in 2.0
    // cy.get(
    //   '[data-test-subj="create-channel-description-input"]'
    // ).type('{selectall}{backspace}Updated custom webhook description');
    cy.get('.euiTextArea').type(
      '{selectall}{backspace}Updated custom webhook description'
    );
    cy.wait(delay);
    cy.contains('Save').click({ force: true });

    cy.contains('successfully updated.').should('exist');
    cy.contains('Updated custom webhook description').should('exist');
  });
});
