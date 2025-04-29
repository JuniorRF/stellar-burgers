describe('Модальные окна', function() {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
        cy.visit('http://localhost:4000');
    });
    it('Открытие модального окна', function() {
        cy.get('[data-cy=bun1]').click();
        cy.get('[data-cy=modal]')
            .contains('Булка 1')
            .should('exist')
    });
    it('Закрыть крестиком модальное окно', function() {
        cy.get('[data-cy=bun2]').click();
        cy.get('[data-cy=modal] button').click();
        cy.get('[data-cy=modal]').should('not.exist');
    });
    it('Закрыть модальное окно по клику на оверлей', function() {
        cy.get('[data-cy=main2]').click();
        cy.get('body').click(0,0);
        cy.get('[data-cy=modal]').should('not.exist');
    });
});

describe('Добавление ингредиентов', function() {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
        cy.visit('http://localhost:4000');
    });
    it('Добавление Булки в конструктор', function() {
        cy.get('[data-cy=bun1]').contains('Добавить').click();
        cy.get('[data-cy=constuctor-bun-up]')
            .contains('Булка 1')
            .should('exist')
        cy.get('[data-cy=constuctor-bun-down]')
            .contains('Булка 1')
            .should('exist')
    });
    it('Добавление мяса в конструктор', function() {
        cy.get('[data-cy=main1]').contains('Добавить').click();
        cy.get('[data-cy=constructor-ingredient-main1]')
            .contains('Мясо 1')
            .should('exist')
    });
    it('Добавление соуса в конструктор', function() {
        cy.get('[data-cy=sauce1]').contains('Добавить').click();
        cy.get('[data-cy=constructor-ingredient-sauce1]')
            .contains('Соус 1')
            .should('exist')
    });
});

describe('Оформление заказа', function() {
    beforeEach(() => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients" });
        cy.intercept("GET", "api/auth/user", { fixture: "user",});
        cy.intercept("POST", "api/orders", { fixture: "order-response"})
        window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'))
        cy.setCookie('accessToken', 'testAccessToken')
        cy.visit('http://localhost:4000');
    });
    this.afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    it('Заполняем заказ и нажимаем купить', function() {
        cy.get('[data-cy=bun1]').contains('Добавить').click();
        cy.get('[data-cy=main1]').contains('Добавить').click();
        cy.get('[data-cy=sauce1]').contains('Добавить').click();
        cy.contains('Оформить заказ').click();
        cy.get('[data-cy=modal]')
            .contains('123456')
            .should('exist')
    });
});