import {test, expect} from '@playwright/test'

import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/registerpage';
import { Randomdata } from '../utils/datagenerator';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/loginpage';
import { AccountPage } from '../pages/accountpage';
import {DataProvider} from '../utils/dataprovider'


// load JSON data from dataprovider.ts
const jsonpath = "Data/logindata.json"
const jsontestdata = DataProvider.gettestdatafromjson(jsonpath)

// Declaring the object as Global variables to access in all tests
let config : TestConfig
let homepage : HomePage
let loginpage : LoginPage
let accountpage : AccountPage


for (const data of jsontestdata){
    test(`login with JSON Data: ${data.testName} @datadriven`, async({page})=>{

        config = new TestConfig()
        await page.goto(config.appUrl)

        homepage = new HomePage(page)
        await homepage.clickMyAccount()
        await homepage.clickLogin()

        loginpage = new LoginPage(page)
        await loginpage.performlogin(data.email, data.password)

        if(data.expected.toLowerCase() === "success"){
            accountpage = new AccountPage(page)
            const IsloggedIn = await accountpage.Ismyaccountexists()
            expect(IsloggedIn).toBe(true)
        }else{
            const errormsg = await loginpage.verifyerrorlogin()
            console.log(errormsg)
        }

    })

}


