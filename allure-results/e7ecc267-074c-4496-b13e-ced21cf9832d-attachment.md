# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AccountRegistration.spec.ts >> Login into Account  @master @regression
- Location: tests\AccountRegistration.spec.ts:76:5

# Error details

```
Error: page.goto: net::ERR_ABORTED at http://localhost/opencart/upload/
Call log:
  - navigating to "http://localhost/opencart/upload/", waiting until "load"

```

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Account Registration
  3  |  * 
  4  |  * Tags: @master @sanity @regression
  5  |  * 
  6  |  * Steps:
  7  |  * 1) Navigate to application URL 
  8  |  * 2) Go to 'My Account' and click 'Register'
  9  |  * 3) Fill in registration details with random data
  10 |  * 4) Agree to Privacy Policy and submit the form
  11 |  * 5) Validate the confirmation message
  12 |  */
  13 | 
  14 | import { test, expect } from '@playwright/test';
  15 | import { HomePage } from '../pages/HomePage';
  16 | import { RegistrationPage } from '../pages/registerpage';
  17 | import { Randomdata } from '../utils/datagenerator';
  18 | import { TestConfig } from '../test.config';
  19 | import { LoginPage } from '../pages/loginpage';
  20 | import { AccountPage } from '../pages/accountpage';
  21 | 
  22 | // Declaring the object as Global variables to access in all tests
  23 | let config : TestConfig
  24 | let homepage : HomePage
  25 | let registrationPage : RegistrationPage
  26 | let loginpage : LoginPage
  27 | let accountpage : AccountPage
  28 | 
  29 | 
  30 | test.beforeEach(async ({page})=>{
  31 |     //open url
  32 |     config = new TestConfig()
  33 |     await page.goto(config.appUrl)
  34 | 
  35 |     homepage = new HomePage(page)
  36 |     registrationPage = new RegistrationPage(page)
  37 |     loginpage = new LoginPage(page)
  38 |     accountpage = new AccountPage(page)
  39 | })
  40 | 
  41 | test.afterEach(async ({page})=>{
> 42 |     await page.waitForTimeout(5000)
     |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  43 |     await page.close()
  44 | })
  45 | 
  46 | test('User registration test  @master @sanity @regression', async () => {
  47 | 
  48 | 
  49 |     //Go to 'My Account' and click 'Register'
  50 |     
  51 |     await homepage.clickMyAccount();
  52 |     await homepage.clickRegister();
  53 | 
  54 |     //Fill in registration details with random data
  55 |     
  56 |     await registrationPage.setFirstName(Randomdata.getfirstname());
  57 |     await registrationPage.setLastName(Randomdata.getlastname());
  58 |     await registrationPage.setEmail(Randomdata.getemail());
  59 |     await registrationPage.setTelephone(Randomdata.getphonenumber());
  60 | 
  61 |     const password = Randomdata.getpassword();
  62 |     await registrationPage.setPassword(password);
  63 |     await registrationPage.setConfirmPassword(password);
  64 | 
  65 |     await registrationPage.setPrivacyPolicy();
  66 |     await registrationPage.clickContinue();
  67 | 
  68 |     //Validate the confirmation message
  69 | 
  70 |     const confirmationMsg = await registrationPage.getConfirmationMsg();
  71 |     expect(confirmationMsg).toContain('Your Account Has Been Created!')
  72 | 
  73 | 
  74 | })
  75 | 
  76 | test('Login into Account  @master @regression', async()=>{
  77 | 
  78 |     // Going to homepage and clicking on Account link and then selecting the login option
  79 |     await homepage.clickMyAccount()
  80 |     await homepage.clickLogin()
  81 | 
  82 |     // Performing the login with valid creds
  83 |     await loginpage.performlogin(config.email, config.password)
  84 | 
  85 |     // Verifying whether the MyAccount is visible
  86 |     const IsloggedIn = await accountpage.Ismyaccountexists()
  87 |     await expect(IsloggedIn).toBe(true)
  88 | 
  89 | })
  90 | 
  91 | 
```