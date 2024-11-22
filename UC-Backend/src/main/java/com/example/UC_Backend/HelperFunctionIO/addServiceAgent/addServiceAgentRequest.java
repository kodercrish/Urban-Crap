package com.example.UC_Backend.HelperFunctionIO.addServiceAgent;


/**
 * For taking input from the frontend in json format and converting it into java object of this class.
 */
public class addServiceAgentRequest {
    private String name;
    private String email;
    private String password;
    private String[] skill;
    private int range;
    addServiceAgentRequest(String name, String email, String password,String[] skill,int range) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skill=skill;
        this.range=range;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String[] getSkill() {
        return skill;
    }
    public String getPassword() {
        return password;
    }
    public int getRange(){
        return range;
    }
}
