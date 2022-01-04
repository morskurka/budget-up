describe("HomePage Tests", function () {
  it("Classify cash impact prediction", function () {
    cy.visit("http://localhost:3000/");
    cy.wait(3000);
    cy.get(
      ":nth-child(1) > .single-category > .row > .text-end > .fw-bold"
    ).then(($expected) => {
      let expectedAmount = parseFloat($expected.text());
      cy.get("#classifyCashExpenses").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get(".me-4 > .bi").click();
      cy.get("#categorySelector0").select("Bank Commissions");
      cy.get("#datePicker0").clear();
      cy.get("#datePicker0").type("2021-10-31");
      cy.get("#amountInput0").clear();
      cy.get("#amountInput0").type("150");
      cy.get("#saveBtn").click();
      cy.get(
        ":nth-child(1) > .single-category > .row > .text-end > .fw-bold"
      ).then(($afterChange) => {
        let afterChange = parseFloat($afterChange.text());
        assert.notEqual(expectedAmount, afterChange);
      });
    });
  });

  it("Search for non existing category", function () {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.get("#searchInput").clear();
    cy.get("#searchInput").type("nonExistingCategory");
    cy.get("#categoriesCards").should("be.empty");
  });

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
  });
});
