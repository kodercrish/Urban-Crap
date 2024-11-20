package com.example.UC_Backend.Users;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.UC_Backend.Extra.ExtraFunctions;

import java.util.ArrayList;
/**
 * Contains details of a service agent
 */
@Document(collection = "service_agents")
public class ServiceAgent extends User{

    private int agentId;
    private record agentcoord(int x, int y) { };
    private int range;
    private String[] skill;
    ExtraFunctions func =new ExtraFunctions();
    private ExtraFunctions.JobStatus jobstatus;//Enum used from ExtraFunctions
    private String[] scheduledTime;


    public ServiceAgent(String name, String emailId, String password,String[] scheduledTime) {
        super(name, emailId, password);
        this.agentId= func.generateID();
        this.scheduledTime=scheduledTime;
    }
    
}
