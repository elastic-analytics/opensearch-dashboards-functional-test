/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import { jaegerTestDataSet } from '../../../utils/constants';

describe('Before', () => {
  before(() => {
    localStorage.setItem('home:welcome:show', 'true');

    const dumpDataSet = (mapping_url, data_url, index) => {
      cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: `${index}`,
          method: 'PUT',
        },
      });

      cy.request(mapping_url).then((response) => {
        cy.request({
          method: 'POST',
          form: true,
          url: 'api/console/proxy',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'osd-xsrf': true,
          },
          qs: {
            path: `${index}/_mapping`,
            method: 'POST',
          },
          body: response.body,
        });
      });

      cy.request(data_url).then((response) => {
        cy.request({
          method: 'POST',
          form: true,
          url: 'api/console/proxy',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'osd-xsrf': true,
          },
          qs: {
            path: `${index}/_bulk`,
            method: 'POST',
          },
          body: response.body,
        });
      });
    };

    jaegerTestDataSet.forEach(({ mapping_url, data_url, index }) =>
      dumpDataSet(mapping_url, data_url, index)
    );
  });

  it('setup completed', () => {});
});
