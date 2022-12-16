/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  SECURITY_ANALYTICS_PLUGIN_NAME,
  SECURITY_ANALYTICS_TEST_FIELD_MAPPINGS,
  TWENTY_SECONDS_TIMEOUT,
} from '../../../utils/constants';
import { BASE_PATH } from '../../../utils/base_constants';

describe('Detectors', () => {
  before(() => {
    //create rule
    cy.visit(`${BASE_PATH}/app/${SECURITY_ANALYTICS_PLUGIN_NAME}#/rules`);

    // Click "create new rule" button
    cy.get(
      '[data-test-subj="create_rule_button"]',
      TWENTY_SECONDS_TIMEOUT
    ).click({
      force: true,
    });

    // Enter the name
    cy.get('[data-test-subj="rule_name_field"]', TWENTY_SECONDS_TIMEOUT).type(
      SAMPLE_RULE.name
    );

    // Enter the log type
    cy.get(
      '[data-test-subj="rule_type_dropdown"]',
      TWENTY_SECONDS_TIMEOUT
    ).select(SAMPLE_RULE.logType);

    // Enter the description
    cy.get(
      '[data-test-subj="rule_description_field"]',
      TWENTY_SECONDS_TIMEOUT
    ).type(SAMPLE_RULE.description);

    // Enter the detection
    cy.get(
      '[data-test-subj="rule_detection_field"]',
      TWENTY_SECONDS_TIMEOUT
    ).type(SAMPLE_RULE.detection);

    // Enter the severity
    cy.get(
      '[data-test-subj="rule_severity_dropdown"]',
      TWENTY_SECONDS_TIMEOUT
    ).select(SAMPLE_RULE.severity);

    // Enter the tags
    SAMPLE_RULE.tags.forEach((tag) =>
      cy
        .get('[data-test-subj="rule_tags_dropdown"]', TWENTY_SECONDS_TIMEOUT)
        .type(`${tag}{enter}{esc}`)
    );

    // Enter the reference
    cy.get(
      '[data-test-subj="rule_references_field_0"]',
      TWENTY_SECONDS_TIMEOUT
    ).type(SAMPLE_RULE.references);

    // Enter the false positive cases
    cy.get(
      '[data-test-subj="rule_false_positive_cases_field_0"]',
      TWENTY_SECONDS_TIMEOUT
    ).type(SAMPLE_RULE.falsePositive);

    // Enter the author
    cy.get('[data-test-subj="rule_author_field"]', TWENTY_SECONDS_TIMEOUT).type(
      SAMPLE_RULE.author
    );

    // Enter the log type
    cy.get(
      '[data-test-subj="rule_status_dropdown"]',
      TWENTY_SECONDS_TIMEOUT
    ).select(SAMPLE_RULE.status);

    // Click "create" button
    cy.get(
      '[data-test-subj="create_rule_button"]',
      TWENTY_SECONDS_TIMEOUT
    ).click({
      force: true,
    });

    // Wait for the page to finish loading
    cy.wait(5000);
    cy.contains('No items found', TWENTY_SECONDS_TIMEOUT).should('not.exist');

    // Search for the rule
    cy.get(`input[type="search"]`, TWENTY_SECONDS_TIMEOUT)
      // .focus()
      .type(`${SAMPLE_RULE.name}{enter}`);

    // Click the rule link to open the details flyout
    cy.get(
      `[data-test-subj="rule_link_${SAMPLE_RULE.name}"]`,
      TWENTY_SECONDS_TIMEOUT
    ).click();

    // Confirm the flyout contains the expected values
    cy.get(
      `[data-test-subj="rule_flyout_${SAMPLE_RULE.name}"]`,
      TWENTY_SECONDS_TIMEOUT
    )
      .click({ force: true })
      .within(() => {
        // Validate name
        cy.get(
          '[data-test-subj="rule_flyout_rule_name"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.name, TWENTY_SECONDS_TIMEOUT);

        // Validate log type
        cy.get(
          '[data-test-subj="rule_flyout_rule_log_type"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.logType, TWENTY_SECONDS_TIMEOUT);

        // Validate description
        cy.get(
          '[data-test-subj="rule_flyout_rule_description"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.description, TWENTY_SECONDS_TIMEOUT);

        // Validate author
        cy.get(
          '[data-test-subj="rule_flyout_rule_author"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.author, TWENTY_SECONDS_TIMEOUT);

        // Validate source is "custom"
        cy.get(
          '[data-test-subj="rule_flyout_rule_source"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains('Custom', TWENTY_SECONDS_TIMEOUT);

        // Validate severity
        cy.get(
          '[data-test-subj="rule_flyout_rule_severity"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.severity, TWENTY_SECONDS_TIMEOUT);

        // Validate tags
        SAMPLE_RULE.tags.forEach((tag) =>
          cy
            .get(
              '[data-test-subj="rule_flyout_rule_tags"]',
              TWENTY_SECONDS_TIMEOUT
            )
            .contains(tag, TWENTY_SECONDS_TIMEOUT)
        );

        // Validate references
        cy.get(
          '[data-test-subj="rule_flyout_rule_references"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.references, TWENTY_SECONDS_TIMEOUT);

        // Validate false positives
        cy.get(
          '[data-test-subj="rule_flyout_rule_false_positives"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.falsePositive, TWENTY_SECONDS_TIMEOUT);

        // Validate status
        cy.get(
          '[data-test-subj="rule_flyout_rule_status"]',
          TWENTY_SECONDS_TIMEOUT
        ).contains(SAMPLE_RULE.status, TWENTY_SECONDS_TIMEOUT);

        // Validate detection
        SAMPLE_RULE.detectionLine.forEach((line) =>
          cy
            .get(
              '[data-test-subj="rule_flyout_rule_detection"]',
              TWENTY_SECONDS_TIMEOUT
            )
            .contains(line, TWENTY_SECONDS_TIMEOUT)
        );

        // Close the flyout
        cy.get(
          '[data-test-subj="euiFlyoutCloseButton"]',
          TWENTY_SECONDS_TIMEOUT
        ).click({
          force: true,
        });
      });

    // Confirm flyout closed
    cy.contains(`[data-test-subj="rule_flyout_${SAMPLE_RULE.name}"]`).should(
      'not.exist'
    );
    cy.visit(`${BASE_PATH}/app/${SECURITY_ANALYTICS_PLUGIN_NAME}#/detectors`);
    //wait for page to load
    cy.wait(10000);

    // Check that correct page is showing
    cy.contains('Threat detectors');
  });

  it('...can be created', () => {
    // Locate Create detector button click to start
    cy.contains('Create detector').click({ force: true });

    // Check to ensure process started
    cy.contains('Define detector');

    // Enter a name for the detector in the appropriate input
    cy.get(`input[placeholder="Enter a name for the detector."]`).type(
      'test detector{enter}'
    );

    // Select our pre-seeded data source (cypress-test-windows)
    cy.get(`[data-test-subj="comboBoxInput"]`).type(
      'opensearch_dashboards_sample_data_logs{enter}'
    );

    // Select threat detector type (Windows logs)
    cy.get(`input[id="apache_access"]`).click({ force: true });

    // Wait for detector rules to load - timeout on click above ineffective
    cy.wait(10000);

    // Click Next button to continue
    cy.get('button').contains('Next').click({ force: true }, { timeout: 2000 });

    // Check that correct page now showing
    cy.contains('Required field mappings');

    // Select appropriate names to map fields to
    for (let field_name in SECURITY_ANALYTICS_TEST_FIELD_MAPPINGS) {
      const mappedTo = SECURITY_ANALYTICS_TEST_FIELD_MAPPINGS[field_name];

      cy.contains('tr', field_name).within(() => {
        cy.get(`select[class="euiSelect"]`).select(mappedTo);
      });
    }

    // Continue to next page - skipping mappings
    cy.get('button').contains('Next').click({ force: true }, { timeout: 2000 });

    // Check that correct page now showing
    cy.contains('Set up alerts');

    // Type name of new trigger
    cy.get(`input[placeholder="Enter a name for the alert condition."]`).type(
      'test_trigger'
    );

    // Continue to next page
    cy.contains('Next').click({ force: true });

    // Confirm page is reached
    cy.contains('Review and create');

    // Confirm field mappings registered
    cy.contains('Field mapping');

    // Confirm entries user has made
    cy.contains('Detector details');
    cy.contains('test detector');
    cy.contains('apache_access');
    cy.contains('Alert on test_trigger');

    // Create the detector
    cy.get('button').contains('Create').click({ force: true });

    cy.wait(10000);

    // Confirm detector active
    cy.contains('There are no existing detectors.').should('not.exist');
    cy.contains('test detector');
    cy.contains('Active');
    cy.contains('View Findings');
    cy.contains('Detector configuration');
    cy.contains('Field mappings');
    cy.contains('Alert triggers');
    cy.contains('Detector details');
    cy.contains('Created at');
    cy.contains('Last updated time');
    cy.contains('test detector');
  });
});

const SAMPLE_RULE = {
  name: 'Cypress test rule',
  logType: 'windows',
  description:
    'This is a rule used to test the rule creation workflow. Not for production use.',
  detection:
    'selection:\n  Provider_Name: Service Control Manager\nEventID: 7045\nServiceName: ZzNetSvc\n{backspace}{backspace}condition: selection',
  detectionLine: [
    'selection:',
    'Provider_Name: Service Control Manager',
    'EventID: 7045',
    'ServiceName: ZzNetSvc',
    'condition: selection',
  ],
  severity: 'critical',
  tags: [
    'attack.persistence',
    'attack.privilege_escalation',
    'attack.t1543.003',
  ],
  references: 'https://nohello.com',
  falsePositive: 'unknown',
  author: 'Cypress Test Runner',
  status: 'experimental',
};
