/// <reference types="cypress" />

describe('GuessBox Score Check Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should check that the score is not 0', () => {
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

    cy.window()
      .its('store')
      .then(store => {
        const currentCrypto = store.selectedCrypto;
        const currentCurrency = store.selectedCurrency;

        const symbol = `${currentCrypto}${currentCurrency === 'USD' ? 'USDT' : currentCurrency}`;
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

        cy.intercept('GET', url, {
          statusCode: 200,
          body: {
            symbol,
            price: '99999999',
          },
        }).as('getCryptoPriceHigher');
      });

    cy.intercept(
      'PATCH',
      'https://wn63ai4yyb.execute-api.eu-west-3.amazonaws.com/dev/scores/someid',
      {
        statusCode: 200,
        body: {
          score: 1,
        },
      },
    ).as('updateScore');

    cy.get('[data-testid="guess-box-button-up"]').click();
    cy.get('[data-testid="guess-box-countdown"]').should('be.visible');

    waitForCountdownToFinish().then(() => {
      cy.wait('@getCryptoPriceHigher');
      cy.wait('@updateScore');
      cy.get('[data-testid="score"]').should('have.text', '1');
    });
  });
});
