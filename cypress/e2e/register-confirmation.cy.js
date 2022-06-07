/// <reference types="cypress" />

describe("Register confirmation", () => {
    it("show error on invalid token", () => {
        cy.visit("/register-confirmation");
        cy.contains("Invalid token");
    });

    it("show error on expired token", () => {
        cy.visit("/register-confirmation?token=arst");
        cy.contains("Token expired");
    });
})
