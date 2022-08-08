describe('The article page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/article/This-is-my-first-article!');
  });
  it('should render the article page', () => {
    cy.get('.logo').contains('This is my first article');
    cy.get('.banner .info-name').contains('Dariia');
  });
  it('follow user', () => {
    cy.get('.btn-follow').first().click();
    cy.get('.btn-unfollow').first().click();
  });
  it('favourited article', () => {
    cy.get('.btn-favorite').first().click();
    cy.get('.btn-unfavorite').first().click();
  });
  it('create new comment', () => {
    cy.get('textarea[id=new-comment]').type('New Comment');
    cy.get('.comment-banner button').click();
    cy.wait(1000);
    cy.get('.comment-card').contains('New Comment');
  });
  it('delete comment', () => {
    cy.contains('.comment-card', 'New Comment').within(() => {
      cy.get('.mat-icon').click();
    });
    cy.wait(1000);
    cy.get('.comment-card').contains('New Comment').should('not.exist');
  });
  it('link to author page', () => {
    cy.get('.article-info .info-name').should('have.attr', 'href', '/profile/Dariia');
  });
});
