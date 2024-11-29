package com.example.UC_Backend.Users;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * User class is an abstract class for customer, serviceAgent and admin.
 */
@Document
public abstract class User {
    protected String name;
    protected String email;
    protected String password;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    protected String getName() {
        return name;
    }

    protected String getEmail() {
        return email;
    }

    protected String getPassword() {
        return password;
    }
}