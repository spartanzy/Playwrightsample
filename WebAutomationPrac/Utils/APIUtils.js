class APIUtils {

    
    constructor(APIcontext, LoginPayload) {
        this.APIcontext = APIcontext;   
        this.LoginPayload = LoginPayload;

    }
    async getToken() {
        console.log("payload is "+this.LoginPayload);
        
        const loginResponse = await this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.LoginPayload
            })

        const responsejson = await loginResponse.json();
       const token = responsejson.token;
        
        return token;
    }

    async createOrder(orderPayload) {

        let response = {};
        response.Token = await this.getToken();
        const orderResponse = await this.APIcontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.Token,
                    'Accept': 'application/json'
                }
            });

        const orderjsonResponse = await orderResponse.json();
        const orderId = orderjsonResponse.orders[0];
        response.orderId = orderId;
        console.log("token is"+ response.Token);
        console.log("orderID created is "+response.orderId);

        return response;
    }

}

export default APIUtils;