const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { MyCartPage } = require("./MyCartPage");
const { MyOrdersPage } = require("./MyOrdersPage");
const { PaymentsPage } = require("./PaymentsPage");

class POManager{

constructor(page){
        this.page=page;
            this.loginpage = new LoginPage(this.page);
            this.dashboardPage = new DashboardPage(this.page);
            this.myCartPage = new MyCartPage(this.page);
            this.myOrdersPage = new MyOrdersPage(this.page);
            this.paymentsPage = new PaymentsPage(this.page);


    }


    getPaymentsPage(){

        return this.paymentsPage;
    }

    getMyOrdersPage(){

        return this.myOrdersPage;
    }
    getMyCartPage(){

        return this.myCartPage;
    }
    getLoginPage(){

        return this.loginpage;
    }

    getDashboardPage(){

        return this.dashboardPage
    }


}

module.exports={POManager};