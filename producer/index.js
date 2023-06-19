console.log("producer");

import {MongoClient} from 'mongodb';
import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/studentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  timestamp: { type: Date, default: Date.now },
});

const student_collection2 = mongoose.model('student_collection2', studentSchema);

const url = 'mongodb://localhost:27017';
const db = 'studentsDB';
const collection = 'student_collection2';
let lastRecordId = null;



const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'university'
});


function queueMessage(result) {



  const event = { name: result.name, age: result.age, gender: result.gender };
  //const event = { ...result };
  const success = stream.write(eventType.toBuffer(event));  //publisher
  success ? console.log("successfully queued to the kafka...") : console.log("publishing failed")
  console.log(`queued message: ${JSON.stringify(event)}`)
  //console.log( typeof result._id)

}



  setInterval(() => {

      //changeStream();

      getLastRecordFromMongo()
      .then((result) => {
        if (result) {
          
          queueMessage(result);
          //console.log( typeof result._id)

        } 
      })
      .catch((error) => {
        console.error('Error retrieving last record from MongoDB:', error);
      });


    }, 4000);


// set the standalone collection to replica
async function changeStream() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useNewUrlParser: true });

    // Get the database and collection
    const db = client.db('studentsDB');
    const collection = db.collection('student_collection2');

    // Create a change stream on the collection
    const changeStream = collection.watch();

    // Listen for change events
    changeStream.on('change', (change) => {
      const newDocument = change.fullDocument;
      if (newDocument) {
        console.log('Latest record:', newDocument);
      }
    });

  } catch (error) {
    console.error('Error retrieving last record from MongoDB:', error);
  }
}



async function getLastRecordFromMongo() {
  try {
    // Check if the collection is empty
    const collectionEmpty = await student_collection2.countDocuments() === 0;

    if (collectionEmpty) {
      console.log('Collection is empty');
      return null;
    } else {
      // Find the newest document in the collection
      const result = await student_collection2.findOne({}, null, { sort: { $natural: -1 } }).lean();

      if (result && result._id.toString() === lastRecordId) {
        console.log('No new record');
        return null;
      } else {
        console.log('Latest record:', result);
        lastRecordId = result ? result._id.toString() : null;

        // Check if the record has name, age, and gender fields
        if (!result.name || !result.age || !result.gender) {

          console.log('Latest record has missing fields. Assigning null.');
          return {
            ...result,
            name: result.name || "null",
            age: result.age || "null",
            gender: result.gender || "null"
          };
          }

        return result;
      }
    }
  } catch (error) {
    console.error('Error retrieving last record from MongoDB:', error);
    return null;
  }
}

