import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});


app.post("/", async (req, res) => {
  try{
    const userType = req.body.type;
    const userParticipants = req.body.participants;
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${userType}&participants=${userParticipants}`);
    const result = response.data;
    const mathRandom = Math.floor(Math.random()* result.length);
    res.render("index.ejs",{
      participants:userParticipants,
      type:userType,
      data: result[mathRandom]
    })
  }catch (error){
    let errorcase = ""
    if (error.response.status === 404){
      errorcase = "Nothing matching with your criteria!"

    }else{
      errorcase = `Failed to make request:", ${error.message}`

    }
    res.render("index.ejs",{
      error:errorcase
    })
  }

  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
