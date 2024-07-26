/// <reference types="cypress" />

describe('GuessBox Countdown Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show and then hide the countdown element', () => {
    cy.get('[data-testid="guess-box-button-up"]').click();

    cy.get('[data-testid="guess-box-countdown"]').should('be.visible');

    const waitForCountdownToFinish = () => {
      return new Cypress.Promise(resolve => {
        const check = () => {
          cy.window()
            .its('store.isCountdownActive')
            .then(isCountdownActive => {
              if (isCountdownActive) {
                cy.get('[data-testid="guess-box-button-up"]').should(
                  'be.disabled',
                );
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

    waitForCountdownToFinish().then(() => {
      cy.get('[data-testid="guess-box-countdown"]').should('not.exist');
      cy.get('[data-testid="guess-box-button-up"]').should('not.be.disabled');
    });
  });
});
