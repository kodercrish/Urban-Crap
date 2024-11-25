package com.example.UC_Backend.HelperFunctionIO.giveSAOrders;

/**
 * This function accepts agent id from frontend
 */

public class giveSAOrderRequest{
    private int agentId;

    public giveSAOrderRequest(){}
    
    public giveSAOrderRequest(int agentId){
        this.agentId=agentId;
    }
    public int getAgentId(){
        return agentId;
    }
    public void setAgentId(int agentId){
        this.agentId=agentId;
    }
}