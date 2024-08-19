import mongoose from "mongoose";
import { env } from "../env"; // Adjust the import based on your project structure

const clearDatabase = async () => {
  if (env.NODE_ENV !== "development") {
    console.error(
      "This script should only be run in a development environment."
    );
    process.exit(1);
  }

  try {
    // Connect to the database
    await mongoose.connect(env.DEV_DATABASE_URL);

    // Get all collections
    const collections = await mongoose.connection.db.collections();

    // Drop each collection
    for (let collection of collections) {
      await collection.drop();
    }

    console.log("All collections cleared.");
  } catch (error) {
    console.error("Error clearing collections:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
};

// Run the clear script
clearDatabase();
