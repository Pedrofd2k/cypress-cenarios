/// <reference types="cypress" />

describe('Teste de criação de usuário', () => {
    let user;

    before(() => {
        cy.fixture('user.json').then((userData) => {
            user = userData;
        });
    });

    it('Cria um usuário com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/user',
            body: user,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Não deve permitir a criação de um usuário com o mesmo ID', () => {
        cy.request({
            method: 'POST',
            url: '/user',
            body: user,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para IDs duplicados
        });
    });

    it('Não deve permitir a criação de um usuário com um email inválido', () => {
        const userWithInvalidEmail = { ...user, email: 'invalid-email' };

        cy.request({
            method: 'POST',
            url: '/user',
            body: userWithInvalidEmail,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para emails inválidos
        });
    });

    it('Não deve permitir a criação de um usuário sem nome de usuário', () => {
        const userWithoutUsername = { ...user, username: undefined };

        cy.request({
            method: 'POST',
            url: '/user',
            body: userWithoutUsername,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para usuários sem nome de usuário
        });
    });

    it('Não deve permitir a criação de um usuário com userStatus diferente de 0 e 1', () => {
        const userWithInvalidStatus = { ...user, userStatus: 3 };

        cy.request({
            method: 'POST',
            url: '/user',
            body: userWithInvalidStatus,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para status de usuário inválidos
        });
    });
});
