const { test, expect } = require('@playwright/test');

test("to login and check first element text", async ({page}) =>{

     // product name 
   const product = 'iphone 13 pro';
   const userName = 'checkrahulacad@yopmail.com';
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("")
   await page.locator("#userEmail").fill(userName)
   await page.locator("#userPassword").fill("")
   await page.locator("#userPassword").fill("Test@2020")
   await page.locator("#login").click();
   // wait until page loads   
    await page.waitForLoadState('networkidle');     
//   const titles  =await page.locator(".card-body b").allTextContents;
//   console.log(titles);
await page.locator(".card-body").first().waitFor();
   // get locators of all products displayed
   const products = await page.locator(".card-body");
   const countofProducts = await products.count();
   console.log("count of products are"+countofProducts);
   //identify and click on the required product.
   for(let i=0; i<countofProducts; i++){
    console.log(await products.nth(i).locator('b').textContent());
    if(await products.nth(i).locator('b').textContent()===product){
       await products.nth(i).locator('text=" Add To Cart"').click();
       break;
    }
   }   
   await page.locator("button.btn.btn-custom").nth(2).click();
   // wait until dom locator is located 
   await page.locator("div li").first().waitFor();
   await expect(page.locator('h1')).toContainText("My Cart");
    await expect(page.locator("li h3")).toContainText(product);
    //user checks out the product
    await page.locator("text=Checkout").click();
    await expect(page.locator("label[type=text]")).toContainText(userName);
    await page.locator("input[placeholder]").type("Indi",{delay:1000});
    const countrydropdown = await page.locator("section.ta-results span");
    const countofcountry = await countrydropdown.count();
   console.log("countofcountries displayed are"+countofcountry);
    for(let i=0; i<countofcountry; i++){

        if(await countrydropdown.nth(i).textContent(" India")){
       await countrydropdown.nth(i).click();
       break}
    }
    await page.locator("div.small input.txt").first().fill("123");
    await page.locator("a.action__submit").click();
    //Validate if order is successful
    await expect(page.locator(".hero-primary")).toContainText("Thankyou");
    const orderIdextract = await page.locator("label.ng-star-inserted").textContent();
    const orderIdsplit = orderIdextract.trim().split("|");
    const orderId = orderIdsplit[1].trim();
    //user clicks on my orders
    await page.locator("button[routerlink*=myorders]").click();
    //wait till page comes to ideal state
    await page.waitForLoadState('networkidle'); 
    //if above wait does nt work, wait until orders are loaded
    await page.locator("tbody tr").first().waitFor();  
    
    const orders = await page.locator("tbody tr");
    console.log("no of orders displayed are "+await orders.count());
    for(let i=0; i<await orders.count(); i++){
        if( orderId.includes(await orders.nth(i).locator("th").textContent())){
          await  orders.nth(i).locator("td button").first().click();
          break;
        }
    }
    await expect(page.locator(".col-text.-main")).toContainText(orderId);
    
})

