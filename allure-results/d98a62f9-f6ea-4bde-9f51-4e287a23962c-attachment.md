# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: searchproduct.spec.ts >> Search products with product name
- Location: tests\searchproduct.spec.ts:27:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
Call log:
  - navigating to "http://localhost/opencart/upload/", waiting until "load"

```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test'
  2  | 
  3  | import { TestConfig } from '../test.config'
  4  | import { HomePage } from '../pages/HomePage'
  5  | import { SearchResultsPage } from '../pages/SearchResultsPage'
  6  | 
  7  | // Global variable declaration
  8  | let config : TestConfig
  9  | let homepage : HomePage
  10 | let searchpage : SearchResultsPage
  11 | 
  12 | //Playwright start hook
  13 | test.beforeEach(async({page})=>{
  14 |     config = new TestConfig()
> 15 |     await page.goto(config.appUrl)
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
  16 | 
  17 |     homepage = new HomePage(page)
  18 |     searchpage = new SearchResultsPage(page)
  19 | 
  20 | })
  21 | 
  22 | //Playwright end hooks
  23 | test.afterEach(async({page})=>{
  24 |     await page.close()
  25 | })
  26 | 
  27 | test('Search products with product name', async()=>{
  28 | 
  29 |     await homepage.enterProductName(config.productName)
  30 |     await homepage.clickSearch()
  31 | 
  32 |     expect(await searchpage.isSearchResultsPageExists(config.productName)).toBeTruthy()
  33 | 
  34 |     const prodcount = await searchpage.getProductCount()
  35 |     console.log(`No.of products returned are: ${prodcount}`)
  36 | 
  37 |     const prodexist = await searchpage.isProductExist(config.productName)
  38 |     expect(prodexist).toBe(true)
  39 | })
```