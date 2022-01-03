describe("HomePage Tests", function () {
  it("Classified cash amount is larger than the sum of withdraw", function () {
    cy.visit("http://localhost:3000/");
    cy.wait(3000);
    cy.get("#classifyCashExpenses").click();
    cy.get("#amountInput0").clear();
    cy.get("#amountInput0").type("2000");
    cy.get("#saveBtn").should("be.disabled");
  });

  it("Search for non existing category", function () {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.get("#searchInput").clear();
    cy.get("#searchInput").type("nonExistingCategory");
    cy.get("#categoriesCards").should("be.empty");
  });

  it("Add Income without any data - save button should be disabled", function () {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.get("#addIncome").click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#saveBtn").should("be.disabled");
    cy.get("#cashSource").clear();
    cy.get("#cashSource").type("Salary");
    cy.get("#saveBtn").should("be.disabled");
    cy.get("#cashDate").clear();
    cy.get("#cashDate").type("2021-11-11");
    cy.get("#saveBtn").should("be.disabled");
    cy.get("#cashAmount").clear();
    cy.get("#cashAmount").type("-42");
    cy.get("#saveBtn").should("be.disabled");
    /* ==== End Cypress Studio ==== */
  });
});
