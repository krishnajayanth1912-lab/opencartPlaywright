import { Page, Locator, expect } from '@playwright/test';
import { AccountPage } from './accountpage';

export class RegistrationPage {
    private readonly page: Page;
    
    // Locators using CSS selectors
    private readonly txtFirstname: Locator;
    private readonly txtLastname: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkdPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;
    private readonly continueafterregister : Locator

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.txtFirstname = page.getByPlaceholder('First Name')
        this.txtLastname = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword = page.locator('#input-confirm');
        this.chkdPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[value="Continue"]');
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
        this.continueafterregister = page.locator('a:has-text("Continue")')
    }

    
    async setFirstName(fname: string) {
        await this.txtFirstname.fill(fname) 
    
    }

    
    async setLastName(lname: string) {
        await this.txtLastname.fill(lname);
    }

    
    async setEmail(email: string) {
        await this.txtEmail.fill(email);
    }

    async setTelephone(tel: string) {
        await this.txtTelephone.fill(tel);
    }

   
    async setPassword(pwd: string) {
        await this.txtPassword.fill(pwd);
    }

    
    async setConfirmPassword(pwd: string) {
        await this.txtConfirmPassword.fill(pwd);
    }

    async setPrivacyPolicy() {
        await this.chkdPolicy.check();
    }

    
    async clickContinue() {
        await this.btnContinue.click();
    }

    
    async getConfirmationMsg()
    {
        return await this.msgConfirmation.innerText()
    }

    async clickoncontinueuponregister(){
        await this.continueafterregister.click()
        return new AccountPage(this.page)
    }

    
    // async completeRegistration(userData: {
    //     firstName: string;
    //     lastName: string;
    //     email: string;
    //     telephone: string;
    //     password: string;
    // }): Promise<void> {
    //     await this.setFirstName(userData.firstName);
    //     await this.setLastName(userData.lastName);
    //     await this.setEmail(userData.email);
    //     await this.setTelephone(userData.telephone);
    //     await this.setPassword(userData.password);
    //     await this.setConfirmPassword(userData.password);
    //     await this.setPrivacyPolicy();
    //     await this.clickContinue();
    //     await expect(this.msgConfirmation).toBeVisible();
    // }
}
