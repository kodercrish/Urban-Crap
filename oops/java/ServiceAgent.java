import java.util.*;

public class ServiceAgent extends User {
    private int agentId;
    private int[] location; // Array with [latitude, longitude]
    private int range; // Service range in kilometers
    private String skill;
    private String jobStatus;  // Job status (IDLE, BUSY, etc.)
    private Vector<String> scheduledTime;
    private Map<Integer, String> pendingOrders;
    private Map<Integer, String> acceptedOrders;
    private Map<Integer, String> completedOrders;

    public ServiceAgent(String name, String email, String password, int agentId, int[] location, int range, String skill) {
        super(name, email, password);
        this.agentId = agentId;
        this.location = location;
        this.range = range;
        this.skill = skill;
        this.jobStatus = "IDLE"; // Default job status is "IDLE"
        this.scheduledTime = new Vector<>();
        this.pendingOrders = new HashMap<>();
        this.acceptedOrders = new HashMap<>();
        this.completedOrders = new HashMap<>();
    }

    // Getter for jobStatus
    public String getJobStatus() {
        return jobStatus;
    }

    // Setter for jobStatus if you need to modify it
    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    // Getter for agentId
    public int getAgentId() {
        return agentId;
    }

    // Method to calculate distance between agent and customer using Haversine formula
    public double calculateDistance(int[] customerLocation) {
        final int EARTH_RADIUS = 6371; // Radius of the Earth in kilometers

        // Coordinates of the agent (latitude, longitude)
        double agentLat = location[0];
        double agentLon = location[1];

        // Coordinates of the customer (latitude, longitude)
        double customerLat = customerLocation[0];
        double customerLon = customerLocation[1];

        // Convert degrees to radians
        double lat1 = Math.toRadians(agentLat);
        double lon1 = Math.toRadians(agentLon);
        double lat2 = Math.toRadians(customerLat);
        double lon2 = Math.toRadians(customerLon);

        // Haversine formula
        double dlat = lat2 - lat1;
        double dlon = lon2 - lon1;
        double a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(dlon / 2) * Math.sin(dlon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance in kilometers
        return EARTH_RADIUS * c;
    }

    // Method to check if the agent is available within the given range
    public boolean isAvailableWithinRange(int[] customerLocation) {
        // Calculate the distance from the customer
        double distance = calculateDistance(customerLocation);

        // Check if the agent is within range
        return distance <= range;
    }

    // Method to add a pending order
    public void addPending(int orderId, String orderDetails) {
        pendingOrders.put(orderId, orderDetails);
    }

    // Method to change the status of an order
    public void changeStatus(int orderId, String status) {
    if (status.equalsIgnoreCase("ACCEPTED")) {
        // Move the order from pending to accepted
        if (pendingOrders.containsKey(orderId)) {
            String orderDetails = pendingOrders.remove(orderId); // Remove from pending orders
            acceptedOrders.put(orderId, orderDetails); // Add to accepted orders
            System.out.println("Order " + orderId + " accepted.");
        } else {
            System.out.println("Order " + orderId + " not found in pending orders.");
        }
    } else if (status.equalsIgnoreCase("REJECTED")) {
        // Move the order from pending to rejected (or just mark it as rejected)
        if (pendingOrders.containsKey(orderId)) {
            String orderDetails = pendingOrders.remove(orderId); // Remove from pending orders
            System.out.println("Order " + orderId + " rejected.");
        } else {
            System.out.println("Order " + orderId + " not found in pending orders.");
        }
    } else if (status.equalsIgnoreCase("COMPLETED")) {
        // Move the order from accepted to completed
        if (acceptedOrders.containsKey(orderId)) {
            String orderDetails = acceptedOrders.remove(orderId); // Remove from accepted orders
            completedOrders.put(orderId, orderDetails); // Add to completed orders
            System.out.println("Order " + orderId + " completed.");
        } else {
            System.out.println("Order " + orderId + " not found in accepted orders.");
        }
    } else {
        System.out.println("Invalid status: " + status);
    }
}


    // Getters and Setters
    public int[] getLocation() {
        return location;
    }

    public void setLocation(int[] location) {
        this.location = location;
    }

    // Inside ServiceAgent class
public int getServiceRange() {
    return range;
}


    public void setRange(int range) {
        this.range = range;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public Vector<String> getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(Vector<String> scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public Map<Integer, String> getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(Map<Integer, String> pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public Map<Integer, String> getAcceptedOrders() {
        return acceptedOrders;
    }

    public void setAcceptedOrders(Map<Integer, String> acceptedOrders) {
        this.acceptedOrders = acceptedOrders;
    }

    public Map<Integer, String> getCompletedOrders() {
        return completedOrders;
    }

    public void setCompletedOrders(Map<Integer, String> completedOrders) {
        this.completedOrders = completedOrders;
    }
}
