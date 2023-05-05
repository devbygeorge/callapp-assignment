const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DB_FILE = "db.json";

app.use(express.json());

// Get persons from the database
app.get("/api/persons", (req, res) => {
  // Read the database file
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) {
      // If there is an error reading the file, handle it appropriately
      if (err.code === "ENOENT") {
        res.status(404).send("File not found");
      } else {
        console.error(err.message);
        res.status(500).send("Internal server error");
      }
    } else {
      // If file is read successfully, parse the JSON data and send it as a response
      const persons = JSON.parse(data);
      res.status(200).send(persons);
    }
  });
});

// Add a new person in the database
app.post("/api/person", (req, res) => {
  // Extract person data from request body
  const person = req.body;
  // generate unique ID
  const newUniqueId = new Date().getTime();

  // Read the database file
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) {
      // If there's an error reading the file, send a 500 error response
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      // Parse the persons data
      const persons = JSON.parse(data);
      // add new person with generated ID to the beginning of array
      persons.unshift({ ...person, id: newUniqueId });

      // Write the updated data to the database file
      fs.writeFile(DB_FILE, JSON.stringify(persons), (err) => {
        if (err) {
          // If there's an error writing to the file, send a 500 error response
          console.error(err.message);
          res.status(500).send("Internal server error");
        } else {
          // send response with generated ID
          res.status(200).send({ newUniqueId });
        }
      });
    }
  });
});

// Update an existing person in the database
app.put("/api/person", (req, res) => {
  // Get the updated person object from the request body
  const updatedPerson = req.body;

  // Read the database file
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) {
      // If there's an error reading the file, send a 500 error response
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      // Parse the persons data
      const persons = JSON.parse(data);
      // Map over the array and replace the existing person object with the updated one if the ids match
      const updatedPersons = persons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      );

      // Write the updated data to the database file
      fs.writeFile(DB_FILE, JSON.stringify(updatedPersons), (err) => {
        if (err) {
          // If there's an error writing to the file, send a 500 error response
          console.error(err.message);
          res.status(500).send("Internal server error");
        } else {
          // Send a success response
          res.status(200).send({ message: "success" });
        }
      });
    }
  });
});

// Delete a person with the specified id
app.delete("/api/person/:id", (req, res) => {
  // Extract person id from the request parameters
  const id = parseInt(req.params.id);

  // Read the database file
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) {
      // If there's an error reading the file, send a 500 error response
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      // Parse the persons data
      const persons = JSON.parse(data);
      // Filter out the person with the specified id
      const filteredPersons = persons.filter((person) => person.id !== id);

      // Write the updated data to the database file
      fs.writeFile(DB_FILE, JSON.stringify(filteredPersons), (err) => {
        if (err) {
          // If there's an error writing to the file, send a 500 error response
          console.error(err.message);
          res.status(500).send("Internal server error");
        } else {
          // Send a success response
          res.status(200).send({ message: "success" });
        }
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
