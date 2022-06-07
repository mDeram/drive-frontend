/// <reference types="cypress" />

describe("Login form", () => {
    beforeEach(() => {
        cy.visit("/login")
        // Fix for https://github.com/cypress-io/cypress/issues/7306
        cy.wait(500);
    });

    it("login test user", () => {
        cy.fixture("users.json").then(users => {
            const { email, password } = users.default;

            cy.get("input[name='email']").type(email).should("have.value", email);
            cy.get("input[name='password']").type(password).should("have.value", password);
        });
        cy.get("button").click();
        cy.url().should("include", "/app");
    });

    it("greets with Login", () => {
        cy.contains("h1", "Login");
    });

    it("links to /register", () => {
        cy.contains("Sign up").should("have.attr", "href", "/register");
    });

    it("show error on invalid email", () => {
        cy.get("input[name='email']").focus().blur();
        cy.contains("Please enter a valid email.");
    });

    it("show error on password too short", () => {
        cy.get("input[name='password']").focus().blur();
        cy.contains("Password must be at least 5 character long.");
    });

    it("does not send when fields are erroring", () => {
        cy.get("button").click();
        cy.url().should("include", "/login");
    });

    it("show error on wrong email", () => {
        cy.fixture("users.json").then(users => {
            cy.get("input[name='email']").type(users.inexistant.email)
            cy.get("input[name='password']").type(users.default.password)
        });
        cy.get("button").click();
        cy.contains("Wrong email or password.");
    });

    it("show error on wrong password", () => {
        cy.fixture("users.json").then(users => {
            cy.get("input[name='email']").type(users.default.email)
            cy.get("input[name='password']").type(users.inexistant.password)
        });
        cy.get("button").click();
        cy.contains("Wrong email or password.");
    });
})
