/// <reference types="cypress" />

const logoutMutation = (`
mutation Logout {
    logout
}`);

describe("Reset password", () => {
    beforeEach(() => {
        cy.visit("/reset-password")
        cy.wait(500);
    });

    it("greets with Reset Password", () => {
        cy.contains("h1", "Reset Password");
    });

    it("links to /login", () => {
        cy.contains("Sign in").should("have.attr", "href", "/login");
    });

    it("show error on invalid email", () => {
        cy.get("input[name='email']").focus().blur();
        cy.contains("Please enter a valid email.");
    });

    it("show error on password too short", () => {
        cy.get("input[name='password']").focus().blur();
        cy.contains("Password must be at least 5 character long.");
    });

    it("reset the password of a new user", () => {
        cy.newUser();
        cy.fixture("users.json").then(users => users.new).as("newUser");
        const newPassword = "kekos";

        cy.get("@newUser").then(({ email }) => {
            cy.get("input[name='email']").type(email).should("have.value", email);
            cy.get("input[name='password']").type(newPassword).should("have.value", newPassword);
        });

        cy.get("button").click();

        cy.getEmail().its("html").then(html => {
            cy.document().invoke("write", html)
            cy.get("a").click();
        });

        cy.url().should("include", "/app");

        cy.graphql(logoutMutation);

        cy.visit("/login");
        cy.wait(500);

        cy.get("@newUser").then(({ email }) => {
            cy.get("input[name='email']").type(email);
            cy.get("input[name='password']").type(newPassword);
        });
        cy.get("button").click();
        cy.url().should("include", "/app");
    });
});
