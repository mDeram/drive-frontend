/// <reference types="cypress" />

Cypress.Commands.add("graphql", query => {
    return cy.request("POST", "http://localhost:8000/graphql", { query });
});
