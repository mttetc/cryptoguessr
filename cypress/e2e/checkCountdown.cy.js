/// <reference types="cypress" />

import { waitForCountdownToFinish } from '../support/commands';

describe('GuessBox Countdown Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.resetStore();
  });

  it('should show and then hide the countdown element', () => {
    cy.get('[data-testid="guess-box-button-up"]').click();
    cy.get('[data-testid="guess-box-countdown"]').should('be.visible');

    waitForCountdownToFinish().then(() => {
      cy.get('[data-testid="guess-box-countdown"]').should('not.exist');
      cy.get('[data-testid="guess-box-button-up"]').should('not.be.disabled');
    });
  });
});
