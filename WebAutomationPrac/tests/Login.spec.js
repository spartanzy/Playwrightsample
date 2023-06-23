const { test, expect } = require('@playwright/test');
//@web added in titles to tag and run specific tests
test("@web to login and validate text content", async ({page}) =>{

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("")
   await page.locator("#userEmail").fill("checkrahulacad@yopmail.com")
   await page.locator("#userPassword").fill("")
   await page.locator("#userPassword").fill("Test@2020")
   await page.locator("#login").click()
   //const firstElementText =await page.locator(".card-body b").first().textContent();
   //wait till all network calls are made
   await page.waitForLoadState('networkidle');
   const allElements=await page.locator(".card-body b");
 //  console.log(firstElementText);
  await console.log(allElements[0]);
  await expect(allElements[0]).toHaveText("zara coat 3");   
})

test("@web validated UI checkboxes",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("");

    // select dropdown value as consultant
    await page.locator("select.form-control").selectOption("consult");
    await page.locator(".customradio").last().click();
    await page.locator("#okayBtn").click();
//assertion to validation radiobutton is checked
    await expect(page.locator(".customradio").last()).toBeChecked;
    await page.locator("#terms").check();
    await page.locator('#terms').uncheck();
//assertion to validate if radiobutton is unchecked
    await expect(page.locator('#terms')).not.toBeChecked;



})

test("Navigate new page",async({browser})=>{

            const context = await browser.newContext();
           const page=  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("");
    const [nPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            await page.locator('[href*=documents]').click(),
        ])

        await expect(nPage.locator("div.inner-box")).toHaveText("Documents request");
        const text = await nPage.locator("a[href*=mailto]").textContent();
        console.log(text);
        const userwithDomain = text.split("@");
        const user = userwithDomain[1].split(".");
        console.log(user[0]);
        await page.locator("#username").fill(user[0]);


})