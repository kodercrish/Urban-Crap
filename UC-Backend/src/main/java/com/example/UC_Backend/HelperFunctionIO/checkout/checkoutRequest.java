package com.example.UC_Backend.HelperFunctionIO.checkout;

/**
 * This file takes care of json file coming when checkout button is clicked
 */

public class checkoutRequest{
    private int customerId;

    public checkoutRequest(){}
    public checkoutRequest(int customerId){
        this.customerId=customerId;
    }

    public int getCustomerId(){
        return customerId;
    }
    public void setCustomerId(){
        this.customerId=customerId;
    }

}
