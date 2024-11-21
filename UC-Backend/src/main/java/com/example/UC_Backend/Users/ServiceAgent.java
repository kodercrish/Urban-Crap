package com.example.UC_Backend.Users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.UC_Backend.Extra.ExtraFunctions;

import java.util.ArrayList;
/**
 * Contains details of a service agent
 */
@Document(collection = "service_agents")
public class ServiceAgent extends User{
    ExtraFunctions func =new ExtraFunctions();
    private ExtraFunctions.JobStatus jobstatus;//Enum used from ExtraFunctions
    private record agentcoord(int x, int y) { };
    private String[] scheduledTime;
    
    @Id
    private int agentId;
    private int range;
    private String[] skill;


    public ServiceAgent(String name, String email, String password,String[] skill) {
        super(name, email, password);
        this.agentId= func.generateID();
        this.skill=skill;

    }

    public int getAgentId() {
        return agentId;
    }
    public String getPassword() {
        return super.getPassword();
    }
    
}
