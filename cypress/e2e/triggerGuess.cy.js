/// <reference types="cypress" />

describe('GuessBox Button Up Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show and then hide the countdown element', () => {
    cy.get('[data-testid="guess-box-button-up"]').click();

    cy.get('[data-testid="guess-box-countdown"]').should('be.visible');

    const checkCountdown = () => {
      cy.get('[data-testid="guess-box-countdown"]').then($countdown => {
        const countdownValue = parseInt($countdown.text(), 10);
        if (countdownValue > 1) {
          cy.get('[data-testid="guess-box-button-up"]').should('be.disabled');
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000);
          checkCountdown();
        } else {
          cy.get('[data-testid="guess-box-countdown"]').should('not.exist');
          cy.get('[data-testid="guess-box-button-up"]').should(
            'not.be.disabled',
          );
        }
      });
    };

    checkCountdown();
  });
});
