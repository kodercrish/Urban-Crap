// package com.example.UC_Backend;

// import com.example.UC_Backend.Extra.ExtraFunctions;

// /**
//  * Order class gives details of each order placed
//  */


// public class Order{
//     private int orderId;
//     private int customerId;
//     private record cuscoord(int x,int y){};
//     private int agentId;
//     private String[] time;//??????
//     ExtraFunctions func=new ExtraFunctions();
//     private ExtraFunctions.OrderStatus orderStatus;//Completed,cancelled,pending_assigned,pending_not_assigned

//     public Order(int customerId,int agentId){
//         this.customerId=customerId;
//         this.agentId=agentId;
//         this.orderId=func.generateID();
//     }



// }

package com.example.UC_Backend;

import com.example.UC_Backend.Extra.ExtraFunctions;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orders")
public class Order {
    private int orderId;
    private int customerId;
    private int agentId;
    private static class Coordinates {
        private int x;
        private int y;
    }
    private Coordinates cuscoord;
    private String[] time;
    private ExtraFunctions func = new ExtraFunctions();
    private ExtraFunctions.OrderStatus orderStatus;

    public Order(int customerId, int agentId) {
        this.customerId = customerId;
        this.agentId = agentId;
        this.orderId = func.generateID();
    }
}

