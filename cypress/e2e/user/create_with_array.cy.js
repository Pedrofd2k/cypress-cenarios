/// <reference types="cypress" />

describe('Teste de criar lista de usuários com array', () => {
    let users;
  
    before(() => {
      cy.fixture('users.json').then((usersData) => {
        users = usersData;
      });
    });
  
    it('Cria uma lista de usuários com sucesso usando array', () => {
      cy.request('POST', 'user/createWithArray', users).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
    it('Não deve permitir a criação de vários usuários com o mesmo ID', () => {
      const duplicateIdUsers = [...users, users[0]];
  
      cy.request({
        method: 'POST',
        url: 'user/createWithArray',
        body: duplicateIdUsers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('Não deve permitir a criação de uma lista de usuários onde um dos usuários tem um ID faltante', () => {
      const userWithoutId = { ...users[0], id: undefined };
      const usersWithMissingId = [...users, userWithoutId];
  
      cy.request({
        method: 'POST',
        url: 'user/createWithArray',
        body: usersWithMissingId,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('Não deve permitir a criação de uma lista de usuários onde um dos usuários tem um email inválido', () => {
      const userWithInvalidEmail = { ...users[0], email: 'invalid-email' };
      const usersWithInvalidEmail = [...users, userWithInvalidEmail];
  
      cy.request({
        method: 'POST',
        url: 'user/createWithArray',
        body: usersWithInvalidEmail,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('Não deve permitir a criação de uma lista de usuários vazia', () => {
      const emptyUsers = [];
  
      cy.request({
        method: 'POST',
        url: 'user/createWithArray',
        body: emptyUsers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('Não deve permitir a criação de usuários com userStatus diferente de 0 e 1', () => {
      const userWithInvalidStatus = { ...users[0], userStatus: 3 };
      const usersWithInvalidStatus = [...users, userWithInvalidStatus];
  
      cy.request({
        method: 'POST',
        url: 'user/createWithArray',
        body: usersWithInvalidStatus,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('Não deve permitir a criação de usuários sem nome de usuário', () => {
      const userWithoutUsername = { ...users[0], username: undefined };
      const usersWithoutUsername = [...users, userWithoutUsername];
  
      cy.request({
        method: 'POST',
        url: 'user/createWithArray',
        body: usersWithoutUsername,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });
  