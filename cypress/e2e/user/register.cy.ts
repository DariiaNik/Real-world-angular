describe('The Login Page', () => {
  const user = {
    username: 'Test User',
    email: 'testUser@gmail.com',
    password: '12345',
  };
  let existEmail: string = 'pineapple@gmail.com';
  let existUsername: string = 'Dariia';

  beforeEach(() => {
    cy.visit('/auth/register');
  });

  it(' successfully register', function () {
    cy.get('input[id=username]').type('Test');
    cy.get('input[id=email]').type('Test@gmail.com');
    cy.get('input[id=password]').type(`${user.password}{enter}`);
    cy.url().should('include', '/home');
    cy.wait(1000);
    cy.get('.nav-item').contains('Test');
  });
  it('error logging in, exist username', function () {
    cy.get('input[id=username]').type(existUsername);
    cy.get('input[id=email]').type(user.email);
    cy.get('input[id=password]').type(`${user.password}{enter}`);
    cy.get('small').should('contain', 'Failed, username already exists');
  });
  it('error logging in, exist email', function () {
    cy.get('input[id=username]').type(user.username);
    cy.get('input[id=email]').type(existEmail);
    cy.get('input[id=password]').type(`${user.password}{enter}`);
    cy.get('small').should('contain', 'Failed, email already exists');
  });

  it('required username', () => {
    cy.get('input[id=username]').click();
    cy.get('input[id=email]').type(user.email);
    cy.get('input[id=password]').type(`${user.password}{enter}`);
    cy.get('.btn-lg').click({ force: true });
    cy.get('small').should('contain', 'Field cannot be empty');
  });
  it('required password', () => {
    cy.get('input[id=username]').type(user.username);
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
  it('links to login page', () => {
    cy.contains('Have an account?').should('have.attr', 'href', '/auth/login');
  });
});
