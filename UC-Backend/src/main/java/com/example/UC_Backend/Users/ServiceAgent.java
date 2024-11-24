package com.example.UC_Backend.Users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.UC_Backend.Extra.ExtraFunctions;

import java.util.ArrayList;
import java.util.UUID;
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


    public ServiceAgent(String name, String email, String password, String[] skill, int range, String location) {
        super(name, email, password);
        this.agentId= func.generateID();
        this.skill=skill;
        this.range=range;
        this.location=location;

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
}
