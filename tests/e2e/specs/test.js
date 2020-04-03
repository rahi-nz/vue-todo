// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("add new todo", () => {
    cy.visit("http://localhost:8080");
    cy.get(".wrapper")
      .find(".todo-input")
      .type(`hey I'm here rahi`)
      .type("{enter}");
  });
  it("check one check boxes", () => {
    cy.get(".wrapper")
      .find(".item-wrapper")
      .find(".ant-checkbox-input")
      .first()
      .click();
  });
  it("edit todo tile", () => {
    cy.get(".todo-item")
      .first()
      .find(".item-wrapper")
      .dblclick()
      .find(".ant-input")
      .wait(2000)
      .clear()
      .type(`I'm gonna change the title`)
      .type("{enter}");
  });
  it("filter active", () => {
    cy.get(".extra-container")
      .find(".ant-btn")
      .eq(2)
      .click()
      .wait(2000);
  });
  it("filter complete", () => {
    cy.get(".extra-container")
      .find(".ant-btn")
      .eq(1)
      .click()
      .wait(2000);
  });
  it("filters all", () => {
    cy.get(".extra-container")
      .find(".ant-btn")
      .eq(0)
      .click()
      .wait(2000);
  });
  it("clear completed", () => {
    cy.get(".extra-container")
      .find(".ant-btn")
      .eq(3)
      .click()
      .wait(2000);
  });
  it("check all check boxes", () => {
    cy.get(".wrapper")
      .find(".details")
      .find(".ant-checkbox-input")
      .click();
  });
  it("deleted one todo", () => {
    cy.get(".wrapper")
      .find(".actions")
      .first()
      .find(".anticon-delete")
      .click();
  });
});
