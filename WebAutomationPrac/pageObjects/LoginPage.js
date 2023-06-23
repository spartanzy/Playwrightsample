class LoginPage{

    constructor(page){
        this.page =page;
        this.loginButton = page.locator("#login");
        this.password = page.locator("#userPassword");
        this.username = page.locator("#userEmail");
    }

  async  NavigatetoURL(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async signIn(userName,password){
       
        await this.username.fill(userName)  
        await this.password.fill(password)
        await this.loginButton.click();
    }



}
module.exports = {LoginPage};