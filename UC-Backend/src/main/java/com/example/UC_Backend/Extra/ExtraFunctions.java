package com.example.UC_Backend.Extra;

import java.util.Random;

/**
 * This class is used for generating random ID's
 */

public class ExtraFunctions {

    public int generateID() {
        Random random = new Random();
        int id = 10000 + random.nextInt(90000); // Ensures a 5-digit number
        return id;
    }
}
