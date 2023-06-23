const { test, expect } = require('@playwright/test');

test("@web to check title of page", async ({page}) =>{

   await page.goto("https://google.com");
    const title = await page.title();

    await expect(page).toHaveTitle(title);
    
})


test("@web to check dynamic error msgs", async({page})=>{
    
  await  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await  page.locator('#username').type("test")
  await  page.locator("[type='password']").type("test")
  await  page.locator('#signInBtn').click();

    const errorMsg = await page.locator("[style*='block']");

   await expect(errorMsg).toContainText("Incorrect")
    
})