describe("First test", () => {
    beforeEach(() => {
        cy.login();
    });

    it("Does nothing big", () => {
        cy.visit("/register");
        cy.url().should("include", "/app");
    });
})
