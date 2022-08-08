describe('The header', () => {
  describe('Without login', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('should have home link', () => {
      cy.contains('.navbar li', 'Home').click();
      cy.url().should('include', '/');
      cy.contains('.navbar li', 'Home').should('have.class', 'active');
    });
    it('should have login link', () => {
      cy.contains('.navbar li', 'Sing in').click();
      cy.url().should('include', '/auth/login');
      cy.contains('.navbar li', 'Sing in').should('have.class', 'active');
    });
    it('should have register link', () => {
      cy.contains('.navbar li', 'Sing up').click();
      cy.url().should('include', '/auth/register');
      cy.contains('.navbar li', 'Sing up').should('have.class', 'active');
    });
    it('should not exists link', () => {
      cy.contains('.navbar li', 'Settings').should('not.exist');
      cy.contains('.navbar li', 'New Article').should('not.exist');
    });
  });
  describe('With login', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/');
    });
    it('should have home link', () => {
      cy.contains('.navbar li', 'Home').click();
      cy.url().should('include', '/');
      cy.contains('.navbar li', 'Home').should('have.class', 'active');
    });
    it('should have new article link', () => {
      cy.contains('.navbar li', 'New Article').click();
      cy.url().should('include', '/editor');
      cy.contains('.navbar li', 'New Article').should('have.class', 'active');
    });
    it('should have settings link', () => {
      cy.contains('.navbar li', 'Settings').click();
      cy.url().should('include', '/settings');
      cy.contains('.navbar li', 'Settings').should('have.class', 'active');
    });
  });
});
