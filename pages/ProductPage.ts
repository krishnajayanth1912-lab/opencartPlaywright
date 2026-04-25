import { Page, Locator, expect } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage'; // Import ShoppingCartPage if needed
import { th } from '@faker-js/faker';

export class ProductPage {
    private readonly page: Page;
    
    // Locators using CSS selectors
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.txtQuantity = page.locator('input[name="quantity"]');
        this.btnAddToCart = page.locator('#button-cart');
        this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
        this.btnItems = page.locator('#cart');
        this.lnkViewCart = page.locator('strong:has-text("View Cart")');
    }

    /**
     * Sets the product quantity
     * @param qty - Quantity to set
     */
    async setQuantity(qty: string){
        await this.txtQuantity.clear();
        await this.txtQuantity.fill(qty);
    }

    /**
     * Adds product to cart
     */
    async addToCart() {
        await this.btnAddToCart.click();
    }

    /**
     * Checks if confirmation message is visible
     * @returns Promise<boolean> - Returns true if message is visible
     */
    async isConfirmationMessageVisible() {
        try {
            if(this.cnfMsg!=null){
                 return await this.cnfMsg.innerText()
            }
            else{
                return false;
            }//await expect(this.cnfMsg).toBeVisible();
           
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on Items button to navigate to cart
     */
    async clickItemsToNavigateToCart() {
        await this.btnItems.click();
    }


    async clickViewCart(){
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

    /**
     * Complete workflow to add product to cart
     * @param quantity - Quantity of product to add
     */
    async addProductToCartflow(quantity: string) {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }
}