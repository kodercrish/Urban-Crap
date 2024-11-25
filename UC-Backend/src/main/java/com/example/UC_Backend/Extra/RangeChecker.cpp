#include <bits/stdc++.h>
#include <vector>
#include <jni.h>
#include "RangeChecker.h"
#include "Graph.h"
#include "Map.h"
#include "ShortestPathAlgo.h"

using namespace std;

typedef pair<int, int> Edge;

extern "C" JNIEXPORT jobject JNICALL Java_Helper_getAgentsInRange(JNIEnv *env, jobject obj, jstring javaString, jobject arrayList)
{
    map<string, int> fake_map;
    vector<vector<Edge> > graph;
    initializeMap(fake_map);
    initializeGraph(graph);

    const char *cString = env->GetStringUTFChars(javaString, nullptr);
    string cppString(cString);
    env->ReleaseStringUTFChars(javaString, cString);

    jclass arrayListClass = env->GetObjectClass(arrayList);
    jmethodID sizeMethod = env->GetMethodID(arrayListClass, "size", "()I");
    jmethodID getMethod = env->GetMethodID(arrayListClass, "get", "(I)Ljava/lang/Object;");

    // Step 2: Get ServiceAgent class and its fields
    jclass serviceAgentClass = env->FindClass("ServiceAgent");
    jfieldID idField = env->GetFieldID(serviceAgentClass, "id", "Ljava/lang/String;");
    jfieldID rangeField = env->GetFieldID(serviceAgentClass, "range", "I");
    jfieldID locationField = env->GetFieldID(serviceAgentClass, "location", "Ljava/lang/String;");

    // Step 3: Create a new Java ArrayList to store filtered ids
    jmethodID arrayListConstructor = env->GetMethodID(arrayListClass, "<init>", "()V");
    jobject filteredArrayList = env->NewObject(arrayListClass, arrayListConstructor);
    jmethodID addMethod = env->GetMethodID(arrayListClass, "add", "(Ljava/lang/Object;)Z");

    // Step 4: Get size of the input ArrayList
    jint size = env->CallIntMethod(arrayList, sizeMethod);

    // Step 5: Iterate over the input ArrayList and filter agents
    for (jint i = 0; i < size; i++)
    {
        jobject serviceAgentObj = env->CallObjectMethod(arrayList, getMethod, i);

        // Extract fields
        jstring id = (jstring)env->GetObjectField(serviceAgentObj, idField);
        jint range = env->GetIntField(serviceAgentObj, rangeField);
        jstring location = (jstring)env->GetObjectField(serviceAgentObj, locationField);

        const char *cId = env->GetStringUTFChars(id, nullptr);
        const char *cLocation = env->GetStringUTFChars(location, nullptr);

        // Step 6: Find the index of the customer location in the map
        auto it = fake_map.find(cppString);
        auto it2 = fake_map.find(cLocation);

        int result = findShortestPath(it->second, it2->second, graph, 27);

        // Filter based on range > 10
        if (range > result)
        {
            jstring idString = env->NewStringUTF(cId);
            env->CallBooleanMethod(filteredArrayList, addMethod, idString);
            env->DeleteLocalRef(idString);
        }

        // Clean up local references
        env->ReleaseStringUTFChars(id, cId);
        env->ReleaseStringUTFChars(location, cLocation);
        env->DeleteLocalRef(serviceAgentObj);
    }

    return filteredArrayList;
}
