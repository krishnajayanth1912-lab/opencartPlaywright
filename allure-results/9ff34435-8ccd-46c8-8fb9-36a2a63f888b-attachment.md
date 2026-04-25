# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productpage.spec.ts >> Add product to cart
- Location: tests\productpage.spec.ts:28:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Success: You have added MacBook to your shopping cart!
+ ×
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
  16 |     await page.goto(config.appUrl)
  17 |     
  18 |     homepage = new HomePage(page)
  19 |     searchpage = new SearchResultsPage(page)
  20 |     
  21 | 
  22 | })
  23 | 
  24 | test.afterEach('', async({page})=>{
  25 |     await page.close()
  26 | })
  27 | 
  28 | test('Add product to cart', async()=>{
  29 | 
  30 |     await homepage.enterProductName(config.productName)
  31 |     await homepage.clickSearch()
  32 | 
  33 |     expect(await searchpage.isSearchResultsPageExists(config.productName)).toBeTruthy()
  34 |     
  35 |     const prodcount = await searchpage.getProductCount()
  36 |     console.log(`No.of products returned are: ${prodcount}`)
  37 |     
  38 |     const prodexist = await searchpage.isProductExist(config.productName)
  39 |     expect(prodexist).toBe(true)
  40 | 
  41 |     const prodpage = await searchpage.selectProduct(config.productName)
  42 |     await prodpage?.setQuantity(config.productQuantity)
  43 |     await prodpage?.addToCart()
> 44 |     expect(await prodpage?.isConfirmationMessageVisible()).toEqual(`Success: You have added ${config.productName} to your shopping cart!`)
     |                                                            ^ Error: expect(received).toEqual(expected) // deep equality
  45 | 
  46 |     await prodpage?.clickItemsToNavigateToCart()
  47 |     const cartpage = await prodpage?.clickViewCart()
  48 |     expect(cartpage?.isPageLoaded()).toBeTruthy()
  49 | })
  50 | 
  51 | 
```