package com.example.UC_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UcBackendApplication {

	// static {
    //     System.loadLibrary("RangeChecker");
    // }

	// public native ArrayList<String> getIndexFromMap(String customer_location, ArrayList<ServiceAgent> AgentsList);
	public static void main(String[] args) {
		SpringApplication.run(UcBackendApplication.class, args);
	}

}
