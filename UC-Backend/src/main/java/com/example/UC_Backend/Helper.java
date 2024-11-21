package com.example.UC_Backend;

import com.example.UC_Backend.Users.Admin;
import com.example.UC_Backend.Users.Customer;
import com.example.UC_Backend.Users.ServiceAgent;

import com.example.UC_Backend.Database.AdminRepository;
import com.example.UC_Backend.Database.CustomerRepository;
import com.example.UC_Backend.Database.ServiceAgentRepository;

import com.example.UC_Backend.HelperFunctionIO.addCustomer.*;
import com.example.UC_Backend.HelperFunctionIO.addServiceAgent.*;
import com.example.UC_Backend.HelperFunctionIO.getCustomerDetails.*;
import com.example.UC_Backend.HelperFunctionIO.loginCustomer.*;
import com.example.UC_Backend.HelperFunctionIO.loginServiceAgent.*;
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
    @Autowired
    private ServiceAgentRepository saCollection;


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

    @PostMapping("/addsa")
    public addServiceAgentResponse addServiceAgent(@RequestBody addServiceAgentRequest request) {
        try {
            Optional<ServiceAgent> existingSAEmail = saCollection.findByEmail(request.getEmail());

            if (existingSAEmail.isPresent()) {
                return new addServiceAgentResponse("EMAIL ID EXISTS", 0);
            } else {
                ServiceAgent sa=new ServiceAgent(request.getName(),request.getEmail(),request.getPassword(),request.getSkill());
                saCollection.save(sa);
                return new addServiceAgentResponse("Service agent added successfully", sa.getAgentId());
            }
        } catch (Exception e) {
            return new addServiceAgentResponse(e.getMessage(),-1);
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
    
    @PostMapping("/loginsa")
    public LoginSAResponse loginSA(@RequestBody LoginSARequest request) {
        try {
            Optional<ServiceAgent> existingSAEmail = saCollection.findByEmail(request.getEmail());

            if(existingSAEmail.isPresent()) {
                ServiceAgent sa_fetched = existingSAEmail.get();
                if (sa_fetched.getPassword().equals(request.getPassword())) {
                    return new LoginSAResponse("Service Agent logedin successfully", sa_fetched.getAgentId());
                } else {
                    return new LoginSAResponse("INCORRECT PASSWORD",0);
                }
            }
            else{
                return new LoginSAResponse("EMAIL ID DOES NOT EXIST",0);
            }
        }
        catch (Exception e) {
            return new LoginSAResponse(e.getMessage(),-1);
        }
    }

    @PostMapping("/getcustomerdetails")
    public getCustomerDetailsResponse getCustomerDetails(@RequestBody getCustomerDetailsRequest request) {
        try {
        Optional<Customer> customerOptional = customerCollection.findByCustomerId(request.getCustomerId());
            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                return new getCustomerDetailsResponse("Customer Details Sent Succussfully", customer.getName(), customer.getEmail(), customer.getPhone());
            } else {
                return new getCustomerDetailsResponse("AGENT_ID_NOT_FOUND", "NULL", "NULL", -1);

            }
        } catch (Exception e) {
            return new getCustomerDetailsResponse("ERROR", "NULL", "NULL", -1);
        }
    }

}
