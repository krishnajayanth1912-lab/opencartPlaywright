import {test, expect} from '@playwright/test'

import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { ProductPage } from '../pages/ProductPage'


let config : TestConfig
let homepage : HomePage
let searchpage : SearchResultsPage


test.beforeEach('', async({page})=>{
    config = new TestConfig()
    await page.goto(config.appUrl)
    
    homepage = new HomePage(page)
    searchpage = new SearchResultsPage(page)
    

})

test.afterEach('', async({page})=>{
    await page.waitForTimeout(4000)
    await page.close()
})

test('Add product to cart', async()=>{

    await homepage.enterProductName(config.productName)
    await homepage.clickSearch()

    expect(await searchpage.isSearchResultsPageExists(config.productName)).toBeTruthy()
    
    const prodcount = await searchpage.getProductCount()
    console.log(`No.of products returned are: ${prodcount}`)
    
    const prodexist = await searchpage.isProductExist(config.productName)
    expect(prodexist).toBe(true)

    const prodpage = await searchpage.selectProduct(config.productName)
    await prodpage?.setQuantity(config.productQuantity)
    await prodpage?.addToCart()
    const confirmmsg = await prodpage?.isConfirmationMessageVisible()
    expect(await prodpage?.isConfirmationMessageVisible()).toEqual(confirmmsg)

    await prodpage?.clickItemsToNavigateToCart()
    const cartpage = await prodpage?.clickViewCart()
    expect(cartpage?.isPageLoaded()).toBeTruthy()
})

