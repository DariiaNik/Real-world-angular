Cypress.Commands.add('login', () => {
  const user = {
    email: 'pineapple@gmail.com',
    password: '12345',
  };
  cy.request('POST', 'http://localhost:3000/users/login', { user: user }).then((response) => {
    window.localStorage.setItem('token', response.body.user.token);
  });
});
