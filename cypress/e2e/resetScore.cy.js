/// <reference types="cypress" />

import { waitForCountdownToFinish } from '../support/commands';

describe('Reset Score ButtonTest', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setAnonymousId();
  });

  it('should reset the score to 0', () => {
    cy.get('[data-testid="guess-box-button-up"]').click();

    waitForCountdownToFinish().then(() => {
      cy.get('[data-testid="reset-score-button"]').should('be.visible');
      cy.get('[data-testid="reset-score-button"]').click();
      cy.get('[data-testid="score"]').should('have.text', '0');
    });
  });
});
