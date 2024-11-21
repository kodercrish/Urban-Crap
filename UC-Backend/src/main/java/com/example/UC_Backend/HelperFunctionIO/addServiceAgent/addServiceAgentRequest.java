package com.example.UC_Backend.HelperFunctionIO.addServiceAgent;


/**
 * For taking input from the frontend in json format and converting it into java object of this class.
 */
public class addServiceAgentRequest {
    private String name;
    private String email;
    private String password;
    private String[] skill;

    addServiceAgentRequest(String name, String email, String password,String[] skill) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skill=skill;
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
}
