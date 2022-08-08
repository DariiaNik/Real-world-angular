describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
  describe('Without logging', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('display banner', () => {
      cy.get('.banner').contains('Create by Dariia');
    });
  });
  describe('With log in', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/');
    });
    it('banner not exist', () => {
      cy.contains('.banner', 'Create by Dariia').should('not.exist');
    });
  });
});
