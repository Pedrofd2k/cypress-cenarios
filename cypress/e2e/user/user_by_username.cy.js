/// <reference types="cypress" />
describe('Teste de obter usuário pelo nome de usuário', () => {
    const username = 'testuser';  // Substitua pelo nome de usuário desejado
  
    // Teste para cenário de sucesso (resposta 200)
    it('Obter um usuário com sucesso pelo nome de usuário', () => {
      cy.request(`/user/${username}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('username', username);
        });
    });
  
    // Teste para cenário de nome de usuário inválido (resposta 400)
    it('Retorna erro quando o nome de usuário é inválido', () => {
      const invalidUsername = '!!invãlid!!';
      cy.request({
        method: 'GET',
        url: `/user/${invalidUsername}`,
        failOnStatusCode: false,  // Evita que a falha de status cause um erro
      })
        .then((response) => {
          expect(response.status).to.eq(400);
        });
    });
  
    // Teste para cenário de usuário não encontrado (resposta 404)
    it('Retorna erro quando o usuário não é encontrado', () => {
      const nonExistentUsername = 'nonexistent';
      cy.request({
        method: 'GET',
        url: `/user/${nonExistentUsername}`,
        failOnStatusCode: false,  // Evita que a falha de status cause um erro
      })
        .then((response) => {
          expect(response.status).to.eq(404);
        });
    });
  });
  