# QA Playwright Studies

![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Automation-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-npm-339933?logo=nodedotjs&logoColor=white)
![Testing](https://img.shields.io/badge/Tests-E2E%20%7C%20API%20%7C%20Visual-blue)

Projeto de estudos em **Quality Assurance e automação de testes** utilizando **Playwright + TypeScript**.

O objetivo deste repositório é praticar a construção de uma suíte de testes organizada e manutenível, cobrindo diferentes camadas de qualidade: **testes End-to-End (E2E), testes de API, regressão visual, cenários positivos e negativos, Page Object Model (POM), execução cross-browser, documentação de cenários e geração de evidências de falha**.

> Este é um projeto de aprendizado contínuo. Os cenários foram adaptados e expandidos durante os estudos de Playwright, TypeScript, automação de testes, IA e MCP.

---

## Sobre o projeto

Durante os estudos, o site originalmente utilizado em parte do material do curso apresentou problemas de SSL. Para continuar praticando os mesmos conceitos de automação em um ambiente funcional, os cenários web foram adaptados para o **SauceDemo**, uma aplicação de e-commerce destinada a testes.

Para os testes de API, o projeto utiliza **DummyJSON**, permitindo praticar requisições HTTP, validação de respostas, autenticação e operações CRUD.

Além da automação, os cenários foram documentados em uma planilha de testes contendo passos, resultados esperados, status de execução e rastreabilidade com os arquivos automatizados.

### Sistemas utilizados

| Tipo | Aplicação | Uso |
| --- | --- | --- |
| Web | [SauceDemo](https://www.saucedemo.com/) | E2E e regressão visual |
| API | [DummyJSON](https://dummyjson.com/) | Testes de API |

---

## Tecnologias e conceitos praticados

- **Playwright Test**
- **TypeScript**
- **Node.js / npm**
- **Page Object Model (POM)**
- **Testes End-to-End (E2E)**
- **Testes funcionais**
- **Testes de API**
- **Regressão visual**
- **Testes positivos e negativos**
- **Assertions**
- **Hooks (`beforeEach`)**
- **Cross-browser testing**
- **HTML reports**
- **Screenshots, vídeos e traces em falhas**
- **Documentação de cenários de teste**
- **Rastreabilidade entre cenários e automação**
- **Git e GitHub**

---

## Cobertura atual

Atualmente a suíte possui **30 testes automatizados** distribuídos entre E2E, API e regressão visual.

| Suíte | Quantidade | Cobertura principal |
| --- | ---: | --- |
| E2E | 18 | Login, logout, carrinho, checkout e conclusão de compra |
| API | 8 | GET, POST, PUT, DELETE, autenticação e cenários de erro |
| Visual Regression | 4 | Página de login, formulário, logo e mensagem de erro |
| **Total** | **30** | **Web + API + Visual** |

---

## 📋 Documentação dos testes

Além da automação, os cenários deste projeto foram documentados seguindo uma estrutura de planejamento e execução de testes.

A documentação contém:

- identificação e descrição dos cenários;
- funcionalidade ou componente testado;
- passos para execução;
- resultados esperados;
- status de execução (`OK`, `NOK` ou não executado);
- referência ao arquivo automatizado correspondente;
- consolidação dos resultados;
- área destinada às evidências dos testes.

Os cenários documentados contemplam as três suítes presentes neste repositório:

| Suíte | Cenários documentados |
| --- | ---: |
| E2E | 18 |
| API | 8 |
| Visual Regression | 4 |
| **Total** | **30** |

📄 **[Visualizar documentação completa dos testes no Google Drive](https://drive.google.com/drive/folders/1gu9ojfiwOjIZ4N3kl7n2xpx1iS5twzdx?usp=drive_link)**

> A documentação está disponibilizada em modo de leitura e faz parte das evidências e artefatos de QA deste projeto.

---

## Testes E2E

Os testes E2E utilizam o **SauceDemo** e simulam fluxos reais de utilização da aplicação.

### Login e logout

- Login com usuário e senha inválidos
- Login com usuário válido e senha inválida
- Login com usuário inválido e senha válida
- Login válido
- Logout

### Carrinho

- Adicionar um produto
- Remover um produto
- Adicionar múltiplos produtos
- Validar quantidade de itens no carrinho
- Remover item pela página do carrinho
- Continuar comprando a partir do carrinho
- Prosseguir para o checkout

### Checkout

São validados tanto o fluxo positivo quanto cenários de campos obrigatórios.

- Todos os campos vazios
- Nome vazio
- Sobrenome vazio
- CEP vazio
- Informações válidas
- Avanço para o resumo do pedido
- Finalização da compra

### Conclusão da compra

- Validação da mensagem de pedido concluído
- Retorno à página de produtos após a compra

---

## Page Object Model

A suíte E2E utiliza **Page Object Model** para separar a lógica dos testes dos seletores e ações das páginas.

```text
page-objects/
├── HomePage.ts
├── LoginPage.ts
├── ShoppingPage.ts
├── CartPage.ts
├── CheckoutInformationPage.ts
└── CheckoutCompletePage.ts
```

Cada Page Object concentra responsabilidades relacionadas a uma área específica da aplicação.

Exemplo simplificado:

```ts
export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    await this.page.locator('#user-name').fill(username)
    await this.page.locator('#password').fill(password)
    await this.page.locator('#login-button').click()
  }
}
```

No teste, o fluxo fica mais legível:

```ts
await homePage.visit()
await loginPage.login('standard_user', 'secret_sauce')
```

Essa organização reduz duplicação, centraliza seletores e facilita manutenção quando a interface é alterada.

---

## Testes de API

Os testes de API utilizam o `APIRequestContext` do próprio Playwright e têm como `baseURL`:

```text
https://dummyjson.com
```

### Cenários implementados

1. Validar status `200` em uma requisição válida
2. Validar status `404` para recurso inexistente
3. Buscar detalhes de um usuário com `GET`
4. Criar usuário com `POST`
5. Realizar autenticação válida com `POST`
6. Validar falha de autenticação
7. Atualizar usuário com `PUT`
8. Excluir usuário com `DELETE`

Além do status HTTP, os testes validam propriedades do corpo da resposta.

Exemplo:

```ts
const response = await request.get('/users/1')
const responseBody = await response.json()

expect(response.status()).toBe(200)
expect(responseBody.id).toBe(1)
expect(responseBody.email).toBeTruthy()
```

---

## Regressão visual

A suíte possui testes de regressão visual com `toHaveScreenshot()`.

Atualmente são validados:

- Página completa de login
- Logo da página de login
- Formulário de login
- Mensagem visual de erro de autenticação

Exemplo:

```ts
await expect(page).toHaveScreenshot('login-page.png', {
  fullPage: true,
  animations: 'disabled',
})
```

A configuração permite até **1% de diferença de pixels**:

```ts
expect: {
  toHaveScreenshot: {
    maxDiffPixelRatio: 0.01,
  },
}
```

### Baselines visuais

Na primeira execução, é necessário criar as imagens de referência do ambiente.

Chromium:

```bash
npm run tests:visual:chrome:update
```

Firefox:

```bash
npm run tests:visual:firefox:update
```

WebKit:

```bash
npm run tests:visual:webkit:update
```

Depois que os baselines forem criados, as execuções normais devem ser feitas **sem `update`**, para que alterações inesperadas sejam detectadas.

```bash
npm run tests:visual:chrome
```

> Snapshots visuais podem variar de acordo com sistema operacional, browser e ambiente de execução. Por isso, os baselines devem ser versionados e gerados de forma consistente.

---

## Cross-browser testing

Os testes podem ser executados em três engines suportadas pelo Playwright:

- Chromium
- Firefox
- WebKit

Isso permite verificar se os principais fluxos se comportam corretamente em diferentes mecanismos de renderização.

---

## Estrutura do projeto

```text
qa-playwright-studies/
│
├── page-objects/
│   ├── CartPage.ts
│   ├── CheckoutCompletePage.ts
│   ├── CheckoutInformationPage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── ShoppingPage.ts
│
├── tests/
│   ├── api/
│   │   └── api.spec.ts
│   │
│   ├── e2e/
│   │   ├── e2e-add-remove-cart.spec.ts
│   │   ├── e2e-cart-checkout-remove-shopping.spec.ts
│   │   ├── e2e-checkout-information.spec.ts
│   │   ├── e2e-finished-purchase.spec.ts
│   │   └── e2e-login.spec.ts
│   │
│   └── visual/
│       ├── login-visual.spec.ts
│       └── visual.spec.ts
│
├── api.config.ts
├── e2e.config.ts
├── visual.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

A documentação funcional e os registros dos cenários de teste são mantidos separadamente no Google Drive para consulta.

---

## Configurações das suítes

O projeto mantém configurações separadas para facilitar a execução e a organização dos resultados.

| Arquivo | Responsabilidade |
| --- | --- |
| `e2e.config.ts` | Testes funcionais E2E |
| `api.config.ts` | Testes de API |
| `visual.config.ts` | Testes de regressão visual |
| `playwright.config.ts` | Configuração geral do Playwright |

Os relatórios e resultados também são separados por tipo de teste.

```text
playwright-report/
├── e2e/
├── api/
└── visual/

test-results/
├── e2e/
├── api/
└── visual/
```

---

## Evidências de falha

Nos testes E2E, o projeto está configurado para preservar informações que ajudam na investigação de bugs e falhas de automação:

```ts
video: 'retain-on-failure'
screenshot: 'only-on-failure'
trace: 'retain-on-failure'
```

Esses artefatos permitem analisar o comportamento observado, reproduzir problemas e identificar em qual etapa o cenário falhou.

### Evidências disponíveis

Dependendo do tipo de falha ou execução, o projeto pode gerar:

- screenshots;
- vídeos;
- traces do Playwright;
- screenshots de comparação visual;
- HTML Reports;
- resultados individuais das suítes.

---

## Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js
- npm
- Git

Para verificar:

```bash
node --version
npm --version
git --version
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/markusfrutuoso/qa-playwright-studies.git
```

Entre na pasta:

```bash
cd qa-playwright-studies
```

Instale as dependências:

```bash
npm install
```

Instale os browsers utilizados pelo Playwright:

```bash
npm run setup:browsers
```

---

## Como executar os testes

### 1. API

```bash
npm run tests:api
```

### 2. E2E no Chromium

```bash
npm run tests:e2e
```

### 3. E2E cross-browser

```bash
npm run tests:e2e:all
```

### 4. Regressão visual no Chromium

```bash
npm run tests:visual:chrome
```

### 5. Regressão visual em todos os browsers

```bash
npm run tests:visual:all
```

### 6. Executar todas as suítes

```bash
npm run tests:all
```

---

## Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run setup:browsers` | Instala os browsers do Playwright |
| `npm run tests:e2e` | Executa E2E no Chromium |
| `npm run tests:e2e:all` | Executa E2E em Chromium, Firefox e WebKit |
| `npm run tests:api` | Executa testes de API |
| `npm run tests:visual:chrome` | Executa regressão visual no Chromium |
| `npm run tests:visual:firefox` | Executa regressão visual no Firefox |
| `npm run tests:visual:webkit` | Executa regressão visual no WebKit |
| `npm run tests:visual:all` | Executa regressão visual nos três browsers |
| `npm run tests:visual:chrome:update` | Atualiza baselines do Chromium |
| `npm run tests:visual:firefox:update` | Atualiza baselines do Firefox |
| `npm run tests:visual:webkit:update` | Atualiza baselines do WebKit |
| `npm run tests:all` | Executa E2E, API e Visual |

---

## Relatórios

As suítes utilizam o HTML Reporter do Playwright.

Depois de uma execução, o relatório pode ser aberto informando a pasta correspondente.

### E2E

```bash
npx playwright show-report playwright-report/e2e
```

### API

```bash
npx playwright show-report playwright-report/api
```

### Visual

```bash
npx playwright show-report playwright-report/visual
```

Os relatórios permitem analisar status, duração e evidências relacionadas às execuções.

---

## Estratégia de qualidade aplicada

O projeto busca ir além de simplesmente automatizar cliques. Os cenários foram organizados pensando em diferentes aspectos de qualidade.

### Cenários positivos

Validam o comportamento esperado da aplicação, como login válido, adição de produtos e finalização de uma compra.

### Cenários negativos

Validam como o sistema reage a entradas inválidas, como credenciais incorretas, campos obrigatórios vazios e recursos inexistentes na API.

### Assertions

Cada cenário possui validações explícitas de estado, conteúdo, URL, quantidade de elementos ou resposta HTTP.

### Reutilização

A utilização de Page Objects evita duplicação e mantém ações recorrentes em um único local.

### Evidências

Screenshots, vídeos, traces e relatórios HTML ajudam na investigação quando um teste falha.

### Compatibilidade

A execução em Chromium, Firefox e WebKit amplia a cobertura de compatibilidade entre browsers.

### Documentação

Os cenários automatizados também possuem documentação estruturada, facilitando a compreensão do objetivo, passos e resultados esperados de cada teste.

### Rastreabilidade

A documentação relaciona os cenários de teste aos respectivos arquivos automatizados, permitindo acompanhar a correspondência entre planejamento e implementação.

---

## Boas práticas exercitadas

- Separação entre testes e Page Objects
- Seletores centralizados
- Métodos reutilizáveis
- Preparação de cenários com `beforeEach`
- Assertions explícitas
- Separação das suítes E2E, API e Visual
- Configurações específicas por tipo de teste
- Cobertura de happy path e cenários negativos
- Coleta de evidências em falhas
- Nomenclatura descritiva de cenários
- Execução cross-browser
- Documentação estruturada dos cenários de teste
- Rastreabilidade entre documentação e testes automatizados
- Versionamento com Git

---

## Aprendizados

Este projeto tem sido utilizado para consolidar conhecimentos de QA e automação, principalmente em:

- transformação de cenários de negócio em testes automatizados;
- identificação de fluxos críticos e casos negativos;
- organização de uma suíte escalável com POM;
- escolha de assertions que realmente comprovem o resultado esperado;
- validação de aplicações tanto pela interface quanto pela API;
- investigação de falhas utilizando traces, screenshots, vídeos e relatórios;
- entendimento das particularidades de testes visuais e criação de baselines;
- documentação e organização estruturada de cenários de teste;
- rastreabilidade entre documentação e automação;
- adaptação de cenários quando o ambiente originalmente utilizado para estudo não está disponível.

---

## Em estudo / próximos passos

O repositório continuará evoluindo conforme os estudos de Quality Assurance e Playwright avançarem.

- [ ] Integração com GitHub Actions para execução em CI
- [ ] Fixtures e gerenciamento de massa de testes
- [ ] Variáveis de ambiente para dados e configurações
- [ ] Novos testes de API e validações de contrato/schema
- [ ] Testes de acessibilidade
- [ ] Interceptação e mocking de requisições de rede
- [x] Documentação dos cenários de teste e resultados de execução
- [ ] Checklists de regressão manual
- [ ] Exemplos de registro e documentação de bugs
- [ ] Estudos de automação de testes utilizando IA
- [ ] Exploração de MCP aplicado ao fluxo de QA e Playwright

---

## Contexto de aprendizado

Parte dos conceitos praticados neste projeto está sendo aprofundada no curso:

**Playwright Automation Testing 2026: TypeScript, AI & MCP — Kaniel Outis (Udemy)**

O código deste repositório é utilizado como prática para adaptar, implementar e consolidar os conceitos estudados em diferentes aplicações e cenários.

---

## Autor

**Markus Frutuoso**

- GitHub: [github.com/markusfrutuoso](https://github.com/markusfrutuoso)
- LinkedIn: [linkedin.com/in/markusfrutuoso](https://linkedin.com/in/markusfrutuoso)

---

## Observação

Este projeto possui finalidade educacional e de portfólio, com foco no desenvolvimento de habilidades em **Quality Assurance, automação de testes, documentação de QA e engenharia de software**.
