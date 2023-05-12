/// <reference types="cypress" />

describe('Teste de criar lista de usuários', () => {
    const users = [
        {
            id: 1,
            username: 'testuser1',
            firstName: 'Test1',
            lastName: 'User1',
            email: 'testuser1@example.com',
            password: 'test123',
            phone: '1234567890',
            userStatus: 1,
        },
        {
            id: 2,
            username: 'testuser2',
            firstName: 'Test2',
            lastName: 'User2',
            email: 'testuser2@example.com',
            password: 'test456',
            phone: '0987654321',
            userStatus: 0,
        }
    ];

    it('Cria uma lista de usuários com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/user/createWithList',
            body: users,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Não deve permitir a criação de vários usuários com o mesmo ID', () => {
        const duplicateIdUsers = [...users, users[0]];

        cy.request({
            method: 'POST',
            url: '/user/createWithList',
            body: duplicateIdUsers,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para IDs duplicados
        });
    });

    it('Não deve permitir a criação de uma lista de usuários onde um dos usuários tem um ID faltante', () => {
        const userWithoutId = {...users[0], id: undefined};
        const usersWithMissingId = [...users, userWithoutId];

        cy.request({
            method: 'POST',
            url: '/user/createWithList',
            body: usersWithMissingId,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para usuários sem ID
        });
    });

    it('Não deve permitir a criação de uma lista de usuários onde um dos usuários tem um email inválido', () => {
        const userWithInvalidEmail = {...users[0], email: 'invalid-email'};
        const usersWithInvalidEmail = [...users, userWithInvalidEmail];

        cy.request({
            method: 'POST',
            url: '/user/createWithList',
            body: usersWithInvalidEmail,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para emails inválidos
        });
    });

    it('Não deve permitir a criação de uma lista de usuários vazia', () => {
        const emptyUsers = [];

        cy.request({
            method: 'POST',
            url: '/user/createWithList',
            body: emptyUsers,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // supondo que a API retorna 400 para uma lista de usuários vazia
        });
    });
});
