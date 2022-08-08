describe('The new article page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/editor');
  });
  it('create new post', () => {
    cy.get('input[id=title]').type('Testing');
    cy.get('input[id=description]').type('Testing');
    cy.get('textarea[id=body]').type('Testing');
    cy.get('input[id=tags]').type(`Testing{enter}`);

    cy.url().should('include', '/Testing');

    cy.get('.logo').contains('Testing');
    cy.get('.article-content > p').contains('Testing');
    cy.get('.article-tag').contains('Testing');
    cy.get('.btn-delete').first().click();
  });
  it('existing title', () => {
    cy.get('input[id=title]').type(`Hello world!{enter}`);
    cy.get('small').contains('Failed, article with such title already exists');
  });
});
