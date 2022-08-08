describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
  it('display articles', () => {
    cy.get('.list-articles .article');
  });
  it('display articles by tag', () => {
    cy.get('.list-tags .tag').contains('First').click();
    cy.get('.article .prewiew-tag ').contains('First');
  });
  describe('Without logging', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('click favorites button', () => {
      cy.get('button[id=favourite-button]').first().click();
      cy.url().should('include', '/auth/login');
    });
    it('click to article author', () => {
      cy.get('.info-name').first().click();
      cy.url().should('include', '/auth/login');
    });
  });
  describe('With log in', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/');
    });
    it('click to user page', () => {
      cy.contains('Dariia').first().click();
      cy.url().should('include', '/profile/Dariia');
    });
    it('click favorites button', () => {
      cy.get(':nth-child(1) > .article > .prewiew-header > #favourite-button').click();
      cy.get(':nth-child(1) > .article > .prewiew-header > #favourite-button').should(
        'have.class',
        'favourited'
      );
      cy.get(':nth-child(1) > .article > .prewiew-header > #favourite-button').click();
      cy.get(':nth-child(1) > .article > .prewiew-header > #favourite-button').should(
        'not.have.class',
        'favourited'
      );
    });
    it('display articles by followed users', () => {
      cy.get('.feed-toggle').contains('Your Feed').click();
      cy.get('.article .info-name').first().click();
      cy.get('.bio .btn-unfollow');
    });
  });
});
