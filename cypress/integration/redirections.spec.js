/// <reference types="cypress" />

describe("Redictions", () => {
    it("redirect from register to app when logged in", () => {
        cy.login();
        cy.visit("/register");
        cy.url().should("include", "/app");
    });
});
