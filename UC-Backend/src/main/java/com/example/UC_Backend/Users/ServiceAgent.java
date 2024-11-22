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
    private ExtraFunctions.JobStatus jobstatus;//Enum used from ExtraFunctions//HIRED OR FIRED
    private record agentcoord(int x, int y) { };
    private String[] scheduledTime;
    
    @Id
    private String id = UUID.randomUUID().toString(); // Unique value for each document;
    private int agentId;
    private int range;
    private String[] skill;
    private String availability;//FREE OR BUSY


    public ServiceAgent(String name, String email, String password,String[] skill,int range,String availability) {
        super(name, email, password);
        this.agentId= func.generateID();
        this.skill=skill;
        this.range=range;
        this.availability=availability;

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
    // public String getJobStatus(){
    //     return jobstatus.toString();
    // }
    // public String[] getScheduledTime(){
    //     return scheduledTime;
    
    public int getRange(){
        return range;
    }
    public String getAvailability(){
        return this.availability;
    }
}
