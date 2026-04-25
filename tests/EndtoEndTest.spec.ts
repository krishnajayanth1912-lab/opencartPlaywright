import {test, expect, Page} from '@playwright/test'

// import all the page objects

import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/registerpage';
import { Randomdata } from '../utils/datagenerator';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/loginpage';
import { AccountPage } from '../pages/accountpage';
import {CheckoutPage} from '../pages/CheckoutPage'
import {SearchResultsPage} from '../pages/SearchResultsPage'
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { LogoutPage } from '../pages/LogoutPage';
import { ProductPage } from '../pages/ProductPage';
import { tr } from '@faker-js/faker';

// This is the main test block that runs the entire flow
test('execute end-to-end test flow', async({page})=>{

    const config = new TestConfig()
    await page.goto(config.appUrl)                  // Open the URL

    //Step 1: register
    const register_email:string = await performRegistration(page)
    console.log(" ✅ Registration is successfull......!!")

    //Step 2: Logout
    await logoutafterregister(page)
    console.log(" ✅Logout is successfull......!!")

    //Step 3: Login with register user
    await performLogin(page, register_email)
    console.log("✅Login is successfull......!!")

    //Step 4: Select product
    await performSearchofProductandaddingtocart(page)
    console.log("✅ Product selected successfully......!!")

    //Step 5: Verfiy Cart Products
    await Verifycartcontents(page)
    console.log("✅Price is verified.......!!")

})



async function performRegistration(page:Page){


    const homepage = new HomePage(page)
    expect(await homepage.isHomePageExists()).toBeTruthy()

    await homepage.clickMyAccount()
    await homepage.clickRegister()

    const regpage = new RegistrationPage(page)
    await regpage.setFirstName(Randomdata.getfirstname())
    await regpage.setLastName(Randomdata.getlastname())
    const email = Randomdata.getemail()
    await regpage.setEmail(email)
    await regpage.setTelephone(Randomdata.getphonenumber())
    
    await regpage.setPassword('test@123')
    await regpage.setConfirmPassword('test@123')

    await regpage.setPrivacyPolicy()
    await regpage.clickContinue()

    const confmsg = await regpage.getConfirmationMsg()
    console.log(confmsg)

    await regpage.clickoncontinueuponregister()           // this will make the user to login in directly
    // expect(await accountpage.Ismyaccountexists()).toBe(true)

    return email
}

async function logoutafterregister(page:Page){
    

    const accountpage = new AccountPage(page)   

    if(await accountpage.Ismyaccountexists())
    {
        await accountpage.clickonlogoutlink()
    }

    const logoutpage = new LogoutPage(page)
    if (await logoutpage.isContinueButtonVisible())
    {
        await logoutpage.clickContinue()
    }
    
}
async function performLogin(page:Page, email:string){

    const homepage = new HomePage(page)
    await homepage.clickMyAccount()
    const loginpage: LoginPage = await homepage.clickLogin()
    const accountpage: AccountPage = await loginpage.performlogin(email, 'test@123')
    expect(await accountpage.Ismyaccountexists()).toBeTruthy()

}

async function performSearchofProductandaddingtocart(page:Page){

    const homepage = new HomePage(page)
    const config = new TestConfig()
    await homepage.enterProductName(config.productName)
    const searchreult = await homepage.clickSearch()
    expect(await searchreult.isSearchResultsPageExists(config.productName)).toBe(true)

    await searchreult.getProductCount()
    await searchreult.isProductExist(config.productName)
    const prodpage = await searchreult.selectProduct(config.productName)

    // Adding to cart
    await prodpage?.addProductToCartflow(config.productQuantity)
    const confirmmsg = await prodpage?.isConfirmationMessageVisible()
    console.log(confirmmsg)

    

}

async function Verifycartcontents(page: Page){

    const prodpage = new ProductPage(page)
    await prodpage.clickItemsToNavigateToCart()
    const shoppingcart: ShoppingCartPage = await prodpage.clickViewCart()

    await shoppingcart.isPageLoaded()

    const config = new TestConfig()
    expect(await shoppingcart.getTotalPrice()).toBe(config.totalPrice)
}

