const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../Utils/placeOrderTestData.json')));
for(const data of dataSet){
test(`to login and buy product ${data.product}`, async ({page}) =>{

     // product name 
  //  const product = 'iphone 13 pro';
  //  const userName = 'checkrahulacad@yopmail.com';
  //  const password = "Test@2020";

   // POManager object
   const poManager = new POManager(page);
  //create login page object
  const loginPage= poManager.getLoginPage();
   loginPage.NavigatetoURL();      
   loginPage.signIn(data.userName,data.password);  
   // wait until page loads   
    await page.waitForLoadState('networkidle');     
  //User is Navigated to dashboard
  const dashboardpage = poManager.getDashboardPage();    

  await dashboardpage.firstcard.waitFor();   
  await dashboardpage.addProductToCart(data.product);
  await dashboardpage.CartLink.click();
   
   // user is Navigated to Cart Page
   const myCartPage = poManager.getMyCartPage();
   await myCartPage.firstCartProduct.waitFor();
   await expect(myCartPage.cartHeadline).toContainText("My Cart");
    await expect(myCartPage.myProduct).toContainText(data.product);
    //user checks out the product
    await myCartPage.checkOutButton.click();
    // user is navigated to Payments page
    const paymentsPage = poManager.getPaymentsPage();
    await expect(paymentsPage.UserLabel).toContainText(data.userName);
    //submission
    await paymentsPage.placeOrder("Indi"," India","123");
   
    //Validate if order is successful
    await paymentsPage.validateOrderSuccessfulMsg("Thankyou");   
    //get orderID
    const orderId = await paymentsPage.extractOrderID();
    console.log("order is in test is "+orderId);
    //user clicks on my orders
    await dashboardpage.MyordersLink.click();
   
    //User is navigated to MyOrders Page.
    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.firstOrdercard.waitFor();     
    myOrdersPage.selectPlacedOrder(orderId);
   
    await expect(myOrdersPage.orderID).toContainText(orderId);    
})
}
