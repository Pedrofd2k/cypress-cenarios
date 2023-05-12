/// <reference types="cypress" />

describe('Teste de criar usuário', () => {
    const user = {
        id: 1,
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'test123',
        phone: '1234567890',
        userStatus: 1,
    };

    it('Criar um novo usuário com sucesso', () => {
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
            failOnStatusCode: false // para que Cypress não falhe automaticamente em um status de erro HTTP
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para IDs duplicados
        });
    });

    it('Não deve permitir a criação de um usuário sem ID', () => {
        const userWithoutId = {...user, id: undefined};

        cy.request({
            method: 'POST',
            url: '/user',
            body: userWithoutId,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para usuários sem ID
        });
    });

    it('Não deve permitir a criação de um usuário com um email inválido', () => {
        const userWithInvalidEmail = {...user, email: 'invalid-email'};

        cy.request({
            method: 'POST',
            url: '/user',
            body: userWithInvalidEmail,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para emails inválidos
        });
    });
});
