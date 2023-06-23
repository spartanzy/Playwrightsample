const { test, expect } = require('@playwright/test');
class PaymentsPage{

    constructor(page){
        this.page=page;
        this.UserLabel = page.locator("label[type=text]");
        this.countryText = page.locator("input[placeholder]");
        this.countrydropdown = page.locator("section.ta-results span");
        this.cvv=page.locator("div.small input.txt");
        this.submitButton = page.locator("a.action__submit");
        this.confirmMessage = page.locator(".hero-primary");
        this.orderId = page.locator("label.ng-star-inserted");
    }

    async placeOrder(partialtextcountry, country, cvv){
        await this.countryText.type("Indi",{delay:1000});
    const countrydropdown = await this.countrydropdown;
    const countofcountry = await countrydropdown.count();
   console.log("countofcountries displayed are"+countofcountry);
    for(let i=0; i<countofcountry; i++){

        if(await countrydropdown.nth(i).textContent(country)){
       await countrydropdown.nth(i).click();
       break}
    }
    await this.cvv.first().fill(cvv);
    await this.submitButton.click();
    }

    async validateOrderSuccessfulMsg(partailmessage){
        expect(this.confirmMessage).toContainText("Thankyou");
    }

    async extractOrderID(){
        const orderIdextract = await this.orderId.textContent();
        const orderIdsplit = orderIdextract.trim().split("|");
         const orderId = orderIdsplit[1].trim();
         console.log("order is in paymentspage is "+orderId);
         return orderId
    }
}

module.exports = {PaymentsPage}