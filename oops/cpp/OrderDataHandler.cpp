#include <jni.h>
#include <iostream>
#include "OrderDataHandler.h"

// A basic in-memory store for order data
std::unordered_map<int, std::string> orderData = {
    {1001, "Electrical repair"},
    {1002, "Plumbing repair"},
    {1003, "House cleaning"}
};

JNIEXPORT void JNICALL Java_OrderDataHandler_loadData(JNIEnv *env, jobject obj) {
    std::cout << "Loading order data..." << std::endl;
    // Simulate loading each order
    for (const auto& order : orderData) {
        std::cout << "Order ID: " << order.first << " - Description: " << order.second << std::endl;
    }
}

JNIEXPORT void JNICALL Java_OrderDataHandler_storeData(JNIEnv *env, jobject obj) {
    std::cout << "Storing order data..." << std::endl;
    // Normally would involve writing to a database or file
    for (const auto& order : orderData) {
        std::cout << "Storing Order ID: " << order.first << " - Description: " << order.second << std::endl;
    }
}
