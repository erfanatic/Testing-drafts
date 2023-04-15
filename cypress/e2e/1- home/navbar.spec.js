describe("navbar", () => {
  beforeEach(() => {
    cy.visit("https://revive-ecommerce.vercel.app/");
  });

  context("App title and app icon", () => {
    it("checks if the app title is rendered correctly", () => {
      cy.getByTranslatedText("header h6", "__APP_NAME__");
    });
    it("checks if the app icon is rendered", () => {
      cy.get("header").find("svg").should("exist");
    });
  });

  context("Language toggle button", () => {
    it("checks if the language toggle button works correctly", () => {
      cy.getByTestId("TranslateIcon").click();
      cy.getByTestId("TranslateIcon")
        .parent()
        .should("have.attr", "aria-label", "en");
      cy.getByTranslatedText("header h6", "__APP_NAME__", "bn");
      cy.getByTestId("TranslateIcon").click();
      cy.getByTestId("TranslateIcon")
        .parent()
        .should("have.attr", "aria-label", "bn");
      cy.getByTranslatedText("header h6", "__APP_NAME__");
    });
  });

  context("Theme toggle button", () => {
    it("checks if the theme toggle button works correctly", () => {
      cy.get("header").should(
        "have.css",
        "background-color",
        "rgb(18, 18, 18)"
      );

      cy.getByTestId("LightModeIcon").click();
      cy.get("header").should(
        "have.css",
        "background-color",
        "rgb(73, 103, 39)"
      );
      cy.getByTestId("DarkModeOutlinedIcon").click();
      cy.get("header").should(
        "have.css",
        "background-color",
        "rgb(18, 18, 18)"
      );
    });
  });
});
