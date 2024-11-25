package com.example.UC_Backend.HelperFunctionIO.giveSAOrders;

/**
 * Function is used to give response when getAllSA used
 */

import com.example.UC_Backend.Users.ServiceAgent;


public class giveSAOrderResponse {
    private String message;
    private ServiceAgent agent;


    public giveSAOrderResponse(String message,ServiceAgent agent) {
        this.message=message;
        this.agent=agent;
    }


    public ServiceAgent getAgent(){
        return agent;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message)
    {
        this.message=message;
    }
    

}