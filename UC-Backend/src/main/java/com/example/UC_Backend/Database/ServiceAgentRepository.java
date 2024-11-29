package com.example.UC_Backend.Database;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.UC_Backend.Users.ServiceAgent;

@Repository

/**
 * Repository used for accessing Service Agent Repository
 */
public interface ServiceAgentRepository extends MongoRepository<ServiceAgent, String> {
    Optional<ServiceAgent> findByEmail(String email); // Find customer by email

    Optional<ServiceAgent> findByAgentId(int agentId);
}