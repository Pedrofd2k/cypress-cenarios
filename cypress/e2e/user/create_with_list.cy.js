/// <reference types="cypress" />

describe('Teste de criar lista de usuários', () => {
    let users;
  
    before(() => {
      cy.fixture('users.json').then((usersData) => {
        users = usersData;
      });
    });
  
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
            expect(response.status).to.eq(400);  //Supondo que retorne bad request (400)
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
            expect(response.status).to.eq(400); 
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
            expect(response.status).to.eq(400); 
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
            expect(response.status).to.eq(400); 
        });
    });
});
