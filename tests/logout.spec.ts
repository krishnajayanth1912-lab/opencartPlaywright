import {test, expect} from '@playwright/test'

import { HomePage } from '../pages/HomePage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/loginpage';
import { AccountPage } from '../pages/accountpage';

let config : TestConfig
let homepage : HomePage
let loginpage : LoginPage
let accountpage : AccountPage

test.beforeEach(async ({page})=>{
    //open url
    config = new TestConfig()
    await page.goto(config.appUrl)

    homepage = new HomePage(page)
    loginpage = new LoginPage(page)
    accountpage = new AccountPage(page)
})

test ('Do Login', async()=>{

    await homepage.clickMyAccount()
    await homepage.clickLogin()

    await loginpage.performlogin(config.email, config.password)

    expect(await accountpage.Ismyaccountexists()).toBeTruthy()

    const logoutpage = await accountpage.clickonlogoutlink()

    expect (await logoutpage.isContinueButtonVisible()).toBe(true)

    homepage = await logoutpage.clickContinue()

    expect(await homepage.isHomePageExists()).toBe(true)

})

