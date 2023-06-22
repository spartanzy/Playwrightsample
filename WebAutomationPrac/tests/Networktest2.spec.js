const { test, expect,request } = require('@playwright/test');
const {default: APIUtils} = require('../Utils/APIUtils');


const LoginPayload = {userEmail: "checkrahulacad2@yopmail.com", userPassword: "Test@2020"};
const createOrderPayload = {orders: [{country: "Germany", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const getOrderDetailsAPIrequest = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6492aa887244490f9568578d";
const fakeDetailsAPIrequest = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=649188507244490f956776d2";

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

test("to check mocking of response through rerouting", async ({page}) =>{

    page.addInitScript(value =>{
        window.localStorage.setItem("token",value);
    },response.Token);
   
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body").first().waitFor();

   await page.route(getOrderDetailsAPIrequest, 
        route=>route.continue({
            url:fakeDetailsAPIrequest
        }));

    await page.locator("button[routerlink*=myorders]").click();
    
    //wait until orders are loaded
    await page.locator("tbody tr").first().waitFor();  
    
    const orders = await page.locator("tbody tr");    
    orders.first().locator("td button").first().click();
    console.log(await page.locator('.blink_me').textContent());   
     
})
