/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
export const TWENTY_SECONDS_TIMEOUT = { timeout: 20000 };

export const SECURITY_ANALYTICS_PLUGIN_NAME =
  'opensearch_security_analytics_dashboards';

export const SECURITY_ANALYTICS_TEST_FIELD_MAPPINGS = {
  event_uid: 'timestamp',
  'windows-event_data-CommandLine': 'event.dataset',
};
