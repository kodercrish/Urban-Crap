#include "headers/UserDataHandler.h"
#include <iostream>
#include <fstream>

void UserDataHandler::loadData() {
    std::ifstream inFile("userData.txt");
    if (inFile.is_open()) {
        std::string line;
        while (getline(inFile, line)) {
            std::cout << "Loaded user data: " << line << std::endl;
        }
        inFile.close();
    } else {
        std::cerr << "Unable to open user data file." << std::endl;
    }
}

void UserDataHandler::storeData() {
    std::ofstream outFile("userData.txt", std::ios::app);
    if (outFile.is_open()) {
        outFile << "Sample user data" << std::endl;
        outFile.close();
        std::cout << "User data stored successfully." << std::endl;
    } else {
        std::cerr << "Unable to open file to store user data." << std::endl;
    }
}
