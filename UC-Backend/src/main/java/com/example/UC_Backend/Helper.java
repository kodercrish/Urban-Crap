package com.example.UC_Backend;

//Importing Users
import com.example.UC_Backend.Users.Admin;
import com.example.UC_Backend.Users.Customer;
import com.example.UC_Backend.Users.ServiceAgent;

//Importing Respositories for Database
import com.example.UC_Backend.Database.AdminRepository;
import com.example.UC_Backend.Database.CustomerRepository;
import com.example.UC_Backend.Database.ServiceAgentRepository;
import com.example.UC_Backend.Database.OrderRepository;

//Importing Admin related files
import com.example.UC_Backend.HelperFunctionIO.loginAdmin.*;

//Importing Customer Related Files
import com.example.UC_Backend.HelperFunctionIO.addCustomer.*;
import com.example.UC_Backend.HelperFunctionIO.getCustomerDetails.*;
import com.example.UC_Backend.HelperFunctionIO.loginCustomer.*;

//IMporting Service Agents Related Files
import com.example.UC_Backend.HelperFunctionIO.addServiceAgent.*;
import com.example.UC_Backend.HelperFunctionIO.loginServiceAgent.*;
import com.example.UC_Backend.HelperFunctionIO.getAllSA.*;

//Importing Cart Related files
import com.example.UC_Backend.HelperFunctionIO.addtoCart.*;
import com.example.UC_Backend.HelperFunctionIO.removeFromCart.*;
import com.example.UC_Backend.HelperFunctionIO.checkout.*;
import com.example.UC_Backend.HelperFunctionIO.orderHistory.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @Autowired
    private OrderRepository orderCollection;


    @PostMapping("/addcustomer")
    public addCustomerResponse addCustomer(@RequestBody addCustomerRequest request) {
        try {
            Optional<Customer> existingCustomerByEmail = customerCollection.findByEmail(request.getEmail());
            Optional<Customer> existingCustomerByPhone = customerCollection.findByPhone(request.getPhone());

            if (existingCustomerByEmail.isPresent()) {
                return new addCustomerResponse("Customer with this email already exists.", 0);
            } else if (existingCustomerByPhone.isPresent()) {
                return new addCustomerResponse("Customer with this phone number already exists.", 0);
            } else {
                Customer customer = new Customer(request.getName(), request.getEmail(), request.getPhone(), request.getPassword());
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
                ServiceAgent sa=new ServiceAgent(request.getName(),request.getEmail(),request.getPassword(),request.getSkill(),request.getRange(),"BUSY");
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

    @PostMapping("/addToCart")
    public addtoCartResponse addtoCustomerCart(@RequestBody addtoCartRequest request) {
        try {
        Optional<Customer> customerOptional = customerCollection.findByCustomerId(request.getCustomerId());

            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();

                // Check if the serviceId is already in the cart
                if (customer.getShoppingCart().contains(request.getServiceId())) {
                    return new addtoCartResponse("Service is already in the shopping cart.");
                }
                else{   
                    // Add the serviceId to the shoppingCart
                    customer.getShoppingCart().add(request.getServiceId());
                    // Save the updated customer back to the database
                    customerCollection.save(customer);
                }
                return new addtoCartResponse("Service added to shopping cart successfully.");
            } else {
                return new addtoCartResponse("CUSTOMER_ID_DOES_NOT_EXIST");
            }
        } catch (Exception e) {
            return new addtoCartResponse(e.getMessage());
        }
    }

    @PostMapping("/removeFromCart")
    public removeFromCartResponse removeFromCart(@RequestBody removeFromCartRequest request) {
        try {
            Optional<Customer> customerOptional = customerCollection.findByCustomerId(request.getCustomerId());
            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                // Check if the serviceId is in the cart
                if (customer.getShoppingCart().contains(request.getServiceId())) {
                    // Remove the serviceId from the shoppingCart
                    customer.getShoppingCart().remove(request.getServiceId());
                    // Save the updated customer back to the database
                    customerCollection.save(customer);
                    return new removeFromCartResponse("Service removed from shopping cart successfully.");
                }
                else{
                    return new removeFromCartResponse("Service is not in the shopping cart.");
                }
            } else {
                return new removeFromCartResponse("CUSTOMER_ID_DOES_NOT_EXIST");
            }
        } catch (Exception e) {
            return new removeFromCartResponse(e.getMessage());
        }
    }

    @GetMapping("/getCartItems/{customerId}")
    public Map<String, List<String>> getCartItems(@PathVariable int customerId) {
        Optional<Customer> customerOptional = customerCollection.findByCustomerId(customerId);
        Map<String, List<String>> response = new HashMap<>();
        
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            response.put("cartItems", new ArrayList<>(customer.getShoppingCart()));
        } else {
            response.put("cartItems", new ArrayList<>());
        }
        return response;
    }

    @PostMapping("/checkout")//add Order
    public checkoutResponse Checkout (@RequestBody checkoutRequest request){
     try{
        Optional<Customer> customerOptional=customerCollection.findByCustomerId(request.getCustomerId());

        if(customerOptional.isPresent())
        {
            Customer customer=customerOptional.get();
            Order order=new Order(customer.getCustomerId(), "PENDING_NOT_ASSIGNED");
            order.setCart(customer.getShoppingCart());
            orderCollection.save(order);
    
            return new checkoutResponse("SUCCESSFULL ADDED");
        }
        else{
            return new checkoutResponse("NO_SUCH_CUSTOMER_EXISTS");
        }
        }catch(Exception e){
            return new checkoutResponse("ERROR");
        }
    }

    @PostMapping("/getAllServiceAgents")
    public  getAllSAResponse getAllServiceAgents() {
        // Fetch all service agent details
        try{
            ArrayList<ServiceAgent> agents = new ArrayList<>();
            saCollection.findAll().forEach(agents::add);

            return new getAllSAResponse("Sent Successfully",agents);
        }catch(Exception e) {
            return new getAllSAResponse("Error",null);
        }
    }
    
    // @PostMapping("/getOrderDetails")
    // public getOrderDetailsResponse getOrderDetails(@RequestBody getOrderDetailsRequest request) {
    //     try {
    //         ArrayList<Order> orderOptional = new ArrayList<>();
    //         orderCollection.findByCustomerId(request.getCustomerId());
    //             return new getOrderDetailsResponse("Order Details", order);
    //         else {
    //             return new getOrderDetailsResponse("Order not found");
    //         }
    //     } catch (Exception e) {
    //         return new getOrderDetailsResponse(e.getMessage());
    //     }
    // }

}
