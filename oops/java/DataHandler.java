public abstract class DataHandler {
    // Native method to load data from external storage or system
    public native void loadData();

    // Native method to store data to external storage or system
    public native void storeData();
}

class UserDataHandler extends DataHandler {
    // Load user data from an external source (native implementation)
    public native void loadData();

    // Store user data to an external destination (native implementation)
    public native void storeData();
}

class OrderDataHandler extends DataHandler {
    // Load order data from an external source (native implementation)
    public native void loadData();

    // Store order data to an external destination (native implementation)
    public native void storeData();
}
