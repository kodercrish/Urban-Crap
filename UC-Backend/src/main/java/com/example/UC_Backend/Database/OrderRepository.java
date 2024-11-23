package com.example.UC_Backend.Database;

import java.util.Optional;
import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.UC_Backend.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findByOrderId(int orderId);
    ArrayList<Order> findByCustomerId(int customerId); // Return List instead of Optional
    
}