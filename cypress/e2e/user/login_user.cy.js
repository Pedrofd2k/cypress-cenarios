/// <reference types="cypress" />

describe('Teste de login do usuário', () => {
    const username = 'testuser1';
    const password = 'test123';

    it('Faz login com sucesso usando nome de usuário e senha', () => {
        cy.request({
            method: 'GET',
            url: 'user/login',
            body: {
                username: username,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.include('logged in user session');
        });
    });

    it('Não deve permitir login com senha incorreta', () => {
        cy.request({
            method: 'GET',
            url: 'user/login',
            body: {
                username: username,
                password: 'wrongpassword'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Não deve permitir login com nome de usuário inexistente', () => {
        cy.request({
            method: 'GET',
            url: 'user/login',
            body: {
                username: 'fakeuser',
                password: password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Não deve permitir login sem senha', () => {
        cy.request({
            method: 'GET',
            url: 'user/login',
            body: {
                username: username
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Não deve permitir login sem nome de usuário', () => {
        cy.request({
            method: 'GET',
            url: 'user/login',
            body: {
                password: password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Não deve permitir login sem nome de usuário e senha', () => {
        cy.request({
            method: 'GET',
            url: 'user/login',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
});
