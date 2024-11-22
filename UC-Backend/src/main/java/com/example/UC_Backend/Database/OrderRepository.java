package com.example.UC_Backend.Database;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.UC_Backend.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findByOrderId(int orderId);
    Optional<Order> findByCustomerId(int customerId);
    
}