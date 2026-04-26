# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndtoEndTest.spec.ts >> execute end-to-end test flow
- Location: tests\EndtoEndTest.spec.ts:19:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
Call log:
  - navigating to "http://localhost/opencart/upload/", waiting until "load"

```

# Test source

```ts
  1   | import {test, expect, Page} from '@playwright/test'
  2   | 
  3   | // import all the page objects
  4   | 
  5   | import { HomePage } from '../pages/HomePage';
  6   | import { RegistrationPage } from '../pages/registerpage';
  7   | import { Randomdata } from '../utils/datagenerator';
  8   | import { TestConfig } from '../test.config';
  9   | import { LoginPage } from '../pages/loginpage';
  10  | import { AccountPage } from '../pages/accountpage';
  11  | import {CheckoutPage} from '../pages/CheckoutPage'
  12  | import {SearchResultsPage} from '../pages/SearchResultsPage'
  13  | import { ShoppingCartPage } from '../pages/ShoppingCartPage';
  14  | import { LogoutPage } from '../pages/LogoutPage';
  15  | import { ProductPage } from '../pages/ProductPage';
  16  | import { tr } from '@faker-js/faker';
  17  | 
  18  | // This is the main test block that runs the entire flow
  19  | test('execute end-to-end test flow', async({page})=>{
  20  | 
  21  |     const config = new TestConfig()
> 22  |     await page.goto(config.appUrl)                  // Open the URL
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
  23  | 
  24  |     //Step 1: register
  25  |     const register_email:string = await performRegistration(page)
  26  |     console.log(" ✅ Registration is successfull......!!")
  27  | 
  28  |     //Step 2: Logout
  29  |     await logoutafterregister(page)
  30  |     console.log(" ✅Logout is successfull......!!")
  31  | 
  32  |     //Step 3: Login with register user
  33  |     await performLogin(page, register_email)
  34  |     console.log("✅Login is successfull......!!")
  35  | 
  36  |     //Step 4: Select product
  37  |     await performSearchofProductandaddingtocart(page)
  38  |     console.log("✅ Product selected successfully......!!")
  39  | 
  40  |     //Step 5: Verfiy Cart Products
  41  |     await Verifycartcontents(page)
  42  |     console.log("✅Price is verified.......!!")
  43  | 
  44  | })
  45  | 
  46  | 
  47  | 
  48  | async function performRegistration(page:Page){
  49  | 
  50  | 
  51  |     const homepage = new HomePage(page)
  52  |     expect(await homepage.isHomePageExists()).toBeTruthy()
  53  | 
  54  |     await homepage.clickMyAccount()
  55  |     await homepage.clickRegister()
  56  | 
  57  |     const regpage = new RegistrationPage(page)
  58  |     await regpage.setFirstName(Randomdata.getfirstname())
  59  |     await regpage.setLastName(Randomdata.getlastname())
  60  |     const email = Randomdata.getemail()
  61  |     await regpage.setEmail(email)
  62  |     await regpage.setTelephone(Randomdata.getphonenumber())
  63  |     
  64  |     await regpage.setPassword('test@123')
  65  |     await regpage.setConfirmPassword('test@123')
  66  | 
  67  |     await regpage.setPrivacyPolicy()
  68  |     await regpage.clickContinue()
  69  | 
  70  |     const confmsg = await regpage.getConfirmationMsg()
  71  |     console.log(confmsg)
  72  | 
  73  |     await regpage.clickoncontinueuponregister()           // this will make the user to login in directly
  74  |     // expect(await accountpage.Ismyaccountexists()).toBe(true)
  75  | 
  76  |     return email
  77  | }
  78  | 
  79  | async function logoutafterregister(page:Page){
  80  |     
  81  | 
  82  |     const accountpage = new AccountPage(page)   
  83  | 
  84  |     if(await accountpage.Ismyaccountexists())
  85  |     {
  86  |         await accountpage.clickonlogoutlink()
  87  |     }
  88  | 
  89  |     const logoutpage = new LogoutPage(page)
  90  |     if (await logoutpage.isContinueButtonVisible())
  91  |     {
  92  |         await logoutpage.clickContinue()
  93  |     }
  94  |     
  95  | }
  96  | async function performLogin(page:Page, email:string){
  97  | 
  98  |     const homepage = new HomePage(page)
  99  |     await homepage.clickMyAccount()
  100 |     const loginpage: LoginPage = await homepage.clickLogin()
  101 |     const accountpage: AccountPage = await loginpage.performlogin(email, 'test@123')
  102 |     expect(await accountpage.Ismyaccountexists()).toBeTruthy()
  103 | 
  104 | }
  105 | 
  106 | async function performSearchofProductandaddingtocart(page:Page){
  107 | 
  108 |     const homepage = new HomePage(page)
  109 |     const config = new TestConfig()
  110 |     await homepage.enterProductName(config.productName)
  111 |     const searchreult = await homepage.clickSearch()
  112 |     expect(await searchreult.isSearchResultsPageExists(config.productName)).toBe(true)
  113 | 
  114 |     await searchreult.getProductCount()
  115 |     await searchreult.isProductExist(config.productName)
  116 |     const prodpage = await searchreult.selectProduct(config.productName)
  117 | 
  118 |     // Adding to cart
  119 |     await prodpage?.addProductToCartflow(config.productQuantity)
  120 |     const confirmmsg = await prodpage?.isConfirmationMessageVisible()
  121 |     console.log(confirmmsg)
  122 | 
```