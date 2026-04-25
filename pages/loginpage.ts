import { th } from '@faker-js/faker';
import { Page, Locator, expect } from '@playwright/test';
import { AccountPage } from './accountpage';

export class LoginPage {

    private readonly page:Page
    private readonly loginemail : Locator
    private readonly loginpassword : Locator
    private readonly loginbutton : Locator
    private readonly loginerror : Locator

    constructor(page:Page){
        this.page = page
        this.loginemail = page.getByPlaceholder('E-Mail Address')
        this.loginpassword = page.getByPlaceholder('Password')
        this.loginbutton = page.locator("input[type='submit']")
        this.loginerror = page.locator('.alert-dismissible')
    }

    async performlogin(email:string, password: string){
        await this.loginemail.fill(email)
        await this.loginpassword.fill(password)
        await this.loginbutton.click()
        return new AccountPage(this.page)
    }

    async verifyerrorlogin(){
        this.loginerror.isVisible()
        return(await this.loginerror.textContent())
    }
}