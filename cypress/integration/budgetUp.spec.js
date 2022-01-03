describe("BudgetUp Tests", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it("Login Success", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/");
    cy.get("#signInEmail").clear();
    cy.get("#signInEmail").type("elnn.sh@gmail.com");
    cy.get("#signInPassword").clear();
    cy.get("#signInPassword").type("test123");
    cy.get("#signInButton").click();
    cy.get(
      ":nth-child(2) > .card > .card-body > .d-flex > :nth-child(1) > .pt-3"
    ).should("exist");
    /* ==== End Cypress Studio ==== */
  });
});
