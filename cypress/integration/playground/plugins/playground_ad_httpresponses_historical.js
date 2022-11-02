/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { AD_URL } from '../../../utils/constants';
import { CURRENT_TENANT } from '../../../utils/commands';

describe('AD Http Responses Historical results page', () => {
  const verifyAnomaliesInCharts = () => {
    // Wait for any kicked off historical analysis to finish. Relying on default
    // timeout (60s) to find an element that only shows up when the analysis is finished
    cy.getElementByTestId('detectorStateFinished').should('exist');

    // Let results load separately, since they load asynchronously. Should take <1s
    cy.wait(5000);

    cy.getElementByTestId('anomalyOccurrenceStat').within(() => {
      cy.get('.euiTitle--small')
        .invoke('text')
        .then((anomalyOccurrenceCount) => {
          cy.log('Num anomaly occurrences: ' + anomalyOccurrenceCount);
          expect(parseInt(anomalyOccurrenceCount)).to.be.gte(1);
        });
    });
  };

  const verifyNoAnomaliesInCharts = () => {
    // Wait for any kicked off historical analysis to finish. Relying on default
    // timeout (60s) to find an element that only shows up when the analysis is finished
    cy.getElementByTestId('detectorStateFinished').should('exist');

    // Let results load separately, since they load asynchronously. Should take <1s
    cy.wait(5000);

    cy.getElementByTestId('anomalyOccurrenceStat').within(() => {
      cy.get('.euiTitle--small')
        .invoke('text')
        .then((anomalyOccurrenceCount) => {
          cy.log('Num anomaly occurrences: ' + anomalyOccurrenceCount);
          expect(parseInt(anomalyOccurrenceCount)).to.equal(0);
        });
    });
  };

  // Creating a sample detector and visiting the config page
  before(() => {
    CURRENT_TENANT.newTenant = 'global';
    cy.visit(AD_URL.OVERVIEW);
    cy.getElementByTestId('createHttpSampleDetectorButton').click();
    cy.visit(AD_URL.DETECTOR_LIST);
    cy.contains('sample-http-responses-detector').click();
    cy.getElementByTestId('historicalTab').click();
  });

  // Clean up resources
  after(() => {
    // No need to clea up and keeps the data.
  });

  context('Sample detector', () => {
    it('Empty message with modal', () => {
      cy.getElementByTestId('emptyHistoricalAnalysisMessage').should('exist');
      cy.getElementByTestId('runHistoricalAnalysisButton').click();
      cy.getElementByTestId('historicalAnalysisModalHeader').should('exist');
      cy.getElementByTestId('cancelButton').click();
      cy.getElementByTestId('historicalAnalysisModalHeader').should(
        'not.exist'
      );
      cy.getElementByTestId('emptyHistoricalAnalysisMessage').should('exist');
      cy.getElementByTestId('historicalAnalysisHeader').should('not.exist');
    });

    it('Start first historical analysis', () => {
      cy.getElementByTestId('runHistoricalAnalysisButton').click();
      cy.getElementByTestId('historicalAnalysisModalHeader').should('exist');
      cy.getElementByTestId('confirmButton').click();

      cy.getElementByTestId('emptyHistoricalAnalysisMessage').should(
        'not.exist'
      );
      cy.getElementByTestId('historicalAnalysisModalHeader').should(
        'not.exist'
      );
      cy.getElementByTestId('detectorStateInitializing').should('exist');
      cy.getElementByTestId('historicalAnalysisTitle').should('exist');
    });

    // Choosing the default of 30 days with the sample detector data (which contains 7 days historical data)
    // should produce 4+ anomalies
    it('Produces anomaly results by default', () => {
      cy.wait(10000);
      verifyAnomaliesInCharts();
    });

    it('Filtering by date range', () => {
      cy.getElementByTestId('superDatePickerToggleQuickMenuButton').click();
      cy.get(`[aria-label="Next time window"]`).click();
      cy.contains('Refresh').click();
      verifyNoAnomaliesInCharts();

      cy.get('body').then(($body) => {
        if ($body.find('[aria-label="Previous time window"]').length == 0) {
          cy.getElementByTestId('superDatePickerToggleQuickMenuButton').click();
        }

        cy.get(`[aria-label="Previous time window"]`).click();
        cy.contains('Refresh').click();
        verifyAnomaliesInCharts();
      });
    });

    it('Run subsequent historical analysis', () => {
      cy.getElementByTestId('modifyHistoricalAnalysisButton').click();
      cy.getElementByTestId('historicalAnalysisModalHeader').should('exist');
      cy.getElementByTestId('confirmButton').click();
      cy.getElementByTestId('historicalAnalysisModalHeader').should(
        'not.exist'
      );
      cy.getElementByTestId('detectorStateInitializing').should('exist');
      cy.getElementByTestId('historicalAnalysisTitle').should('exist');

      cy.wait(10000);
      verifyAnomaliesInCharts();
    });
  });
});
