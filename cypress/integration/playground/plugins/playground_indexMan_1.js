/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BASE_PATH, IM_PLUGIN_NAME } from '../../../utils/constants';
import samplePolicy from '../../../fixtures/plugins/index-management-dashboards-plugin/sample_policy';

const POLICY_ID = 'sample_policy';

describe('Policies', () => {
  beforeEach(() => {
    // Set welcome screen tracking to false
    localStorage.setItem('home:welcome:show', 'false');

    // Visit ISM OSD
    cy.visit(`${BASE_PATH}/app/${IM_PLUGIN_NAME}`);

    // Common text to wait for to confirm page loaded, give up to 60 seconds for initial load
    cy.contains('Create policy', { timeout: 60000 });
  });

  describe('can be created', () => {
    before(() => {
      // cy.deleteAllIndices();
      // cy.deleteIMJobs();
    });

    it('successfully', () => {
      // Route us to create policy page
      cy.contains('Create policy').click({ force: true });

      // Route us to create policy page
      cy.contains('JSON editor').click({ force: true });

      // Route us to create policy page
      cy.contains('Continue').click({ force: true });

      // Wait for input to load and then type in the policy ID
      cy.get(`input[placeholder="example_policy"]`).type(POLICY_ID, {
        force: true,
      });

      // Wait for default policy JSON to load
      cy.contains('A simple default policy');

      // Focus JSON input area, clear old policy and type in new policy
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.get('.ace_text-input')
        .first()
        .focus()
        .clear()
        .type(JSON.stringify(samplePolicy), {
          parseSpecialCharSequences: false,
          delay: 5,
          timeout: 20000,
        });

      // Click the create button
      cy.get('button').contains('Create').click({ force: true });

      // Confirm we got created toaster
      cy.contains(`Created policy: ${POLICY_ID}`);

      // Confirm we can see the created policy's description in table
      cy.contains('A simple description');
    });
  });
});
