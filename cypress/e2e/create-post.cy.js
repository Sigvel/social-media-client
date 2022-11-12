describe("Social-media-app: Create item form validates inputs correctly based on API restriction", () => {
  it("Social-media-app: User can successfully create a post and delete it", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.wait(500);
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
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
    cy.then(() => expect(window.localStorage.getItem("token")).not.to.be.null);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).not.to.be.null
    );
    cy.get('[id="footerActions"] a').contains("New Post").click();
    cy.wait(800);
    cy.get('form [id="postTitle"]').type("Testing with cypress", {
      delay: 100,
    });
    cy.get('form [id="postTags"]').type("cypress, testing", { delay: 100 });
    cy.get('form [id="postMedia"]').type(
      "https://i.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI"
    );
    cy.get('form [id="postBody"]').type(
      "Lorem ipsum testing the post function on the website",
      { delay: 150 }
    );
    cy.wait(500);
    cy.get('form button [data-action="publish"]').click();
    cy.wait(3000);
    cy.get("button").contains("Delete").click();
    cy.wait(1000);
  });

  it("Social-media-app: User cant make a post without title", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.wait(500);
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
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
    cy.wait(1000);
    cy.then(() => expect(window.localStorage.getItem("token")).not.to.be.null);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).not.to.be.null
    );
    cy.wait(800);
    cy.get('[id="footerActions"] a').contains("New Post").click();
    cy.wait(800);
    cy.get('form [id="postTags"]').type("cypress, testing", { delay: 100 });
    cy.get('form [id="postMedia"]').type(
      "https://i.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI"
    );
    cy.get('form [id="postBody"]').type(
      "Lorem ipsum testing the post function on the website",
      { delay: 150 }
    );
    cy.get('form button [data-action="publish"]').click();
    cy.wait(2000);
  });

  it("Social-media-app: User cant make a post without valid image", () => {
    cy.visit("http://127.0.0.1:8485/");
    cy.clearLocalStorage();
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
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
    cy.wait(1000);
    cy.then(() => expect(window.localStorage.getItem("token")).not.to.be.null);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).not.to.be.null
    );
    cy.wait(500);
    cy.get('[id="footerActions"] a').contains("New Post").click();
    cy.wait(800);
    cy.get('form [id="postTitle"]').type("Testing with cypress", {
      delay: 100,
    });
    cy.get('form [id="postTags"]').type("cypress, testing", { delay: 100 });
    cy.get('form [id="postMedia"]').type("Vroom vroom vroom");
    cy.get('form [id="postBody"]').type(
      "Lorem ipsum testing the post function on the website",
      { delay: 150 }
    );
    cy.get('form button [data-action="publish"]').click();
    cy.wait(2000);
    cy.get("button[data-auth='logout']").click();
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
  });
});
