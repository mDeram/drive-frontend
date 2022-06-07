/// <reference types="cypress" />

describe("Redirections", () => {
    it("redirect from register to app when logged in", () => {
        cy.login();
        cy.visit("/register");
        cy.url().should("include", "/app");
    });

    it("redirect from login to app when logged in", () => {
        cy.login();
        cy.visit("/login");
        cy.url().should("include", "/app");
    });

    it("redirect from app to login when not logged in", () => {
        cy.visit("/app");
        cy.url().should("include", "/login");
    });
});
