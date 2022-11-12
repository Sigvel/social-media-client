describe("Validates user invalid login inputs correctly according to API restrictions", () => {
  it("Social-media-app: User cant login with invalid email", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.wait(1000);
    cy.get('[data-auth="login"]:visible').contains("Login").click();
    cy.wait(1000);
    cy.get('form [id="loginEmail"]').type(
      "legolass@norof.no",
      { force: true },
      { delay: 300 }
    );
    cy.get('form [id="loginPassword"]').type("12345678", { delay: 200 });
    cy.get('form [class="btn btn-success"]')
      .contains("Login")
      .click({ force: true });
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
  });
});

it("Social-media-app: User cant login with invalid password", () => {
  cy.visit("http://127.0.0.1:8485/");
  cy.clearLocalStorage();
  cy.wait(1000);
  cy.get('[data-auth="login"]:visible').contains("Login").click();
  cy.wait(1000);
  cy.get('form [id="loginEmail"]').type(
    "legolass@noroff.no",
    { force: true },
    { delay: 300 }
  );
  cy.get('form [id="loginPassword"]').type("123456", { delay: 200 });
  cy.get('form [class="btn btn-success"]')
    .contains("Login")
    .click({ force: true });
  cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
  cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
});

describe("Validates user inputs correctly based on API restrictions", () => {
  it("social-media app: User can log in with valid user credentials", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.wait(800);
    cy.get('[data-auth="login"]:visible').contains("Login").click();
    cy.wait(1500);
    cy.get('form [id="loginEmail"]').type(
      "legolass@noroff.no",
      { force: true },
      { delay: 200 }
    );
    cy.get('form [id="loginPassword"]').type("12345678", { delay: 200 });
    cy.get('form [class="btn btn-success"]').contains("Login").click();
    cy.wait(1500);
    cy.then(() => expect(window.localStorage.getItem("token")).not.to.be.null);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).not.to.be.null
    );
  });
});
