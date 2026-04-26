# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productpage.spec.ts >> Add product to cart
- Location: tests\productpage.spec.ts:29:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { ShoppingCartPage } from './ShoppingCartPage'; // Import ShoppingCartPage if needed
  3  | import { th } from '@faker-js/faker';
  4  | 
  5  | export class ProductPage {
  6  |     private readonly page: Page;
  7  |     
  8  |     // Locators using CSS selectors
  9  |     private readonly txtQuantity: Locator;
  10 |     private readonly btnAddToCart: Locator;
  11 |     private readonly cnfMsg: Locator;
  12 |     private readonly btnItems: Locator;
  13 |     private readonly lnkViewCart: Locator;
  14 | 
  15 |     constructor(page: Page) {
  16 |         this.page = page;
  17 |         
  18 |         // Initialize locators with CSS selectors
  19 |         this.txtQuantity = page.locator('input[name="quantity"]');
  20 |         this.btnAddToCart = page.locator('#button-cart');
  21 |         this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
  22 |         this.btnItems = page.locator('#cart');
  23 |         this.lnkViewCart = page.locator('strong:has-text("View Cart")');
  24 |     }
  25 | 
  26 |     /**
  27 |      * Sets the product quantity
  28 |      * @param qty - Quantity to set
  29 |      */
  30 |     async setQuantity(qty: string){
  31 |         await this.txtQuantity.clear();
  32 |         await this.txtQuantity.fill(qty);
  33 |     }
  34 | 
  35 |     /**
  36 |      * Adds product to cart
  37 |      */
  38 |     async addToCart() {
  39 |         await this.btnAddToCart.click();
  40 |     }
  41 | 
  42 |     /**
  43 |      * Checks if confirmation message is visible
  44 |      * @returns Promise<boolean> - Returns true if message is visible
  45 |      */
  46 |     async isConfirmationMessageVisible() {
  47 |         try {
  48 |             if(this.cnfMsg!=null){
  49 |                  return await this.cnfMsg.innerText()
  50 |             }
  51 |             else{
  52 |                 return false;
  53 |             }//await expect(this.cnfMsg).toBeVisible();
  54 |            
  55 |         } catch (error) {
  56 |             console.log(`Confirmation message not found: ${error}`);
  57 |             return false;
  58 |         }
  59 |     }
  60 | 
  61 |     /**
  62 |      * Clicks on Items button to navigate to cart
  63 |      */
  64 |     async clickItemsToNavigateToCart() {
> 65 |         await this.btnItems.click();
     |                             ^ Error: locator.click: Target page, context or browser has been closed
  66 |     }
  67 | 
  68 | 
  69 |     async clickViewCart(){
  70 |         await this.lnkViewCart.click();
  71 |         return new ShoppingCartPage(this.page);
  72 |     }
  73 | 
  74 |     /**
  75 |      * Complete workflow to add product to cart
  76 |      * @param quantity - Quantity of product to add
  77 |      */
  78 |     async addProductToCartflow(quantity: string) {
  79 |         await this.setQuantity(quantity);
  80 |         await this.addToCart();
  81 |         await this.isConfirmationMessageVisible();
  82 |     }
  83 | }
```