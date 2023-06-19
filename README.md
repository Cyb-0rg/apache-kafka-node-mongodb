# Apache-Kafka Node Mongodb 
##  Producer - Consumer application

## Description

This project is a Node.js and Docker application that implements a producer-consumer architecture using Apache Kafka and MongoDB. It allows you to generate and consume data through Kafka topics and display it to real time data processing.

The application is divided into two main components:
- Producer: The producer application generates data and sends it to Kafka topics. It is responsible for producing messages.
- Consumer: The consumer application subscribes to Kafka topics, consumes the messages, and console logs it.
- Catalyst: The catalyst application updates the mongo collection, creates new registry periodically, and stores them in a MongoDB database.

pic here!

## Purpose

The Apache-Kafka Node MongoDB Producer-Consumer application serves the purpose of providing real-time updates for a school database. It consists of three main components: the producer, the consumer, and the catalyst.

- Producer: The producer component is responsible for generating new student records and sending them to Kafka topics. These student records represent new enrollments in the school database. The producer ensures that any changes made to the student records are immediately captured and sent to the Kafka topics, enabling real-time updates.

- Consumer: The consumer component subscribes to the Kafka topics and consumes the messages sent by the producer. It receives the student records and processes them accordingly to ensure that the school database stays updated in real time. The consumer plays a critical role in capturing the changes made to the student records and applying them to the database, ensuring that all relevant data is up to date.

- Catalyst: The catalyst component is responsible for updating the school database based on the received student records. The catalyst ensures that the database remains synchronized with the latest student information, triggering any changes made to the producer and consumer components.

By leveraging Kafka's distributed architecture, the application achieves scalability and fault tolerance. Kafka enables multiple instances of the consumer and catalyst components to run in parallel, allowing for high throughput and fault tolerance in case of failures. This ensures that even under heavy load or in the event of failures, the application can continue to process student records and keep the school database synchronized in real time.


## Setup and Usage

To run the project, follow these steps:

1. Install the required dependencies by running the following command:


## Run 
### Run the project with the following commands


<pre>
    docker-compose up
</pre>

make sure that the program excutes all 3 containers effectively, like this:
![image](https://github.com/Cyb-0rg/apache-kafka-node-mongodb/assets/50844224/91fcaf57-b01c-47a6-bbe5-329ac7b23e5d)


### Optional command; in case kafka image fails to recognize the topic, you may execute this command to create a new topic [university].
<pre>
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --create --topic university --replication-factor 1 --partitions 1 --bootstrap-server kafka:9092
</pre>


### This nodejs project was developed using [Node version 19] and [npm version 9]

<pre>
    npm install 
</pre>

catalyst creates the first records to the collection; also updates the collction by adding a new record every 10 sec or so.

<pre>
    npm run start:catalyst
</pre>

wait for 10 sec and run:

<pre>
    npm run start:consumer
</pre>

then:

<pre>
    npm run start:producer
</pre>

### Note: these npm run commands should be in three different terminals(consoles)


<pre>
    docker logs <container_name/ID>
</pre>

## Dependencies

The project was developed using Node.js version 19 and npm version 9. Ensure you have these versions installed before running the project. (Check out the package.json file for full details)

 - mongoose and mongodb 
 - node-rdkafka 
 - avsc

## Additional Notes

Please note that this project assumes you have Docker and Docker Compose installed on your system. Ensure that your environment meets these requirements before proceeding with the setup.

Feel free to explore the code and customize it according to your needs. Enjoy using the Apache Kafka Node MongoDB Producer-Consumer application!

![Screenshot](path/to/screenshot.png)





