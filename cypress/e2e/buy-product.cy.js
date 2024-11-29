describe("My First Test", () => {
  it('finds the content "type"', () => {
    cy.visit("http://localhost:8000/");

    const SIX_SECONDS = 6000;
    cy.wait(SIX_SECONDS);

    cy.get('button[data-test-name="add-to-cart"]').first().click();

    cy.get('input[data-test-name="cart-json"]').invoke("val").should(
      "not.be.empty",
    );

    cy.visit("http://localhost:8000/checkout");
  });
});
