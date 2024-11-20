package com.example.UC_Backend.Extra;

import java.util.Random;

public class ExtraFunctions {
    
    public int generateID() {
        Random random = new Random();
        int id = 10000 + random.nextInt(90000); // Ensures a 5-digit number
        return id;
    }

    public enum JobStatus{
        RECRUITED,
        RESIGNED
    }

    public enum OrderStatus{
            COMPLETED,
            PENDING_ASSIGNED,
            PENDING_NOT_ASSIGNED,
            CANCELLED
    }
}
