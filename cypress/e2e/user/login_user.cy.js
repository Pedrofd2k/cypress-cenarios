/// <reference types="cypress" />

describe('Teste de login do usuário', () => {
    const username = 'testuser';
    const password = 'test123';

    it('Realizar login com sucesso', () => {
        cy.request({
            method: 'GET',
            url: `/user/login?username=${username}&password=${password}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property('x-expires-after');
            expect(response.headers).to.have.property('x-rate-limit');
        });
    });

    it('Não deve permitir login com nome de usuário incorreto', () => {
        cy.request({
            method: 'GET',
            url: `/user/login?username=wrong&password=${password}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403); // supondo que a API retorna 403 para credenciais inválidas
        });
    });

    it('Não deve permitir login com senha incorreta', () => {
        cy.request({
            method: 'GET',
            url: `/user/login?username=${username}&password=wrong`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403); // supondo que a API retorna 403 para credenciais inválidas
        });
    });

    it('Não deve permitir login com nome de usuário e senha em branco', () => {
        cy.request({
            method: 'GET',
            url: `/user/login?username=&password=`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403); // supondo que a API retorna 403 para credenciais inválidas
        });
    });

    it('Não deve permitir login com nome de usuário em branco e senha correta', () => {
        cy.request({
            method: 'GET',
            url: `/user/login?username=&password=${password}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403); // supondo que a API retorna 403 para credenciais inválidas
        });
    });

    it('Não deve permitir login com nome de usuário correto e senha em branco', () => {
        cy.request({
            method: 'GET',
            url: `/user/login?username=${username}&password=`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403); // supondo que a API retorna 403 para credenciais inválidas
        });
    });
});
