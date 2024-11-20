package com.example.UC_Backend.Users;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Contains details of Admin
 */
@Document(collection = "admins")
public class Admin extends User{
    private int adminId;
    private String accesscode;

    public Admin(String name, String email, String password, String accesscode) {
        super(name, email, password);
        this.accesscode=accesscode;
    
    }

    public String getName()
    {
        return super.name;
    }
    public String getEmail(){
        return super.email;
    }

    public String getPassword(){
        return password;
    }
    public String getAccessCode(){
        return accesscode;
    }
    public int getAdminId(){
        return adminId;
    }
}