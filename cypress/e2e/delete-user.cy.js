/// <reference types="cypress" />

describe("Delete user", () => {
    beforeEach(() => {
        cy.newUser();

        cy.visit("/app");
        cy.wait(500);

        cy.get(".test-user-dropdown").click();
        cy.contains("Delete Account").click();
    });

    it("show error on wrong password", () => {
        cy.focused().type("arst").should("have.value", "arst");
        cy.get(".test-delete-account-confirm").click();
        cy.contains("Wrong password.");
    });

    it("delete a new user", () => {
        cy.fixture("users.json").then(users => users.new).as("newUser");

        cy.get("@newUser").then(({ password }) => {
            cy.focused().type(password).should("have.value", password);
        });
        cy.get(".test-delete-account-confirm").click();
        cy.url().should("include", "/login");

        cy.getEmail().its("html").then(html => {
            cy.document().invoke("write", html)
            cy.get("a").click();
            cy.url().should("include", "/delete-user-confirmation");
            cy.contains("Your account has been deleted");
        });

        cy.visit("/login");
        cy.wait(500);

        cy.get("@newUser").then(({ email, password }) => {
            cy.get("input[name='email']").type(email).should("have.value", email);
            cy.get("input[name='password']").type(password).should("have.value", password);
        });
        cy.get("button").click();
        cy.contains("Wrong email or password.");
    });
});
