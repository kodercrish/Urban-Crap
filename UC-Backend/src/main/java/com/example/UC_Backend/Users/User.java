package com.example.UC_Backend.Users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * User class is an abstract class for customer, serviceAgent and admin.
 */
@Document
public abstract class User
{
    @Id
    protected String name;
    protected String email;
    protected String password;
    
    public User(String name,String email,String password ) {
        this.name=name;
        this.email=email;
        this.password=password;
    }
}