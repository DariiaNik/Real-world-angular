describe('The author page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/profile/Dariia');
  });
  it('visit author page', () => {
    cy.get('h4').contains('Dariia');
    cy.get('.info-name').contains('Dariia');
  });
  it('following author', () => {
    cy.get('.btn-follow').click();
    cy.get('.btn-unfollow').click();
  });
  it('liked author post', () => {
    cy.get(':nth-child(1) > .article #favourite-button').click();
    cy.get(':nth-child(1) > .article #favourite-button').should('have.class', 'favourited');

    cy.get(':nth-child(1) > .article #favourite-button').click();
    cy.get(':nth-child(1) > .article #favourite-button').should('not.have.class', 'favourited');
  });
});
