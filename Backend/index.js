const express = require("express");
const cors = require("cors");
const mongoose = require("./connection"); 
const Post = require("./model"); 

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;

    const newPost = new Post({ title, content, img_url });

    await newPost.save();

    res.status(201).send({ message: "Post entry added successfully" });
  } catch (error) {
    console.error("Error adding post entry:", error);
    res.status(500).send({ message: "Error adding post entry" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error("Error retrieving post entries:", error);
    res.status(500).send({ message: "Error retrieving post entries" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, img_url },
      { new: true }
    );

    res.send({ message: "Post entry updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post entry:", error);
    res.status(500).send({ message: "Error updating post entry" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndDelete(id);

    res.send({ message: "post entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting post entry:", error);
    res.status(500).send({ message: "Error deleting post entry" });
  }
});
