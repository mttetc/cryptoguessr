/// <reference types="cypress" />

describe('GuessBox Button Up Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window()
      .its('store')
      .then(store => {
        store.setAnonymousId('someid');
      });
  });

  it('should reset the score to 0', () => {
    const waitForCountdownToFinish = () => {
      return new Cypress.Promise(resolve => {
        const check = () => {
          cy.window()
            .its('store.isCountdownActive')
            .then(isCountdownActive => {
              if (isCountdownActive) {
                // eslint-disable-next-line cypress/no-unnecessary-waiting
                cy.wait(1000).then(check);
              } else {
                resolve();
              }
            });
        };
        check();
      });
    };

    cy.get('[data-testid="guess-box-button-up"]').click();

    waitForCountdownToFinish().then(() => {
      cy.get('[data-testid="reset-score-button"]').should('be.visible');
      cy.get('[data-testid="reset-score-button"]').click();
      cy.get('[data-testid="score"]').should('have.text', '0');
    });
  });
});
