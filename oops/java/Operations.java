public class Operations {
    // Load the JNI library
    static {
        System.loadLibrary("Operations"); // Load JNI library
    }

    // Native method to authenticate user
    public native boolean authenticate(String username, String password);

    // Native method to accept a job for an agent
    public native void acceptJob(int orderId, int agentId);

    // Native method to reject a job for an agent
    public native void rejectJob(int orderId, int agentId);

    // Method to request service from a service agent
    public void requestedService(Customer customer, ServiceAgent agent) {
        // Logic to request service from an agent
        // Here we can add the service request to a queue or notify the agent
        System.out.println("Service requested from agent: " + agent.name);

        // Example of enhancing functionality: Checking agent availability
        if ("IDLE".equals(agent.getJobStatus())) {
            System.out.println("Agent is available, proceeding with request.");
        } else {
            System.out.println("Agent is busy, please try again later.");
        }
    }
}
