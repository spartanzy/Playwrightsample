class MyOrdersPage{

    constructor(page){

        this.firstOrdercard = page.locator("tbody tr").first();
        this.AllOrders = page.locator("tbody tr");
        this.orderID=page.locator(".col-text.-main");

    }


    async selectPlacedOrder(orderId){       
    const orders = await this.AllOrders;
    console.log("no of orders displayed are "+await orders.count());
    for(let i=0; i<await orders.count(); i++){
        if( orderId.includes(await orders.nth(i).locator("th").textContent())){
          await  orders.nth(i).locator("td button").first().click();
          break;
        }
    }
    
    }


}
module.exports = {MyOrdersPage}