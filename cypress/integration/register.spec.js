/// <reference types="cypress" />

const deleteUserMutation = (email, password) => (`
mutation deleteUser {
    deleteUser(email: "${email}", password: "${password}")
}`);

describe("Register form", () => {
    beforeEach(() => {
        cy.visit("/register")
    });

    it("register a new user", () => {
        cy.fixture("new_user.json").then(user => {
            const deleteUser = deleteUserMutation(user.email, user.password);
            cy.graphql(deleteUser);

            const { username, email, password } = user;
            cy.get("input[name='username']").type(username).should("have.value", username);
            cy.get("input[name='email']").type(email).should("have.value", email);
            cy.get("input[name='password']").type(password).should("have.value", password);
        });
        cy.get("button").click();
        cy.url().should("include", "/app");
    });

    it("greets with Register", () => {
        cy.contains("h1", "Register");
    });

    it("links to /login", () => {
        cy.contains("Sign in").should("have.attr", "href", "/login");
    });

    it("show error on username too short", () => {
        cy.get("input[name='username']").focus().blur();
        cy.contains("Username must be at least 1 character long.");
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
        cy.url().should("include", "/register");
    });

    it("show error on already used email", () => {
        cy.fixture("test_user.json").then(user => {
            const { username, email, password } = user;
            cy.get("input[name='username']").type(username);
            cy.get("input[name='email']").type(email)
            cy.get("input[name='password']").type(password)
        });
        cy.get("button").click();
        cy.contains("Email already taken.");
    });
})
