import {test, expect} from '@playwright/test'

import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { SearchResultsPage } from '../pages/SearchResultsPage'

// Global variable declaration
let config : TestConfig
let homepage : HomePage
let searchpage : SearchResultsPage

//Playwright start hook
test.beforeEach(async({page})=>{
    config = new TestConfig()
    await page.goto(config.appUrl)

    homepage = new HomePage(page)
    searchpage = new SearchResultsPage(page)

})

//Playwright end hooks
test.afterEach(async({page})=>{
    await page.close()
})

test('Search products with product name', async()=>{

    await homepage.enterProductName(config.productName)
    await homepage.clickSearch()

    expect(await searchpage.isSearchResultsPageExists(config.productName)).toBeTruthy()

    const prodcount = await searchpage.getProductCount()
    console.log(`No.of products returned are: ${prodcount}`)

    const prodexist = await searchpage.isProductExist(config.productName)
    expect(prodexist).toBe(true)
})