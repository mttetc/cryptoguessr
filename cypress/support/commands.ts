/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export const waitForCountdownToFinish = () => {
  return new Cypress.Promise(resolve => {
    const check = () => {
      cy.window()
        .its('store.isCountdownActive')
        .then(isCountdownActive => {
          if (isCountdownActive) {
            cy.get('[data-testid="guess-box-button-up"]').should('be.disabled');
            cy.get('[data-testid="guess-box-button-down"]').should(
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

Cypress.Commands.add('setAnonymousId', () => {
  cy.window()
    .its('store')
    .then(store => {
      store.setAnonymousId('someid');
    });
});

Cypress.Commands.add('resetStore', () => {
  cy.window()
    .its('store')
    .then(store => {
      store.setCountdownActive(false);
      store.setCountdown(60);
    });
});
