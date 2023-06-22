class MyCartPage{

    constructor(page){

       this.firstCartProduct= page.locator("div li").first();
       this.cartHeadline = page.locator('h1');
       this.myProduct=page.locator("li h3");
       this.checkOutButton = page.locator("text=Checkout");
    }
}

module.exports = {MyCartPage}