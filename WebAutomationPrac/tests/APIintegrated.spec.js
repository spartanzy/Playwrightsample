const { test, expect,request } = require('@playwright/test');
const {default: APIUtils} = require('../Utils/APIUtils');


const LoginPayload = {userEmail: "checkrahulacad@yopmail.com", userPassword: "Test@2020"};
const createOrderPayload = {orders: [{country: "Germany", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};

let response;
let apiUtils;
test.beforeAll( async() =>
{
   
     const APIcontext = await request.newContext();
    apiUtils = new APIUtils(APIcontext,LoginPayload);
   response = await apiUtils.createOrder(createOrderPayload);
   

} );
test.afterAll(async ({ }) => {
    // Dispose all responses.
    console.log("checked");
    apiUtils.APIcontext.dispose();

  });

test("to check token is read", async ({page}) =>{

    page.addInitScript(value =>{
        window.localStorage.setItem("token",value);
    },response.Token);
   
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body").first().waitFor();
    const products = await page.locator(".card-body");
    const countofProducts = await products.count();
    console.log("count of products are"+countofProducts);

     //user clicks on my orders
     await page.locator("button[routerlink*=myorders]").click();
    
     //wait until orders are loaded
     await page.locator("tbody tr").first().waitFor();  
     
     const orders = await page.locator("tbody tr");     
     for(let i=0; i<await orders.count(); i++){
         if( response.orderId.includes(await orders.nth(i).locator("th").textContent())){
           await  orders.nth(i).locator("td button").first().click();           
           break;
         }
     }
     await expect(page.locator(".col-text.-main")).toContainText(response.orderId);
    
     
})
