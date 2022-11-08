describe("User can logout", () => {
  it("Social-media-app: User can successfully log out of the account", () => {
    cy.clearLocalStorage();
    cy.visit("http://127.0.0.1:8485/");
    cy.wait(1000);
    cy.get('[data-auth="login"]:visible').contains("Login").click();
    cy.wait(1000);
    cy.get('form [id="loginEmail"]').type(
      "legolass@noroff.no",
      { force: true },
      { delay: 300 }
    );
    cy.get('form [id="loginPassword"]').type("12345678", { delay: 200 });
    cy.get('form [class="btn btn-success"]')
      .contains("Login")
      .click({ force: true });
    cy.wait(1500);
    cy.then(() => expect(window.localStorage.getItem("token")).to.not.be.null);
    cy.get("button[data-auth='logout']").click();
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
  });
});
