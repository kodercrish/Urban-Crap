import java.util.HashMap;
import java.util.Map;

public class Admin extends User {
    private String accessCode;

    // Stores orders with order ID as key and order details as value
    private Map<Integer, String> orderList;

    // Stores service agents with agent ID as key and ServiceAgent object as value
    private Map<Integer, ServiceAgent> agentList;

    // Constructor to initialize admin attributes
    public Admin(String name, String email, String password, String accessCode) {
        super(name, email, password);
        this.accessCode = accessCode;
        this.orderList = new HashMap<>();  // Initializes the order list
        this.agentList = new HashMap<>();  // Initializes the agent list
    }

    // Method to add an order with ID and details
    public void addOrder(int orderId, String orderDetails) {
        orderList.put(orderId, orderDetails);  // Adds order to orderList map
    }

    /**
     * Method to manage ServiceAgents (add or remove)
     * 
     * @param action "add" to add an agent, "remove" to remove an agent
     * @param agent  the ServiceAgent to add or remove
     */
    public void manageAgents(String action, ServiceAgent agent) {
        // Check if action is "add"
        if (action.equalsIgnoreCase("add")) {
            // Add agent to the agent list
            agentList.put(agent.getAgentId(), agent);
            System.out.println("Agent with ID " + agent.getAgentId() + " added.");
        } 
        // Check if action is "remove"
        else if (action.equalsIgnoreCase("remove")) {
            // Remove agent if it exists in the list
            if (agentList.containsKey(agent.getAgentId())) {
                agentList.remove(agent.getAgentId());
                System.out.println("Agent with ID " + agent.getAgentId() + " removed.");
            } else {
                System.out.println("Agent with ID " + agent.getAgentId() + " does not exist.");
            }
        } 
        // If action is neither "add" nor "remove"
        else {
            System.out.println("Invalid action. Use 'add' or 'remove'.");
        }
    }
}
