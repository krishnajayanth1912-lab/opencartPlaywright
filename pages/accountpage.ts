import { th } from "@faker-js/faker";
import { Page, Locator } from "@playwright/test";
import { LogoutPage } from "../pages/LogoutPage";

export class AccountPage{

    private readonly page:Page
    private readonly Accounttext : Locator
    private readonly logoutlink : Locator;

    constructor(page:Page){
        this.page = page
        this.Accounttext = page.locator("h2:has-text('My Account')")
        this.logoutlink = page.locator("a:has-text('Logout')").nth(1)

    }

    async Ismyaccountexists(){
       const isvisible = await this.Accounttext.isVisible()
       return isvisible
    }

    async clickonlogoutlink(){
        await this.logoutlink.click()
        return new LogoutPage(this.page)
    }
    
}