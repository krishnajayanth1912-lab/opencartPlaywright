/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/registerpage';
import { Randomdata } from '../utils/datagenerator';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/loginpage';
import { AccountPage } from '../pages/accountpage';

// Declaring the object as Global variables to access in all tests
let config : TestConfig
let homepage : HomePage
let registrationPage : RegistrationPage
let loginpage : LoginPage
let accountpage : AccountPage


test.beforeEach(async ({page})=>{
    //open url
    config = new TestConfig()
    await page.goto(config.appUrl)

    homepage = new HomePage(page)
    registrationPage = new RegistrationPage(page)
    loginpage = new LoginPage(page)
    accountpage = new AccountPage(page)
})

test.afterEach(async ({page})=>{
    await page.waitForTimeout(5000)
    await page.close()
})

test('User registration test  @master @sanity @regression', async () => {


    //Go to 'My Account' and click 'Register'
    
    await homepage.clickMyAccount();
    await homepage.clickRegister();

    //Fill in registration details with random data
    
    await registrationPage.setFirstName(Randomdata.getfirstname());
    await registrationPage.setLastName(Randomdata.getlastname());
    await registrationPage.setEmail(Randomdata.getemail());
    await registrationPage.setTelephone(Randomdata.getphonenumber());

    const password = Randomdata.getpassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation message

    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!')


})

test('Login into Account  @master @regression', async()=>{

    // Going to homepage and clicking on Account link and then selecting the login option
    await homepage.clickMyAccount()
    await homepage.clickLogin()

    // Performing the login with valid creds
    await loginpage.performlogin(config.email, config.password)

    // Verifying whether the MyAccount is visible
    const IsloggedIn = await accountpage.Ismyaccountexists()
    expect(IsloggedIn).toBe(true)

})

