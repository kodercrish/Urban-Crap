package com.example.UC_Backend.Users;

import com.example.UC_Backend.Extra.ExtraFunctions;
import com.example.UC_Backend.Order;
import java.util.HashMap;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
/**
 * Contains details of a service agent
 */
@Document(collection = "service_agents")
public class ServiceAgent extends User{
    ExtraFunctions func =new ExtraFunctions();
    
    @Id
    private String id = UUID.randomUUID().toString(); // Unique value for each document;
    private int agentId;
    private int range;
    private String[] skill;
    private String location;
    private HashMap<String,Order> completed_orders;
    private HashMap<String,Order> pending_orders;

    public ServiceAgent(String name, String email, String password, String[] skill, int range, String location) {
        super(name, email, password);
        this.agentId= func.generateID();
        this.skill=skill;
        this.range=range;
        this.location=location;
        pending_orders=new HashMap<>();
        completed_orders=new HashMap<>();
    }

    public int getAgentId() {
        return agentId;
    }
    public String getPassword() {
        return super.getPassword();
    }
    public String getName(){
        return super.name;
    }
    public String getEmail(){
        return super.email;
    }
    public String[] getSkill(){
        return skill;
    }
    public int getRange(){
        return range;
    }
    public String getLocation(){
        return this.location;
    }
    public HashMap<String,Order> getCompleted_orders(){
        return completed_orders;
    }
    public HashMap<String,Order> getPending_orders(){
        return pending_orders;
    }
    public Order getOrderObject(String itemId){
        return pending_orders.get(itemId);
    }
}
