/// <reference types="cypress" />

const resetUserMutation = (email, password) => (`
mutation resetUser {
    resetUser(email: "${email}", password: "${password}", subscription: true)
}`);

const registerMutation = (username, email, password) => (`
mutation Register {
    register(inputs: { username: "${username}", email: "${email}", password: "${password}" }) {
        __typename
        ... on BooleanResponse {
            response
        }
    }
}`);

const confirmRegisterMutation = (token) => (`
    confirmRegister(token: "${token}") {
        __typename
        ... on User {
            id
        }
    }
}`);

const loginMutation = (email, password) => (`
mutation Login {
    login(email: "${email}", password: "${password}") {
        __typename
        ... on User {
            id
        }
    }
}`);

Cypress.Commands.add("login", (credentials = {}) => {
    cy.fixture("users.json").then(users => {
        const user = users.default;

        const username = credentials.username || user.username;
        const email = credentials.email || user.email;
        const password = credentials.password || user.password;

        cy.session([email, password], () => {
            const register = registerMutation(username, email, password)
            const login = loginMutation(email, password);

            cy.graphql(register).then(res => {
                if (!res.body.data.register.response) return;

                cy.getEmail().its("html").then(html => {
                    cy.document().invoke("write", html)
                    cy.get("a").invoke("attr", "href").then(href => {
                        const token = href.split("=")[1];
                        const confirmRegister = confirmRegisterMutation(token);

                        cy.graphql(confirmRegister).then(res => {
                            expect(res.body.data.confirmRegister.id).to.be.not.null;
                        });
                    });
                });
            });

            cy.graphql(login).then(res => {
                expect(res.body.data.login.id).to.be.not.null;
            });
        });

        const resetUser = resetUserMutation(email, password);
        cy.graphql(resetUser).then(res => {
            expect(res.body.data.resetUser).to.be.true
        });
    });
});
