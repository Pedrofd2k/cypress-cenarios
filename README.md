# README - Cypress-Cenários

Este é um guia de instruções para instalar e executar as dependências do projeto Cypress-Cenários. O projeto pode ser encontrado no repositório [pedrofd2k/cypress-cenarios](https://github.com/pedrofd2k/cypress-cenarios).

## Pré-requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina antes de prosseguir:

- Node.js (versão 12 ou superior)
- NPM (gerenciador de pacotes do Node.js)

## Instalação

Siga as etapas abaixo para instalar as dependências do projeto:

1. Clone o repositório para sua máquina local: git clone https://github.com/pedrofd2k/cypress-cenarios.git

2. Acesse o diretório do projeto: cd cypress-cenarios

3. Instale as dependências do Node.js através do NPM: npm install

## Executando os testes

Após instalar as dependências, você pode executar os testes automatizados utilizando o Cypress. Siga as etapas abaixo:

1. Certifique-se de estar no diretório do projeto (`cypress-cenarios`).

2. Execute o comando a seguir para abrir o Cypress Test Runner:

```
npm run cypress:open
```
3. Executando os testes em modo headless (sem interface gráfica)
```
npm run test:run
```
4. Gerando relatório html
```
npm run test:merge
npm run html
```

## Suporte e contribuição

Se você tiver algum problema ao instalar ou executar as dependências do projeto, sinta-se à vontade para abrir uma issue no repositório [pedrofd2k/cypress-cenarios](https://github.com/pedrofd2k/cypress-cenarios). Será um prazer ajudá-lo.

Contribuições para o projeto também são bem-vindas. Sinta-se à vontade para enviar um pull request com melhorias, correções de bugs ou novos recursos.
