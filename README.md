# QA Playwright Studies

Projeto de estudos com Playwright e TypeScript cobrindo testes E2E, API e regressão visual.

## Instalação

```bash
npm install
npm run setup:browsers
```

## Testes E2E

```bash
npm run tests:e2e
npm run tests:e2e:all
```

`tests:e2e` executa os testes E2E no Chromium. `tests:e2e:all` executa Chromium, Firefox e WebKit.

## Testes de API

```bash
npm run tests:api
```

Os testes usam `https://dummyjson.com` e cobrem status HTTP, endpoint inválido, GET, POST, autenticação positiva/negativa, PUT e DELETE.

## Testes de regressão visual

```bash
npm run tests:visual:chrome
npm run tests:visual:firefox
npm run tests:visual:webkit
npm run tests:visual:all
```

A configuração visual usa `updateSnapshots: 'missing'`. Assim, a primeira execução cria automaticamente os snapshots que ainda não existem. Nas execuções seguintes, os screenshots são comparados com esses baselines.

Para atualizar intencionalmente os baselines:

```bash
npm run tests:visual:chrome:update
npm run tests:visual:firefox:update
npm run tests:visual:webkit:update
```

Os snapshots são específicos por navegador/projeto. É recomendável gerar e versionar os baselines no mesmo sistema operacional usado normalmente para executar a suíte.

## Executar tudo

```bash
npm run tests:all
```

## Estrutura

```text
page-objects/
  CartPage.ts
  CheckoutCompletePage.ts
  CheckoutInformationPage.ts
  HomePage.ts
  LoginPage.ts
  ShoppingPage.ts

tests/
  api/
  e2e/
  visual/

api.config.ts
e2e.config.ts
visual.config.ts
playwright.config.ts
```
