package com.example.UC_Backend.HelperFunctionIO.addCustomer;


/**
 * For taking input from the frontend in json format and converting it into java object of this class.
 */
public class addCustomerRequest {
    private String name;
    private String email;
    private String phone;
    private String password;

    addCustomerRequest(String name, String email, String phone, String password) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return phone;
    }
    public String getPassword() {
        return password;
    }
}
