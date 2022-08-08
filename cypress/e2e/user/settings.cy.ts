describe('The settings page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/settings');
  });
  it('greets with Your Settings', () => {
    cy.contains('h1', 'Your Settings');
  });
  it('change image', () => {
    let image =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNTGQVAZ-VPL0zQL1UKHHhhwiF8ZWIHH907w&usqp=CAU';
    cy.get('input[id=image]').clear().type(image);
    cy.get('button[type=submit]').click();

    cy.get('.bio > img').should('have.attr', 'src').should('include', image);
  });
  it('change username', () => {
    cy.get('input[id=username]').clear().type('New Pineapple');
    cy.get('button[type=submit]').click();

    cy.get('h4').contains('New Pineapple');
    cy.get('.info-name').contains('New Pineapple');
    cy.get('.active > .nav-link').contains('New Pineapple');
  });
  it('change bio', () => {
    cy.get('textarea[id=bio]').clear().type('New Pen pineapple apple pen');
    cy.get('button[type=submit]').click();

    cy.get('.bio > p').contains('New Pen pineapple apple pen');
  });
  it('required email', () => {
    cy.get('input[id=email]').clear();
    cy.get('.mat-typography').click();
    cy.get('small').should('contain', 'Field cannot be empty');
    cy.get('input[id=email]').type('email');
    cy.get('.mat-typography').click();
    cy.get('small').should('contain', 'Enter valid email address');
  });
  it('required username', () => {
    cy.get('input[id=username]').clear();
    cy.get('.mat-typography').click();
    cy.get('small').should('contain', 'Field cannot be empty');
  });
  it('logout', () => {
    cy.get('.btn-logout')
      .click()
      .should(() => {
        expect(localStorage.getItem('token')).to.be.null;
      });

    cy.url().should('include', '/home');
  });
});
