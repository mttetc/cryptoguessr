export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setAnonymousId(): Chainable<void>;
    }
  }
}
