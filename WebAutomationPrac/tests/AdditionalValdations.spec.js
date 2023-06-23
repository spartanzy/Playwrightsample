const { test, expect } = require('@playwright/test');

test("@web checking misc validations", async({page})=>{

    //navigate to URL
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //to validate the field is visible
   await expect(page.locator('#displayed-text').isVisible()).toBeTruthy;
   await page.locator('#hide-textbox').click();
   //to validate the field is hidden
   await page.locator('#displayed-text').isHidden();
  //work with Dialogs, alerts
    page.on("dialog", dialog => dialog.accept());
    await page.locator('#alertbtn').click();  
    // scroll to that element  
    const element = await page.locator('#mousehover');
    element.scrollIntoViewIfNeeded();
      //to mouse hover on an element
   await element.hover;
   // to work with Iframes
   const iframepage = await page.frame('iframe-name');
   await iframepage.locator('ul li.current a').first().click();
   await iframepage.locator("text='VIEW ALL COURSES'").click();

})
