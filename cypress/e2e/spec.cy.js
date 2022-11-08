describe("Validates user invalid login inputs correctly according to API restrictions", () => {
  it("Social-media-app: User cant login with invalid inputs based on API restrictions", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.wait(1000);
    cy.get('form [data-auth="login"]').contains("Login").click();
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
  });
});

describe("Validates user inputs correctly based on API restrictions", () => {
  it("social-media app: User can log in with valid user credentials", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.wait(800);
    cy.get('form [data-auth="login"]').contains("Login").click();
    cy.wait(1500);
    cy.get('form [id="loginEmail"]').type(
      "legolass@noroff.no",
      { force: true },
      { delay: 200 }
    );
    cy.get('form [id="loginPassword"]').type("12345678", { delay: 200 });
    cy.get('form [class="btn btn-success"]').contains("Login").click();
    cy.then(() => expect(window.localStorage.getItem("token")).to.not.be.null);
  });

  it("Social-media-app: User can successfully create a post according to API restrictions and delete it", () => {
    cy.wait(3000);
    cy.get('[id="footerActions"] a').contains("New Post").click();
    cy.get('form [id="postTags"]').type("cypress, testing", { delay: 100 });
    cy.get('form [id="postMedia"]').type("https://ghweirhbgiosrhgi.jpg");
    cy.get('form [id="postBody"]').type(
      "Lorem ipsum testing the post function on the website",
      { delay: 150 }
    );
    cy.get('form button [data-action="publish"]').click();
    cy.wait(2000);
    cy.get('form [id="postTitle"]').type("Testing with cypress", {
      delay: 100,
    });
    cy.get('form [id="postMedia"]').clear();
    cy.get('form [id="postMedia"]').type(
      "https://i.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI"
    );
    cy.wait(500);
    cy.get('form button [data-action="publish"]').click();
    cy.wait(27000);
    cy.get("button").contains("Delete").click();
    cy.wait(1000);
  });
});
