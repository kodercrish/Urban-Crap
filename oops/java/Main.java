public class Main {
    public static void main(String[] args) {
        Operations operations = new Operations();
        operations.authenticate("admin", "12345");
        
        Customer customer = new Customer("John", "john@example.com", "password123", 1, new int[]{10, 20});
        ServiceAgent agent = new ServiceAgent("Agent Smith", "agent@example.com", "password456", 101, new int[]{12, 22}, 5, "Plumbing");

        operations.requestedService(customer, agent);
    }
}
