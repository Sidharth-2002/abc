import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (location.state && location.state.post) {
      setInputs({
        title: location.state.post.title,
        content: location.state.post.content,
        img_url: location.state.post.img_url,
      });
      setIsUpdate(true);
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const apiUrl = isUpdate 
      ? `http://localhost:3001/update/${location.state.post._id}` 
      : 'http://localhost:3001/add';
    
    const method = isUpdate ? 'put' : 'post';

    try {
      const response = await axios({
        method,
        url: apiUrl,
        data: inputs,
      });
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
          />
          <Button variant="contained" color="secondary" type="submit">
            {isUpdate ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
