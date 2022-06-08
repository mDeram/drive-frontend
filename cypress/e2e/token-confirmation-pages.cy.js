/// <reference types="cypress" />

const tests = [
    {
        name: "Register confirmation",
        url: "/register-confirmation"
    },
    {
        name: "Delete user confirmation",
        url: "/delete-user-confirmation"
    }
];

tests.forEach(({ name, url }) => {
    describe(name, () => {
        it("show error on invalid token", () => {
            cy.visit(url);
            cy.contains("Invalid token");
        });

        it("show error on expired token", () => {
            cy.visit(url + "?token=arst");
            cy.contains("Token expired");
        });
    })
});
