const { test, expect,request } = require('@playwright/test');
const {default: APIUtils} = require('../Utils/APIUtils');


const LoginPayload = {userEmail: "checkrahulacad@yopmail.com", userPassword: "Test@2020"};
const createOrderPayload = {orders: [{country: "Germany", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const checkOrdersAPIrequest = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/648ac5397244490f9563594c";
const fakeResponse = {data:[],message:"No Orders"}
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

    page.route(checkOrdersAPIrequest, route=>{

     const response= page.request.fetch(route.request());
     route.fulfill({
      response,fakeResponse
     })
    })

     //user clicks on my orders
     await page.locator("button[routerlink*=myorders]").click();
    page.pause();
     //wait until orders are loaded
    expect( await page.locator(".mt-4")).toContainText("No Orders to show at this time");

    
     
})
