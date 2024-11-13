import java.util.Vector;

public class OrderManagement {
    private int customerId;                // Customer's ID
    private Order.Tuple customerLocation;  // Reference to Tuple inside Order class
    private Vector<ServiceAgent> agentList; // List of available agents

    // Constructor to initialize customer ID, location, and agent list
    public OrderManagement(int customerId, Order.Tuple customerLocation) {
        this.customerId = customerId;
        this.customerLocation = customerLocation;
        this.agentList = new Vector<>(); // Initialize with an empty list of agents
    }

    // Method to get available agent IDs (returns a vector of agent IDs)
    public Vector<Integer> getAvailableAgentsId() {
        Vector<Integer> availableAgentIds = new Vector<>();
        for (ServiceAgent agent : agentList) {
            if ("IDLE".equals(agent.getJobStatus())) { // Check if agent is idle
                // Calculate the distance between customer and agent
                double distance = calculateDistance(customerLocation, agent.getLocation());
                if (distance <= agent.getServiceRange()) {
                    availableAgentIds.add(agent.getAgentId());
                }
            }
        }
        return availableAgentIds;
    }

    // Method to add a service agent to the list
    public void addToAgents(ServiceAgent agent) {
        agentList.add(agent);
    }

    // Method to calculate distance between customer and agent using Haversine formula
    private double calculateDistance(Order.Tuple customerLocation, int[] agentLocation) {
        final int EARTH_RADIUS = 6371; // Radius of the Earth in kilometers

        // Convert degrees to radians
        double lat1 = Math.toRadians(customerLocation.getLatitude());
        double lon1 = Math.toRadians(customerLocation.getLongitude());
        double lat2 = Math.toRadians(agentLocation[0]); // Latitude of agent
        double lon2 = Math.toRadians(agentLocation[1]); // Longitude of agent

        // Haversine formula
        double dlat = lat2 - lat1;
        double dlon = lon2 - lon1;
        double a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(dlon / 2) * Math.sin(dlon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance in kilometers
        double distance = EARTH_RADIUS * c;

        return distance;
    }

    // Getters and Setters for customerId and customerLocation
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public Order.Tuple getCustomerLocation() {
        return customerLocation;
    }

    public void setCustomerLocation(Order.Tuple customerLocation) {
        this.customerLocation = customerLocation;
    }

    public Vector<ServiceAgent> getAgentList() {
        return agentList;
    }

    public void setAgentList(Vector<ServiceAgent> agentList) {
        this.agentList = agentList;
    }
}
