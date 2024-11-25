package com.example.UC_Backend;

//Importing Users
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.UC_Backend.Database.AdminRepository;
import com.example.UC_Backend.Database.CustomerRepository;
import com.example.UC_Backend.Database.OrderRepository;
import com.example.UC_Backend.Database.ServiceAgentRepository;
import com.example.UC_Backend.HelperFunctionIO.addCustomer.addCustomerRequest;
import com.example.UC_Backend.HelperFunctionIO.addCustomer.addCustomerResponse;
import com.example.UC_Backend.HelperFunctionIO.addServiceAgent.addServiceAgentRequest;
import com.example.UC_Backend.HelperFunctionIO.addServiceAgent.addServiceAgentResponse;
import com.example.UC_Backend.HelperFunctionIO.addtoCart.addtoCartRequest;
import com.example.UC_Backend.HelperFunctionIO.addtoCart.addtoCartResponse;
import com.example.UC_Backend.HelperFunctionIO.checkout.checkoutRequest;
import com.example.UC_Backend.HelperFunctionIO.checkout.checkoutResponse;
import com.example.UC_Backend.HelperFunctionIO.getAllSA.getAllSAResponse;
import com.example.UC_Backend.HelperFunctionIO.getAvailableSA.getAvailableSA;
import com.example.UC_Backend.HelperFunctionIO.getCustomerDetails.getCustomerDetailsRequest;
import com.example.UC_Backend.HelperFunctionIO.getCustomerDetails.getCustomerDetailsResponse;
import com.example.UC_Backend.HelperFunctionIO.giveSAOrders.giveSAOrdersRequest;
import com.example.UC_Backend.HelperFunctionIO.giveSAOrders.giveSAOrdersResponse;
import com.example.UC_Backend.HelperFunctionIO.loginAdmin.loginAdminRequest;
import com.example.UC_Backend.HelperFunctionIO.loginAdmin.loginAdminResponse;
import com.example.UC_Backend.HelperFunctionIO.loginCustomer.loginCustomerRequest;
import com.example.UC_Backend.HelperFunctionIO.loginCustomer.loginCustomerResponse;
import com.example.UC_Backend.HelperFunctionIO.loginServiceAgent.LoginSARequest;
import com.example.UC_Backend.HelperFunctionIO.loginServiceAgent.LoginSAResponse;
import com.example.UC_Backend.HelperFunctionIO.orderHistory.getOrderDetailsRequest;
import com.example.UC_Backend.HelperFunctionIO.orderHistory.getOrderDetailsResponse;
import com.example.UC_Backend.HelperFunctionIO.removeFromCart.removeFromCartRequest;
import com.example.UC_Backend.HelperFunctionIO.removeFromCart.removeFromCartResponse;
import com.example.UC_Backend.Users.Admin;
import com.example.UC_Backend.Users.Customer;
import com.example.UC_Backend.Users.ServiceAgent;

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

    // static {
    //     System.loadLibrary("rangeChecker");
    // }

    public native ArrayList<String> getInRangeAgents(String CustomerLocation, ArrayList<ServiceAgent> agentsList);

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
                ServiceAgent sa = new ServiceAgent(
                    request.getName(),
                    request.getEmail(),
                    request.getPassword(),
                    request.getSkill(), // This is already String[]
                    request.getRange(),
                    request.getLocation()
                );
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
            Order order=new Order(customer.getCustomerId(), "PENDING_NOT_ASSIGNED" ,request.getTotalprice(), request.getLocation());
            order.setCart(customer.getShoppingCart());
            orderCollection.save(order);
                        // System.out.print("1111111");


            //GEtting all service agents
            ArrayList<ServiceAgent> agents = new ArrayList<>();
            saCollection.findAll().forEach(agents::add);

            // System.out.print("2222222");

 
            // System.out.print("3333333");

            //Object created for getting available Service Agents
            getAvailableSA obj= new getAvailableSA(agents);
            // System.out.println("dfaafada");

            for(String itemId: order.getCart()){
                        // System.out.println("44444");

                ArrayList<ServiceAgent> availableSA= new ArrayList<ServiceAgent>();
                availableSA=obj.findAvailableSA(itemId);
                // System.out.println("5555555");
                //We will get filtered list of agents in array of string from cpp
                for(ServiceAgent sa: availableSA){
                    // System.out.println("6666666");
                    sa.getPending_orders().put(itemId,order);
                    // sa.getCurrent_orders().put(itemId,order);
                    // System.out.println(sa.getPending_orders().get(0));
                    // System.out.println(sa.getOrderObject(itemId));

                    saCollection.save(sa);
                }
                
            }

            // ArrayList<String> inRangeAgentsIDs = new RangeChecker().getInRangeAgents(customer.getLocation(), availableSA);
            
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

    @PostMapping("/sa/orders")
    public  giveSAOrdersResponse RequestSAOrder (@RequestBody giveSAOrdersRequest request) {
        // Fetch all service agent details
        try{
            Optional<ServiceAgent> saOptional = saCollection.findByAgentId(request.getAgentId());
            ServiceAgent sa = saOptional.get();
            return new giveSAOrdersResponse("Sent Successfully", sa);
        }catch(Exception e) {
            return new giveSAOrdersResponse("Error", null);
        }
    }
    
    @PostMapping("/order-history")
    public getOrderDetailsResponse getOrderDetails(@RequestBody getOrderDetailsRequest request) {
        try {

                ArrayList<Order> orderList = new ArrayList<>();

                // Fetch all orders by customerId
                List<Order> orders = orderCollection.findByCustomerId(request.getCustomerId());
                
                // Add all orders to the ArrayList
                orderList.addAll(orders);
            
                return new getOrderDetailsResponse("Order Details", orderList);
            
        } catch (Exception e) {
            return new getOrderDetailsResponse(e.getMessage(),null);
       }
    }

}
