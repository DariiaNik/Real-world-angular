describe('The Login Page', () => {
  const user = {
    email: 'pineapple@gmail.com',
    password: '12345',
  };
  let wrongPassword = 11111;
  let wrongEmail = 'test@test.com';

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it(' successfully logging in', function () {
    cy.get('input[id=email]').type(user.email);
    cy.get('input[id=password]').type(`${user.password}{enter}`);

    cy.url().should('include', '/home');
  });
  it('error logging in, invalid password ', function () {
    cy.get('input[id=email]').type(user.email);
    cy.get('input[id=password]').type(`${wrongPassword}{enter}`);
    cy.get('small').should('contain', 'Invalid password');
  });
  it('error logging in, invalid email ', function () {
    cy.get('input[id=email]').type(wrongEmail);
    cy.get('input[id=password]').type(`${user.password}{enter}`);
    cy.get('small').should('contain', 'User not found');
  });
  it('required password', () => {
    cy.get('input[id=email]').type(user.email);
    cy.get('input[id=password]').click();
    cy.get('.btn-lg').click({ force: true });
    cy.get('small').should('contain', 'Field cannot be empty');
  });
  it('required email', () => {
    cy.get('input[id=email]').click();
    cy.get('.btn-lg').click({ force: true });
    cy.get('small').should('contain', 'Field cannot be empty');
    cy.get('input[id=email]').type('email');
    cy.get('.btn-lg').click({ force: true });
    cy.get('small').should('contain', 'Enter valid email address');
  });
  it('links to /register', () => {
    cy.contains('Need an account').should('have.attr', 'href', '/auth/register');
  });
});
