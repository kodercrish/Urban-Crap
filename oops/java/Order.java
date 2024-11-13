public class Order {
    private String status;          // Status of the order (e.g., "Pending", "Accepted", "Completed")
    private int orderId;            // Unique identifier for the order
    private int customerId;         // Customer's ID
    private Tuple customerLocation; // Customer's location (Tuple: (latitude, longitude))
    private int agentId;            // ID of the agent assigned to the order
    private String time;            // Time when the order was placed or scheduled

    // Constructor to initialize all fields
    public Order(int orderId, int customerId, Tuple customerLocation, int agentId, String time, String status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.customerLocation = customerLocation;
        this.agentId = agentId;
        this.time = time;
        this.status = status;
    }

    // Getters and Setters for the attributes
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public Tuple getCustomerLocation() {
        return customerLocation;
    }

    public void setCustomerLocation(Tuple customerLocation) {
        this.customerLocation = customerLocation;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    // Nested Tuple class to hold location as a pair of integers (latitude, longitude)
    public static class Tuple {
        public int latitude;  // Latitude of the customer's location
        public int longitude; // Longitude of the customer's location

        // Constructor to initialize latitude and longitude
        public Tuple(int latitude, int longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
        // Getter for latitude
        public double getLatitude() {
            return latitude;
        }

        // Getter for longitude
        public double getLongitude() {
            return longitude;
        }
        // Simple toString method to represent Tuple in a readable format
        @Override
        public String toString() {
            return "(" + latitude + ", " + longitude + ")";
        }
    }
}
