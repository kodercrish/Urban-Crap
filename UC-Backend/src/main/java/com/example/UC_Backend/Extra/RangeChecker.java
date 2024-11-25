package com.example.UC_Backend.Extra;

import java.util.ArrayList;

import com.example.UC_Backend.Users.ServiceAgent;

public class RangeChecker{

    static{
        // System.setProperty("java.library.path", "/path/to/library");
        System.loadLibrary("libRangeChecker");
    }

    public native ArrayList<String> getAgentsInRange(String customer_location, ArrayList<ServiceAgent> AgentsList);

    // public static void main(String[] args) {
    //     ArrayList<ServiceAgent> agentsList = new ArrayList<ServiceAgent>();
    //     agentsList.add(new ServiceAgent("Hitanshu", "Hitanshu.Seth@iiitb.ac.in", "12345", new String[]{"Toilet Cleaner"}, 100, "Electronic City"));
    //     agentsList.add(new ServiceAgent("Deore", "Deore@iiitb.ac.in", "isuckcock", new String[]{"Male Stripper", "Chess"}, 100, "M G Road"));

    //     System.out.println("Hello, World!");
    // }

};