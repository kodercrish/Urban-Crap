import java.util.HashMap;
import java.util.Map;

public class Customer extends User {
    private int customerId;  // Unique ID for the customer
    private int[] location;  // Array to store customer's location coordinates (index 0 = latitude, index 1 = longitude)
    
    // Maps to store orders by their status
    private Map<Integer, String> cancelledOrders;
    private Map<Integer, String> pendingOrders;
    private Map<Integer, String> completedOrders;

    // Constructor to initialize customer details and maps
    public Customer(String name, String email, String password, int customerId, int[] location) {
        super(name, email, password);
        this.customerId = customerId;
        this.location = location;
        
        // Initialize the maps to avoid NullPointerException
        this.cancelledOrders = new HashMap<>();
        this.pendingOrders = new HashMap<>();
        this.completedOrders = new HashMap<>();
    }

    // Getter for customerId
    public int getCustomerId() {
        return customerId;
    }

    // Getter for latitude (location[0])
    public double getLatitude() {
        return location[0];  // Assuming index 0 stores latitude
    }

    // Getter for longitude (location[1])
    public double getLongitude() {
        return location[1];  // Assuming index 1 stores longitude
    }

    // Getter for cancelledOrders
    public Map<Integer, String> getCancelledOrders() {
        return cancelledOrders;
    }

    // Getter for pendingOrders
    public Map<Integer, String> getPendingOrders() {
        return pendingOrders;
    }

    // Getter for completedOrders
    public Map<Integer, String> getCompletedOrders() {
        return completedOrders;
    }

    // Adds a new order to pending orders
    public void addOrder(int orderId, String orderDetails) {
        pendingOrders.put(orderId, orderDetails);
    }

    // Changes the status of an order
    public void changeStatus(int orderId, String status) {
        if (status.equalsIgnoreCase("completed")) {
            String orderDetails = pendingOrders.remove(orderId);
            if (orderDetails != null) {
                completedOrders.put(orderId, orderDetails);
                System.out.println("Order " + orderId + " marked as completed.");
            } else {
                System.out.println("Order " + orderId + " not found in pending orders.");
            }
        } else if (status.equalsIgnoreCase("cancelled")) {
            String orderDetails = pendingOrders.remove(orderId);
            if (orderDetails != null) {
                cancelledOrders.put(orderId, orderDetails);
                System.out.println("Order " + orderId + " marked as cancelled.");
            } else {
                System.out.println("Order " + orderId + " not found in pending orders.");
            }
        } else {
            System.out.println("Invalid status. Use 'completed' or 'cancelled'.");
        }
    }

    // Retrieves details of a specific order by its ID
    public String getOrderDetails(int orderId) {
        if (pendingOrders.containsKey(orderId)) {
            return "Pending Order: " + pendingOrders.get(orderId);
        } else if (completedOrders.containsKey(orderId)) {
            return "Completed Order: " + completedOrders.get(orderId);
        } else if (cancelledOrders.containsKey(orderId)) {
            return "Cancelled Order: " + cancelledOrders.get(orderId);
        } else {
            return "Order ID " + orderId + " not found.";
        }
    }
}
