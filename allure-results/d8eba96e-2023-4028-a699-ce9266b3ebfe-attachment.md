# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginDataDriven.spec.ts >> login with JSON Data: Valid login @datadriven
- Location: tests\loginDataDriven.spec.ts:24:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost/opencart/upload/", waiting until "load"

```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test'
  2  | 
  3  | import { HomePage } from '../pages/HomePage';
  4  | import { RegistrationPage } from '../pages/registerpage';
  5  | import { Randomdata } from '../utils/datagenerator';
  6  | import { TestConfig } from '../test.config';
  7  | import { LoginPage } from '../pages/loginpage';
  8  | import { AccountPage } from '../pages/accountpage';
  9  | import {DataProvider} from '../utils/dataprovider'
  10 | 
  11 | 
  12 | // load JSON data from dataprovider.ts
  13 | const jsonpath = "Data/logindata.json"
  14 | const jsontestdata = DataProvider.gettestdatafromjson(jsonpath)
  15 | 
  16 | // Declaring the object as Global variables to access in all tests
  17 | let config : TestConfig
  18 | let homepage : HomePage
  19 | let loginpage : LoginPage
  20 | let accountpage : AccountPage
  21 | 
  22 | 
  23 | for (const data of jsontestdata){
  24 |     test(`login with JSON Data: ${data.testName} @datadriven`, async({page})=>{
  25 | 
  26 |         config = new TestConfig()
> 27 |         await page.goto(config.appUrl)
     |                    ^ Error: page.goto: Target page, context or browser has been closed
  28 | 
  29 |         homepage = new HomePage(page)
  30 |         await homepage.clickMyAccount()
  31 |         await homepage.clickLogin()
  32 | 
  33 |         loginpage = new LoginPage(page)
  34 |         await loginpage.performlogin(data.email, data.password)
  35 | 
  36 |         if(data.expected.toLowerCase() === "success"){
  37 |             accountpage = new AccountPage(page)
  38 |             const IsloggedIn = await accountpage.Ismyaccountexists()
  39 |             expect(IsloggedIn).toBe(true)
  40 |         }else{
  41 |             const errormsg = await loginpage.verifyerrorlogin()
  42 |             console.log(errormsg)
  43 |         }
  44 | 
  45 |     })
  46 | 
  47 | }
  48 | 
  49 | 
  50 | 
```