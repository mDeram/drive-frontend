/// <reference types="cypress" />

const newUserMutation = (username, email, password) => (`
mutation NewUser {
    newUser(inputs: { username: "${username}", email: "${email}", password: "${password}" })
}`);

Cypress.Commands.add("newUser", () => {
    cy.fixture("users.json").then(users => {
        const { username, email, password } = users.new;
        cy.graphql(newUserMutation(username, email, password));
    });
});
