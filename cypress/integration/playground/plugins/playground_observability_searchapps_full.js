/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import { moviegeekDataSet } from '../../../utils/constants';

describe('Adds moviegeek related stuff', () => {
  it('Adds moviegeek documents', () => {
    cy.exec(
      'curl http://k8s-default-ingressd-e20e8e20eb-335899063.us-east-1.elb.amazonaws.com/load'
    ).then((result) => {
      cy.log(result.stdout);
      cy.log(result.stderr);
    });
  });
  it('Adds moviegeek-logs index', () => {
    cy.exec(
      'curl http://k8s-default-ingressm-759ea31b4c-1025215405.us-east-1.elb.amazonaws.com'
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
