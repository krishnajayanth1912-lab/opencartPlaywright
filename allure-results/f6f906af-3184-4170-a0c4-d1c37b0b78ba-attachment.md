# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productpage.spec.ts >> Add product to cart
- Location: tests\productpage.spec.ts:29:5

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
  6  | import { ProductPage } from '../pages/ProductPage'
  7  | 
  8  | 
  9  | let config : TestConfig
  10 | let homepage : HomePage
  11 | let searchpage : SearchResultsPage
  12 | 
  13 | 
  14 | test.beforeEach('', async({page})=>{
  15 |     config = new TestConfig()
> 16 |     await page.goto(config.appUrl)
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
  17 |     
  18 |     homepage = new HomePage(page)
  19 |     searchpage = new SearchResultsPage(page)
  20 |     
  21 | 
  22 | })
  23 | 
  24 | test.afterEach('', async({page})=>{
  25 |     await page.waitForTimeout(4000)
  26 |     await page.close()
  27 | })
  28 | 
  29 | test('Add product to cart', async()=>{
  30 | 
  31 |     await homepage.enterProductName(config.productName)
  32 |     await homepage.clickSearch()
  33 | 
  34 |     expect(await searchpage.isSearchResultsPageExists(config.productName)).toBeTruthy()
  35 |     
  36 |     const prodcount = await searchpage.getProductCount()
  37 |     console.log(`No.of products returned are: ${prodcount}`)
  38 |     
  39 |     const prodexist = await searchpage.isProductExist(config.productName)
  40 |     expect(prodexist).toBe(true)
  41 | 
  42 |     const prodpage = await searchpage.selectProduct(config.productName)
  43 |     await prodpage?.setQuantity(config.productQuantity)
  44 |     await prodpage?.addToCart()
  45 |     const confirmmsg = await prodpage?.isConfirmationMessageVisible()
  46 |     expect(await prodpage?.isConfirmationMessageVisible()).toEqual(confirmmsg)
  47 | 
  48 |     await prodpage?.clickItemsToNavigateToCart()
  49 |     const cartpage = await prodpage?.clickViewCart()
  50 |     expect(cartpage?.isPageLoaded()).toBeTruthy()
  51 | })
  52 | 
  53 | 
```