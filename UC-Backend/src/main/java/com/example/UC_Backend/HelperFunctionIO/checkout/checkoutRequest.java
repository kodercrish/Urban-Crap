package com.example.UC_Backend.HelperFunctionIO.checkout;

/**
 * This file takes care of json file coming when checkout button is clicked
 */

public class checkoutRequest{
    private int customerId;
    private int totalprice;

    public checkoutRequest(){}
    public checkoutRequest(int customerId,int totalprice){
        this.customerId=customerId;
        this.totalprice=totalprice;
    }

    public int getCustomerId(){
        return customerId;
    }
    public void setCustomerId(){
        this.customerId=customerId;
    }
    public int getTotalprice(){
        return totalprice;
    }
    public void setTotalprice(int totalprice){
        this.totalprice=totalprice;
    }

}
