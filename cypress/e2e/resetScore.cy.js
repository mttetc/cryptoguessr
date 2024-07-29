/// <reference types="cypress" />

import { waitForCountdownToFinish } from '../support/commands';

describe('Reset Score ButtonTest', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setAnonymousId();
    cy.resetStore();
  });

  it('should reset the score to 0', () => {
    cy.get('[data-testid="guess-box-button-up"]').click();
    cy.get('[data-testid="reset-score-button"]').should('be.visible');
    waitForCountdownToFinish().then(() => {
      cy.get('[data-testid="reset-score-button"]').click();
      cy.get('[data-testid="score"]').should('have.text', '0');
    });
  });
});
