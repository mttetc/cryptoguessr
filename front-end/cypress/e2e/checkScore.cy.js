/// <reference types="cypress" />

import { waitForCountdownToFinish } from '../support/commands';

describe('GuessBox Score Check Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.resetStore();
  });

  it('should check that the score is not 0 after good guess', () => {
    cy.window()
      .its('store')
      .then(store => {
        const currentCrypto = store.selectedCrypto;
        const currentCurrency = store.selectedCurrency;

        const symbol = `${currentCrypto}${currentCurrency === 'USD' ? 'USDT' : currentCurrency}`;
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

        cy.fixture('cryptoPrice.json').then(cryptoPrice => {
          cy.intercept('GET', url, {
            statusCode: 200,
            body: cryptoPrice,
          }).as('getCryptoPriceHigher');
        });
      });

    cy.get('[data-testid="guess-box-button-up"]').click();
    cy.get('[data-testid="guess-box-countdown"]').should('be.visible');
    waitForCountdownToFinish().then(() => {
      cy.fixture('newScore.json').then(newScore => {
        cy.intercept(
          'PATCH',
          'https://wn63ai4yyb.execute-api.eu-west-3.amazonaws.com/dev/scores/someid',
          {
            statusCode: 200,
            body: newScore,
          },
        );
      });
      cy.get('[data-testid="score"]').should('have.text', '1');
    });
  });
});
