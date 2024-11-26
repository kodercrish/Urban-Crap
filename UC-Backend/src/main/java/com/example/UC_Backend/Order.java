package com.example.UC_Backend;

import com.example.UC_Backend.Extra.ExtraFunctions;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;
import java.util.ArrayList;

/**
 * Order class gives details of each order placed
 */

@Document(collection = "orders")
public class Order {
    private String[] time;
    private ExtraFunctions func = new ExtraFunctions();
    
    @Id
    private String id = UUID.randomUUID().toString(); // Unique value for each document;
    private int orderId;
    private int customerId;
    private int agentId;
    private String orderStatus;
    private ArrayList<String> cart = new ArrayList<String>();
    private int totalprice;
    private String location;
    private ArrayList<Integer> request_agents;

    //constructor
    public Order() {
        this.orderId = func.generateID();
    }
    public Order(int customerId, String orderStatus,int totalprice, String location) {
        this.customerId = customerId;
        this.orderId = func.generateID();
        this.orderStatus = orderStatus;
        this.totalprice=totalprice;
        this.location=location;
        request_agents=new ArrayList<>();
    }

    //getters and setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public int getOrderId() {
        return orderId;
    }
    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }
    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    public int getAgentId() {
        return agentId;
    }
    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }
    public String getOrderStatus() {
        return orderStatus;
    }
    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
    public ArrayList<String> getCart() {
        return cart;
    }
    public void setCart(ArrayList<String> cart) {
        this.cart = cart;
    }
    public int getTotalPrice(){
        return totalprice;
    }
    public void setTotalPrice(int totalprice){
        this.totalprice=totalprice;
    }
    public String getLocation(){
        return location;
    }
    public void setLocation(String location){
        this.location=location;
    }
    public ArrayList<Integer> getRequestAgents(){
        return this.request_agents;
    }
    public void setRequestAgents(ArrayList<Integer> request_agents){
        this.request_agents=request_agents;
    }
}
