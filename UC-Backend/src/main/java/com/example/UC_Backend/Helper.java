package com.example.UC_Backend;

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
import com.example.UC_Backend.Extra.RangeChecker;
import com.example.UC_Backend.HelperFunctionIO.acceptOrder.acceptOrderRequest;
import com.example.UC_Backend.HelperFunctionIO.acceptOrder.acceptOrderResponse;
import com.example.UC_Backend.HelperFunctionIO.addCustomer.addCustomerRequest;
import com.example.UC_Backend.HelperFunctionIO.addCustomer.addCustomerResponse;
import com.example.UC_Backend.HelperFunctionIO.addServiceAgent.addServiceAgentRequest;
import com.example.UC_Backend.HelperFunctionIO.addServiceAgent.addServiceAgentResponse;
import com.example.UC_Backend.HelperFunctionIO.addtoCart.addtoCartRequest;
import com.example.UC_Backend.HelperFunctionIO.addtoCart.addtoCartResponse;
import com.example.UC_Backend.HelperFunctionIO.checkout.checkoutRequest;
import com.example.UC_Backend.HelperFunctionIO.checkout.checkoutResponse;
import com.example.UC_Backend.HelperFunctionIO.getAgentDetails.getAgentDetailsRequest;
import com.example.UC_Backend.HelperFunctionIO.getAgentDetails.getAgentDetailsResponse;
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
import com.example.UC_Backend.HelperFunctionIO.rejectOrder.rejectOrderRequest;
import com.example.UC_Backend.HelperFunctionIO.rejectOrder.rejectOrderResponse;
import com.example.UC_Backend.HelperFunctionIO.removeFromCart.removeFromCartRequest;
import com.example.UC_Backend.HelperFunctionIO.removeFromCart.removeFromCartResponse;
import com.example.UC_Backend.Users.Admin;
import com.example.UC_Backend.Users.Customer;
import com.example.UC_Backend.Users.ServiceAgent;

/**
 * Helper handles the input/output operations coming from the frontend.
 * Different methods in helper then performs necessary functions and accordingly
 * changes data in database
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

    public native ArrayList<String> getInRangeAgents(String CustomerLocation, ArrayList<ServiceAgent> agentsList);

    // This method is used to register a customer
    @PostMapping("/addcustomer")
    public addCustomerResponse addCustomer(@RequestBody addCustomerRequest request) {
        try {
            // Gets customer object by using email ID
            Optional<Customer> existingCustomerByEmail = customerCollection.findByEmail(request.getEmail());
            
            // Gets customer object by using phone number
            Optional<Customer> existingCustomerByPhone = customerCollection.findByPhone(request.getPhone());

            if (existingCustomerByEmail.isPresent()) {
                return new addCustomerResponse("Customer with this email already exists.", 0);
            } else if (existingCustomerByPhone.isPresent()) {
                return new addCustomerResponse("Customer with this phone number already exists.", 0);
            } else {
                Customer customer = new Customer(request.getName(), request.getEmail(), request.getPhone(),
                        request.getPassword());
                customerCollection.save(customer);
                return new addCustomerResponse("Customer added successfully.", customer.getCustomerId());
            }
        } catch (Exception e) {
            return new addCustomerResponse(e.getMessage(), -1);
        }
    }

    // This method is used for logging a customer
    @PostMapping("/logincustomer")
    public loginCustomerResponse loginCustomer(@RequestBody loginCustomerRequest request) {
        try {
            Optional<Customer> existingCustomerByEmail = customerCollection.findByEmail(request.getEmail());

            if (existingCustomerByEmail.isPresent()) {
                Customer customer_fetched = existingCustomerByEmail.get();

                if (customer_fetched.getPassword().equals(request.getPassword())) {
                    return new loginCustomerResponse("Customer logedin successfully.",
                            customer_fetched.getCustomerId());
                } else {
                    return new loginCustomerResponse("INCORRECT PASSWORD", 0);
                }
            } else {

                return new loginCustomerResponse("EMAIL ID DOES NOT EXIST", 0);
            }
        } catch (Exception e) {
            return new loginCustomerResponse(e.getMessage(), -1);
        }
    }

    // This method is used for adding service agent
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
                        request.getLocation());
                saCollection.save(sa);
                return new addServiceAgentResponse("Service agent added successfully", sa.getAgentId());
            }
        } catch (Exception e) {
            return new addServiceAgentResponse(e.getMessage(), -1);
        }
    }

    // This method is used for login of admin
    @PostMapping("/loginadmin")
    public loginAdminResponse loginAdmin(@RequestBody loginAdminRequest request) {
        try {
            Optional<Admin> existingAdminByEmail = adminCollection.findByEmail(request.getEmail());

            if (existingAdminByEmail.isPresent()) {
                Admin admin_fetched = existingAdminByEmail.get();
                if (admin_fetched.getPassword().equals(request.getPassword())
                        && admin_fetched.getAccessCode().equals(request.getAccessCode())) {
                    return new loginAdminResponse("Admin logedin successfully", admin_fetched.getAdminId());
                } else {
                    return new loginAdminResponse("INCORRECT CREDENTIALS", 0);
                }
            } else {
                return new loginAdminResponse("INCORRECT CREDENTIALS", 0);// Sending null
            }
        } catch (Exception e) {
            return new loginAdminResponse(e.getMessage(), -1);// Error
        }
    }

    // This method is used for login of service agent
    @PostMapping("/loginsa")
    public LoginSAResponse loginSA(@RequestBody LoginSARequest request) {
        try {
            Optional<ServiceAgent> existingSAEmail = saCollection.findByEmail(request.getEmail());

            if (existingSAEmail.isPresent()) {
                ServiceAgent sa_fetched = existingSAEmail.get();
                if (sa_fetched.getPassword().equals(request.getPassword())) {
                    return new LoginSAResponse("Service Agent logedin successfully", sa_fetched.getAgentId());
                } else {
                    return new LoginSAResponse("INCORRECT PASSWORD", 0);
                }
            } else {
                return new LoginSAResponse("EMAIL ID DOES NOT EXIST", 0);
            }
        } catch (Exception e) {
            return new LoginSAResponse(e.getMessage(), -1);
        }
    }

    // This method is used for getting customer details
    @PostMapping("/getcustomerdetails")
    public getCustomerDetailsResponse getCustomerDetails(@RequestBody getCustomerDetailsRequest request) {
        try {
            Optional<Customer> customerOptional = customerCollection.findByCustomerId(request.getCustomerId());
            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                return new getCustomerDetailsResponse("Customer Details Sent Succussfully", customer.getName(),
                        customer.getEmail(), customer.getPhone());
            } else {
                return new getCustomerDetailsResponse("AGENT_ID_NOT_FOUND", "NULL", "NULL", -1);
            }
        } catch (Exception e) {
            return new getCustomerDetailsResponse("ERROR", "NULL", "NULL", -1);
        }
    }

    // This method is used for getting agent details
    @PostMapping("/getagentdetails")
    public getAgentDetailsResponse getAgentDetails(@RequestBody getAgentDetailsRequest request) {
        try {
            Optional<ServiceAgent> ServiceAgentOptional = saCollection.findByAgentId(request.getAgentId());
            if (ServiceAgentOptional.isPresent()) {
                ServiceAgent agent = ServiceAgentOptional.get();
                return new getAgentDetailsResponse("Customer Details Sent Succussfully", agent);
            } else {
                return new getAgentDetailsResponse("AGENT_ID_NOT_FOUND", null);
            }
        } catch (Exception e) {
            return new getAgentDetailsResponse("ERROR", null);
        }
    }

    // This method is used for adding items to cart
    @PostMapping("/addToCart")
    public addtoCartResponse addtoCustomerCart(@RequestBody addtoCartRequest request) {
        try {
            Optional<Customer> customerOptional = customerCollection.findByCustomerId(request.getCustomerId());

            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();

                // Check if the serviceId is already in the cart
                if (customer.getShoppingCart().contains(request.getServiceId())) {
                    return new addtoCartResponse("Service is already in the shopping cart.");
                } else {
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

    // This method is used when an item is removed from cart
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
                } else {
                    return new removeFromCartResponse("Service is not in the shopping cart.");
                }
            } else {
                return new removeFromCartResponse("CUSTOMER_ID_DOES_NOT_EXIST");
            }
        } catch (Exception e) {
            return new removeFromCartResponse(e.getMessage());
        }
    }

    // This method is used for showing cart items in frontend
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

    /*
     * This method is used when customer checks out
     * When a customer checks out a new order id is created which stores the
     * customer location and also stores the details of those agents to whom request
     * has been sent
     * Also shopping cart of customer is emptied after order is successfully placed
     */
    @PostMapping("/checkout")
    public checkoutResponse Checkout(@RequestBody checkoutRequest request) {
        try {
            Optional<Customer> customerOptional = customerCollection.findByCustomerId(request.getCustomerId());

            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                Order order = new Order(customer.getCustomerId(), "PENDING_NOT_ASSIGNED", request.getTotalprice(),
                        request.getLocation());
                order.setCart(customer.getShoppingCart());
                orderCollection.save(order);

                // customer.getShoppingCart().clear();
                // customerCollection.save(customer);

                // GEtting all service agents
                ArrayList<ServiceAgent> agents = new ArrayList<>();
                saCollection.findAll().forEach(agents::add);

                // Object created for getting available Service Agents
                getAvailableSA obj = new getAvailableSA(agents);

                for (String itemId : order.getCart()) {

                    // We will get list of those agents which have the required skill to perform the job
                    ArrayList<ServiceAgent> availableSA = new ArrayList<ServiceAgent>();
                    availableSA = obj.findAvailableSA(itemId);

                    // We will get filtered list of agents in array of string from cpp
                    // These are those agents which are in range and available
                    ArrayList<ServiceAgent> inRangeSA = new ArrayList<ServiceAgent>();

                    for (ServiceAgent sa : availableSA) {
                        int distance = new RangeChecker().getAgentsInRange(order.getLocation(), sa.getLocation());
                        if (distance < sa.getRange()) {
                            inRangeSA.add(sa);
                        }
                    }

                    // for (ServiceAgent sa : availableSA) {
                    for (ServiceAgent sa : inRangeSA) {

                        // Check if the key already exists
                        sa.getPending_orders().putIfAbsent(itemId, new ArrayList<>()); // Initialize if not present
                        sa.getPending_orders().get(itemId).add(order); // Add the Order to the ArrayList
                        order.getRequestAgents().add(sa.getAgentId()); // Agent Ids stored

                        saCollection.save(sa);
                    }
                    orderCollection.save(order);
                }

                return new checkoutResponse("SUCCESSFULL ADDED");
            } else {
                return new checkoutResponse("NO_SUCH_CUSTOMER_EXISTS");
            }
        } catch (Exception e) {
            return new checkoutResponse("ERROR");
        }
    }

    // This method is used when service agent accepts order
    @PostMapping("service-agent/acceptOrder")
    public acceptOrderResponse acceptOrder(@RequestBody acceptOrderRequest request) {
        try {
            Optional<Order> order = orderCollection.findByOrderId(request.getOrderId());

            if (order.isPresent()) {
                Order fetched_order = order.get();

                for (Integer agentIdIterating : fetched_order.getRequestAgents()) {
                    Optional<ServiceAgent> sa = saCollection.findByAgentId(agentIdIterating);
                    ServiceAgent fetched_agent = sa.get();

                    // Remove from pending orders ArrayList in service agent
                    ArrayList<Order> pendingList = fetched_agent.getPending_orders().get(request.getItemId());
                    if (pendingList != null) {
                        pendingList.removeIf(o -> o.getOrderId() == request.getOrderId());
                    }

                    if (agentIdIterating == request.getAgentId()) {
                        // Add to completed orders ArrayList in service agent
                        fetched_agent.getCompleted_orders()
                                .computeIfAbsent(request.getItemId(), k -> new ArrayList<>())
                                .add(fetched_order);
                    }
                    saCollection.save(fetched_agent);
                }

                fetched_order.getRequestAgents().remove(Integer.valueOf(request.getAgentId()));
                fetched_order.setAgentId(request.getAgentId());
                orderCollection.save(fetched_order);

                return new acceptOrderResponse("SUCCESSFULLY ACCEPTED");
            }
            return new acceptOrderResponse("ORDER NOT FETCHED");
        } catch (Exception e) {
            return new acceptOrderResponse("ERROR");
        }
    }

    // This method is used when service agent rejects an order
    @PostMapping("service-agent/rejectOrder")
    public rejectOrderResponse rejectOrder(@RequestBody rejectOrderRequest request) {
        try {
            Optional<ServiceAgent> sa = saCollection.findByAgentId(request.getAgentId());
            Optional<Order> order = orderCollection.findByOrderId(request.getOrderId());

            if (sa.isPresent() && order.isPresent()) {
                ServiceAgent fetched_agent = sa.get();
                Order fetched_order = order.get();

                ArrayList<Order> pendingList = fetched_agent.getPending_orders().get(request.getItemId());
                if (pendingList != null) {
                    boolean orderExists = pendingList.stream()
                            .anyMatch(o -> o.getOrderId() == request.getOrderId());

                    if (orderExists) {
                        pendingList.removeIf(o -> o.getOrderId() == request.getOrderId());

                        // Remove the key if list is empty
                        if (pendingList.isEmpty()) {
                            fetched_agent.getPending_orders().remove(request.getItemId());
                        }
                        fetched_order.getRequestAgents().remove(Integer.valueOf(request.getAgentId()));

                        orderCollection.save(fetched_order);
                        saCollection.save(fetched_agent);
                        return new rejectOrderResponse("SUCCESSFULLY REJECTED");
                    }
                }
                return new rejectOrderResponse("ORDER NOT FOUND IN PENDING LIST");
            }
            return new rejectOrderResponse("ORDER NOT FETCHED");
        } catch (Exception e) {
            return new rejectOrderResponse("ERROR");
        }
    }

    // This method is used for getting detials of all service agents
    @PostMapping("/getAllServiceAgents")
    public getAllSAResponse getAllServiceAgents() {
        // Fetch all service agent details
        try {
            ArrayList<ServiceAgent> agents = new ArrayList<>();
            saCollection.findAll().forEach(agents::add);

            return new getAllSAResponse("Sent Successfully", agents);
        } catch (Exception e) {
            return new getAllSAResponse("Error", null);
        }
    }

    // This method is used for giving service agent orders
    @PostMapping("/service-agent/orders")
    public giveSAOrdersResponse RequestSAOrder(@RequestBody giveSAOrdersRequest request) {
        // Fetch all service agent details
        try {
            Optional<ServiceAgent> saOptional = saCollection.findByAgentId(request.getAgentId());
            ServiceAgent sa = saOptional.get();
            return new giveSAOrdersResponse("Sent Successfully", sa);
        } catch (Exception e) {
            return new giveSAOrdersResponse("Error", null);
        }
    }

    // This method is used for getting order history of customers
    @PostMapping("/order-history")
    public getOrderDetailsResponse getOrderDetails(@RequestBody getOrderDetailsRequest request) {
        try {
            ArrayList<Order> orderList = new ArrayList<>();

            // Fetch all orders by customerId
            List<Order> orders = orderCollection.findByCustomerId(request.getCustomerId());

            // Adding all orders to the ArrayList
            orderList.addAll(orders);

            return new getOrderDetailsResponse("Order Details", orderList);
        } catch (Exception e) {
            return new getOrderDetailsResponse(e.getMessage(), null);
        }
    }

}
