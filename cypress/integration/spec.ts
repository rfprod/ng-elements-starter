// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../../node_modules/cypress/types/index.d.ts'/>

it('loads examples', () => {
  const baseUrl = 'http://localhost:4200';
  cy.visit(baseUrl);
  cy.contains('Welcome to ng-elements-starter!');
});
