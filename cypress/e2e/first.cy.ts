describe('проверяем доступность приложения', function() {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
        cy.intercept("GET", "api/auth/user", { fixture: "user",});
    })
    it('сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000');
    });
    it('открывает модльные окна', function() {
        cy.get('');
    });
}); 