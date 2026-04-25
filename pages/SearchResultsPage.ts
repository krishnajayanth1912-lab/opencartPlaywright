import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage'; // Import ProductPage if needed

export class SearchResultsPage {
    private readonly page: Page;
    private readonly PName:string = 'Macbook'
    // Locators using CSS selectors
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('h4 a');
        
    }

    /**
     * Verify if the search results page exists by checking the header text
     */
    async isSearchResultsPageExists(productName: string) {
        const text = await this.searchPageHeader.innerText()
        if(text == `Search - ${productName}`)
        {
            return true
        }
        return false
    }

    /**
     * Check if a product exists in the search results by its name
     * @param productName - The name of the product to search for
     * @returns Promise<boolean> - true if the product exists
     */
    async isProductExist(productName: string)  {
        const allproducts = await this.searchProducts.all()
        for(const x of allproducts)
        {
            if(await x.innerText() == productName){
                return await x.isVisible()
                break
            }
        }
        
    }

    /**
     * Select a product from the search results by its name
     * @param productName - The name of the product to select
     * @returns Promise<ProductPage> - ProductPage instance after selecting the product
     */
    async selectProduct(productName: string) {
        const allproducts = await this.searchProducts.all()
        for(const x of allproducts)
        {
            if(await x.innerText() == productName)
            {
                await x.click()
                return new ProductPage(this.page)
            }
        }
    }

    /**
     * Get count of products in search results
     * @returns Promise<number> - Number of products found
     */
    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }
}