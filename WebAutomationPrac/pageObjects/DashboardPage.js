class DashboardPage {

    constructor(page) {
        this.page=page;
        this.firstcard = page.locator(".card-body").first();
        this.products = page.locator(".card-body");
        this.CartLink = page.locator("button.btn.btn-custom").nth(2);
        this.MyordersLink = page.locator("button[routerlink*=myorders]");
    }

    async addProductToCart(product) {
        const products = await this.products;
        const countofProducts = await products.count();
        console.log("count of products are" + countofProducts);
        //identify and click on the required product.
        for (let i = 0; i < countofProducts; i++) {
            console.log(await products.nth(i).locator('b').textContent());
            if (await products.nth(i).locator('b').textContent() === product) {
                await products.nth(i).locator('text=" Add To Cart"').click();
                break;
            }
        }
    }
}

module.exports = { DashboardPage }