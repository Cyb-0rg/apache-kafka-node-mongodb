console.log("Catalyst");

import {MongoClient} from 'mongodb';
import mongoose from 'mongoose';


const url = 'mongodb://localhost:27017/studentsDB';

const names = ['DeMarcus', 'Jane', 'Kai', 'Emily', 'Ibrahim', 'Chad', 'Rakesh', 'Bob', 'Naseer'];
const ages = ['25', '30', '35', '40', '45', '50'];
const genders = ['Male', 'Female'];


// Set up the connection to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for the  document
const studentSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  timestamp: { type: Date, default: Date.now },
});

// Create the model for the  collection
const student_collection2 = mongoose.model('student_collection2', studentSchema);

function generateRandomPerson() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAge = ages[Math.floor(Math.random() * ages.length)];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];

  return {
    name: randomName,
    age: randomAge,
    gender: randomGender,
    timestamp: new Date(), // Include the current timestamp
  };
}



// Function to post an object to MongoDB
async function postObjectToMongo() {
  try {
    const randomPerson = generateRandomPerson();

    // Create a new instance of the model
    const newStudent = new student_collection2(randomPerson);

    // Save the object to the collection
    const result = await newStudent.save();
    console.log('Object posted to MongoDB:', result);
  } catch (error) {
    console.error('Error posting object to MongoDB:', error);
  }
}

// Function to get data from MongoDB
async function getDataFromMongo() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useNewUrlParser: true });

    // Get the database and collection
    const db = client.db('studentsDB');
    const collection = db.collection('student_collection2');

    // Find all documents in the collection
    const result = await collection.find().toArray();
    console.log('Data retrieved from MongoDB:', result);

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error('Error getting data from MongoDB:', error);
  }
}

setInterval(postObjectToMongo, 8000);

//setInterval(getDataFromMongo, 8000);