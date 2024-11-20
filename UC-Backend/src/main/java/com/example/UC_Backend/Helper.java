package com.example.UC_Backend;

import com.example.UC_Backend.Users.Admin;
import com.example.UC_Backend.Users.Customer;
import com.example.UC_Backend.Database.AdminRepository;
import com.example.UC_Backend.Database.CustomerRepository;

import com.example.UC_Backend.HelperFunctionIO.addCustomer.*;
import com.example.UC_Backend.HelperFunctionIO.loginCustomer.*;
import com.example.UC_Backend.HelperFunctionIO.loginAdmin.*;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Helper handles the input/output operations coming from the frontend.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class Helper {

    @Autowired
    private CustomerRepository customerCollection;
    @Autowired
    private AdminRepository adminCollection;


    @PostMapping("/addcustomer")
    public addCustomerResponse addCustomer(@RequestBody addCustomerRequest request) {
        try {
            Optional<Customer> existingCustomerByEmail = customerCollection.findByEmail(request.getEmail());
            Optional<Customer> existingCustomerByPhone = customerCollection.findByPhone(Integer.parseInt(request.getPhone()));

            if (existingCustomerByEmail.isPresent()) {
                return new addCustomerResponse("Customer with this email already exists.", 0);
            } else if (existingCustomerByPhone.isPresent()) {
                return new addCustomerResponse("Customer with this phone number already exists.", 0);
            } else {
                Customer customer = new Customer(request.getName(), request.getEmail(), Integer.parseInt(request.getPhone()), request.getPassword());
                customerCollection.save(customer);
                return new addCustomerResponse("Customer added successfully.", customer.getCustomerId());
            }
        } catch (Exception e) {
            return new addCustomerResponse(e.getMessage(), -1);
        }
    }

    @PostMapping("/logincustomer")
    public loginCustomerResponse loginCustomer(@RequestBody loginCustomerRequest request) {
        try {
            Optional<Customer> existingCustomerByEmail = customerCollection.findByEmail(request.getEmail());

            
            if(existingCustomerByEmail.isPresent()) {
                Customer customer_fetched = existingCustomerByEmail.get();

                if (customer_fetched.getPassword().equals(request.getPassword())) {
                    return new loginCustomerResponse("Customer logedin successfully.",customer_fetched.getCustomerId());
                } else {
                    return new loginCustomerResponse("INCORRECT PASSWORD",0);
                }
            }
            else{
        
                return new loginCustomerResponse("EMAIL ID DOES NOT EXIST",0);
            }
        } catch (Exception e) {
            return new loginCustomerResponse(e.getMessage(),-1);
        }
    }

    @PostMapping("/loginadmin")
     public loginAdminResponse loginAdmin(@RequestBody loginAdminRequest request) {
        try {
            Optional<Admin> existingAdminByEmail = adminCollection.findByEmail(request.getEmail());

            
            if(existingAdminByEmail.isPresent()) {
                Admin admin_fetched = existingAdminByEmail.get();
                if (admin_fetched.getPassword().equals(request.getPassword()) && admin_fetched.getAccessCode().equals(request.getAccessCode())) {
                        return new loginAdminResponse("Admin logedin successfully", admin_fetched.getAdminId());
                } else {
                    return new loginAdminResponse("INCORRECT CREDENTIALS",0);
                }
            }
            else {
                return new loginAdminResponse("INCORRECT CREDENTIALS",0);//Sending null
            }
        } catch (Exception e) {
            return new loginAdminResponse(e.getMessage(),-1);//Error
        }
    }
    


    @GetMapping("/addcustomer")
    public String handleGet() {
        return "Please use POST method for this endpoint.";
    }

}
