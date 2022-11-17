const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://username:pswd@cluster0.4ydhftd.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date, //  DD-MM-YYYY
    required: true,
  },
});

const User = mongoose.model("users", userSchema);

app.use(express.json());

// Create a user
app.post("/user", async (req, res) => {
  const { name, lastName, accountNumber, email, birthDate } = req.body;

  if (!name || !lastName || !accountNumber || !email || !birthDate) {
    return  {  statusCode: 400, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "please add All fields"}) } }
  }

  try {
    const user = new User({
      name,
      lastName,
      accountNumber,
      email,
      birthDate,
    });

    await user.save();
    return  {  statusCode: 200, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "User created"}) } }
  } catch (error) {
    console.log(error);
   return  {  statusCode: 500, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "Server Error"}) } }
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    return  {  statusCode: 200, headers: { "Content-Type": "application/json", body: JSON.stringify(users) } }
  } catch (error) {
    console.log(error);
   return  {  statusCode: 500, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "Server Error"}) } }
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ accountNumber: req.params.id });

    if (!user) return  {  statusCode: 404, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "User not found"}) } };

    res.json(user);
  } catch (error) {
    console.log(error);
   return  {  statusCode: 500, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "Server Error"}) } }
  }
});

app.get("/", (req, res) => {
  return  {  statusCode: 200, headers: { "Content-Type": "application/json", body: JSON.stringify({message: "Welcome!"}) } }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
