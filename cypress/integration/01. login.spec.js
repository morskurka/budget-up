describe("Login Tests", () => {
  it("User Name and password are null", function () {
    cy.visit("http://localhost:3000/");
    cy.get("#signInEmail").clear();
    cy.get("#signInPassword").clear();
    cy.get("#signInButton").click();
    cy.get(".sign-in-form > .social-text").should("be.visible");
  });

  it("Login Success", function () {
    cy.visit("http://localhost:3000/");
    cy.get("#signInEmail").clear();
    cy.get("#signInEmail").type("elnn.sh@gmail.com");
    cy.get("#signInPassword").clear();
    cy.get("#signInPassword").type("test123");
    cy.get("#signInButton").click();
    cy.wait(3000);
    cy.get("#balanceInfoBar").should("exist");
  });
});
