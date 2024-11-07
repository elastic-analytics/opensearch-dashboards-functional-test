import {
  CommonUI,
  MiscUtils,
} from '@opensearch-dashboards-test/opensearch-dashboards-test-library';

const commonUI = new CommonUI(cy);
const miscUtils = new MiscUtils(cy);
// const baseURL = new URL(Cypress.config().baseUrl);
// remove trailing slash
// const path = baseURL.pathname.replace(/\/$/, '');

describe('dashboard sample data validation', () => {
  before(() => {});

  after(() => {});

  // describe('adding sample data', () => {
  //   before(() => {
  //     miscUtils.addSampleData();
  //   });

  //   after(() => {
  //     // miscUtils.removeSampleData();
  //   });

  //   it('checking web logs dashboards displayed', () => {
  //     miscUtils.viewData('logs');
  //     commonUI.checkElementContainsValue(
  //       'span[title="[Logs] Web Traffic"]',
  //       1,
  //       '\\[Logs\\] Web Traffic'
  //     );
  //     commonUI.checkElementContainsValue(
  //       'div[data-test-subj="markdownBody"] > h3',
  //       1,
  //       'Sample Logs Data'
  //     );
  //   });

  //   describe('checking index patterns', () => {
  //     before(() => {
  //       miscUtils.visitPage(
  //         'app/management/opensearch-dashboards/indexPatterns'
  //       );
  //     });

  //     after(() => {});

  //     it('checking ecommerce index patterns are added', () => {
  //       commonUI.checkElementContainsValue(
  //         'div[data-test-subj="indexPatternTable"]',
  //         1,
  //         'opensearch_dashboards_sample_data_ecommerce'
  //       );
  //     });

  //     it('checking flights index patterns are added', () => {
  //       commonUI.checkElementContainsValue(
  //         'div[data-test-subj="indexPatternTable"]',
  //         1,
  //         'opensearch_dashboards_sample_data_flights'
  //       );
  //     });

  //     it('checking web logs index patterns are added', () => {
  //       commonUI.checkElementContainsValue(
  //         'div[data-test-subj="indexPatternTable"]',
  //         1,
  //         'opensearch_dashboards_sample_data_logs'
  //       );
  //     });
  //   });

  //   describe('checking saved objects', () => {
  //     before(() => {
  //       miscUtils.visitPage('app/management/opensearch-dashboards/objects');
  //     });

  //     after(() => {});

  //     it('checking ecommerce object is saved', () => {
  //       commonUI.checkElementContainsValue(
  //         'div[data-test-subj="savedObjectsTable"]',
  //         1,
  //         'opensearch_dashboards_sample_data_ecommerce'
  //       );
  //     });

  //     it('checking flights object is saved', () => {
  //       commonUI.checkElementContainsValue(
  //         'div[data-test-subj="savedObjectsTable"]',
  //         1,
  //         'opensearch_dashboards_sample_data_flights'
  //       );
  //     });

  //     it('checking web logs object is saved', () => {
  //       commonUI.checkElementContainsValue(
  //         'div[data-test-subj="savedObjectsTable"]',
  //         1,
  //         'opensearch_dashboards_sample_data_logs'
  //       );
  //     });
  //   });

  //   describe('checking Visualize', () => {
  //     before(() => {
  //       // Go to the Visualize page
  //       miscUtils.visitPage('app/visualize#/');
  //     });

  //     after(() => {});

  //     it('checking visualizations list display', () => {
  //       commonUI.checkElementExists('div[data-test-subj="itemsInMemTable"]', 1);
  //     });

  //     it('checking search bar display', () => {
  //       commonUI.checkElementExists('input[placeholder="Search..."]', 1);
  //     });

  //     it('checking create visualization button display', () => {
  //       commonUI.checkElementExists(
  //         'button[data-test-subj="newItemButton"]',
  //         1
  //       );
  //     });
  //   });

  //   describe('checking discover', () => {
  //     before(() => {
  //       // Go to the Discover page
  //       miscUtils.visitPage('app/discover#/');
  //     });

  //     after(() => {});

  //     it('checking save query button display', () => {
  //       commonUI.checkElementExists(
  //         'button[data-test-subj="saved-query-management-popover-button"]',
  //         1
  //       );
  //     });

  //     it('checking query input display', () => {
  //       commonUI.checkElementExists('textarea[data-test-subj="queryInput"]', 1);
  //     });

  //     it('checking refresh button display', () => {
  //       commonUI.checkElementExists(
  //         'button[data-test-subj="querySubmitButton"]',
  //         1
  //       );
  //     });

  //     it('checking add filter button display', () => {
  //       commonUI.checkElementExists('button[data-test-subj="addFilter"]', 1);
  //     });

  //     it('checking field filter display', () => {
  //       commonUI.checkElementExists(
  //         'button[data-test-subj="toggleFieldFilterButton"]',
  //         1
  //       );
  //     });
  //   });
  // });

  describe('checking Dev Tools', () => {
    before(() => {
      // Go to the Dev Tools page
      miscUtils.visitPage('app/dev_tools#/console');
    });

    after(() => {});

    it('checking welcome panel display', () => {
      commonUI.checkElementExists('div[data-test-subj="welcomePanel"]', 1);
    });

    it('checking dismiss button display', () => {
      commonUI.checkElementExists(
        'button[data-test-subj="help-close-button"]',
        1
      );
    });

    it('checking console input area display', () => {
      commonUI.checkElementExists('div[data-test-subj="request-editor"]', 1);
    });

    it('checking console output area display', () => {
      commonUI.checkElementExists('div[data-test-subj="response-editor"]', 1);
    });
  });

  // describe('checking stack management', () => {
  //   before(() => {
  //     // Go to the stack management page
  //     miscUtils.visitPage('app/management/');
  //   });

  //   after(() => {});

  //   it('checking index patterns link display', () => {
  //     // Check that index patterns link is visable
  //     commonUI.checkElementExists('a[data-test-subj="indexPatterns"]', 1);
  //   });

  //   it('checking saved objects link display', () => {
  //     // Check that saved objects link is visable
  //     commonUI.checkElementExists('a[data-test-subj="objects"]', 1);
  //   });

  //   it('checking advance settings link display', () => {
  //     // Check that advance settings link is visable
  //     commonUI.checkElementExists('a[data-test-subj="settings"]', 1);
  //   });
  // });
});
