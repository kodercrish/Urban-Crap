#include "headers/Operations.h"
#include <iostream>
#include <cmath>
#include <unordered_map>

// Haversine formula to calculate distance between two geo-coordinates
double haversine(double lat1, double lon1, double lat2, double lon2) {
    const int EARTH_RADIUS = 6371; // Radius of the Earth in kilometers
    double dlat = (lat2 - lat1) * M_PI / 180.0;
    double dlon = (lon2 - lon1) * M_PI / 180.0;
    double a = sin(dlat / 2) * sin(dlat / 2) + cos(lat1 * M_PI / 180.0) * cos(lat2 * M_PI / 180.0) * sin(dlon / 2) * sin(dlon / 2);
    double c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return EARTH_RADIUS * c; // Return distance in kilometers
}

// Authentication method (keep it as is)
JNIEXPORT jboolean JNICALL Java_Operations_authenticate(JNIEnv *env, jobject obj, jstring username, jstring password) {
    const char *user = env->GetStringUTFChars(username, 0);
    const char *pass = env->GetStringUTFChars(password, 0);
    bool authSuccess = (std::string(user) == "admin" && std::string(pass) == "12345");
    env->ReleaseStringUTFChars(username, user);
    env->ReleaseStringUTFChars(password, pass);
    return authSuccess;
}

// Method to find available agents based on location and service range
JNIEXPORT jobjectArray JNICALL Java_Operations_getAvailableAgents(JNIEnv *env, jobject obj, jobject customerLocation, jobjectArray agents) {
    // Extract customer coordinates (latitude and longitude)
    jclass tupleClass = env->GetObjectClass(customerLocation);
    jmethodID getLatitudeMethod = env->GetMethodID(tupleClass, "getLatitude", "()D");
    jmethodID getLongitudeMethod = env->GetMethodID(tupleClass, "getLongitude", "()D");
    double customerLat = env->CallDoubleMethod(customerLocation, getLatitudeMethod);
    double customerLon = env->CallDoubleMethod(customerLocation, getLongitudeMethod);

    // Prepare the available agents list
    jsize agentCount = env->GetArrayLength(agents);
    std::vector<jobject> availableAgents;

    // Iterate over all agents
    for (jsize i = 0; i < agentCount; ++i) {
        jobject agent = env->GetObjectArrayElement(agents, i);
        jclass agentClass = env->GetObjectClass(agent);
        jmethodID getAgentLocationMethod = env->GetMethodID(agentClass, "getLocation", "()LOrder$Tuple;");
        jobject agentLocation = env->CallObjectMethod(agent, getAgentLocationMethod);
        jmethodID getAgentLatitudeMethod = env->GetMethodID(tupleClass, "getLatitude", "()D");
        jmethodID getAgentLongitudeMethod = env->GetMethodID(tupleClass, "getLongitude", "()D");
        double agentLat = env->CallDoubleMethod(agentLocation, getAgentLatitudeMethod);
        double agentLon = env->CallDoubleMethod(agentLocation, getAgentLongitudeMethod);

        // Get agent's service range
        jmethodID getServiceRangeMethod = env->GetMethodID(agentClass, "getServiceRange", "()D");
        double serviceRange = env->CallDoubleMethod(agent, getServiceRangeMethod);

        // Calculate distance from customer to agent
        double distance = haversine(customerLat, customerLon, agentLat, agentLon);

        // If the agent is within the service range, add to available agents
        if (distance <= serviceRange) {
            availableAgents.push_back(agent);
        }
    }

    // Convert available agents list to a jobjectArray
    jobjectArray availableAgentsArray = env->NewObjectArray(availableAgents.size(), agentClass, nullptr);
    for (size_t i = 0; i < availableAgents.size(); ++i) {
        env->SetObjectArrayElement(availableAgentsArray, i, availableAgents[i]);
    }
    return availableAgentsArray;
}
