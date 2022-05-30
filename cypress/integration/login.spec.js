/// <reference types="cypress" />

describe("Login form", () => {
    it("login test user", () => {
        cy.visit("/login");
        cy.fixture("test_user.json").then(user => {
            const { email, password } = user;
            cy.get("input[name='email']").type(email).should("have.value", email);
            cy.get("input[name='password']").type(password).should("have.value", password);
        });
        cy.get("button").click();
        cy.url().should("include", "/app");
    });

    it("redirect from login to app when logged in", () => {
        cy.login();
        cy.visit("/login");
        cy.url().should("include", "/app");
    });
})
