package com.example.UC_Backend.Extra;

import com.example.UC_Backend.Users.ServiceAgent;
import java.util.ArrayList;

public class RangeChecker{

    static{
        // System.setProperty("java.library.path", "/path/to/library");
        System.loadLibrary("RangeChecker");
    }

    public native ArrayList<String> getAgentsInRange(String customer_location, ArrayList<ServiceAgent> AgentsList);

};