/// <reference types="cypress" />

const resetUserMutation = (email, password) => (`
mutation resetUser {
    resetUser(email: "${email}", password: "${password}", subscription: true)
}`);

const registerMutation = (username, email, password) => (`
mutation Register {
    register(inputs: { username: "${username}", email: "${email}", password: "${password}" }) {
        id
    }
}`);

const loginMutation = (email, password) => (`
mutation Login {
    login(email: "${email}", password: "${password}") {
        id
    }
}`);

Cypress.Commands.add("login", (credentials = {}) => {
    cy.fixture("test_user.json").then(user => {

        const username = credentials.username || user.username;
        const email = credentials.email || user.email;
        const password = credentials.password || user.password;

        cy.session([email, password], () => {

            const register = registerMutation(username, email, password);
            const login = loginMutation(email, password);

            cy.graphql(register);

            cy.graphql(login).then(res => {
                expect(res.body.data.login).to.be.not.null;
            });
        });

        const resetUser = resetUserMutation(email, password);
        cy.graphql(resetUser).then(res => {
            expect(res.body.data.resetUser).to.be.true
        });
    });
});

Cypress
