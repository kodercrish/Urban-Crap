package com.example.UC_Backend.HelperFunctionIO.getAvailableSA;

/**
 * This class is used to get all those agents which have the required skills
 */

import java.util.ArrayList;
import java.util.Arrays;

import com.example.UC_Backend.Users.ServiceAgent;

public class getAvailableSA{

    private ArrayList<ServiceAgent> agents = new ArrayList<>();

    public getAvailableSA() {}
    public getAvailableSA(ArrayList<ServiceAgent> agents) {

        this.agents=agents;
    }

    public ArrayList<ServiceAgent> findAvailableSA(String cartItem) {
        String service = cartItem;
        ArrayList<ServiceAgent> availableSA = new ArrayList<>();

        // TECHNICIAN
        if(service.substring(0,3).equals("ACA")){
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Technician"))
                {
                    availableSA.add(agent);
                }
            }
        }
        // ELECTRICIAN
        else if(service.substring(0,3).equals("ACE") || service.substring(0,3).equals("REE") || service.substring(0,3).equals("INE") || service.substring(0,2).equals("SE") || service.substring(0,3).equals("IE")){
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Electrician"))
                {
                    availableSA.add(agent);
                }
            }

        }
        //CARPENTER
        else if(service.substring(0,3).equals("REC") || service.substring(0,3).equals("INC") || service.substring(0,2).equals("SC") || service.substring(0,2).equals("IC")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Carpenter"))
                {
                    availableSA.add(agent);
                }
            }
        }

        //GARDENER
        else if(service.substring(0,2).equals("GA") || service.substring(0,2).equals("LA") || service.substring(0,1).equals("P")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Gardener"))
                {
                    availableSA.add(agent);
                }
            }
        }

        //PEST CONTROLLER
        else if(service.substring(0,2).equals("PC")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Pest Controller"))
                {
                    availableSA.add(agent);
                }
            }
        }

        //MENS STYLER
        else if(service.substring(0,2).equals("SM")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Mens Styler"))
                {
                    availableSA.add(agent);
                }
            } 
        }

        //WOMENS STYLER
        else if(service.substring(0,2).equals("SW")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Womens Styler"))
                {
                    availableSA.add(agent);
                }
            } 
        }

        //PAINTER
        else if(service.substring(0,1).equals("D")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Painter"))
                {
                    availableSA.add(agent);
                }
            }
        }

        //CLEANER
        else if(service.substring(0,1).equals("C")) {
            for(ServiceAgent agent: agents){
                if(Arrays.asList(agent.getSkill()).contains("Cleaner"))
                {
                    availableSA.add(agent);
                }
            }   
        }
        return availableSA;
    } 


}