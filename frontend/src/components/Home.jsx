import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress, Container, Grid, Box } from '@mui/material';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(response => {
        setPosts(response.data.length > 0 ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleUpdateClick = (post) => {
    navigate(`/add/${post._id}`, { state: { post } });
  };

  const handleDeleteClick = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== id));
        alert('Post entry deleted successfully');
      })
      .catch(err => {
        console.error('Error deleting post:', err);
        setError('Error deleting post');
      });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container >
      <Box sx={{marginTop:'10%'}} mt={4}>
        {posts.length > 0 ? (
          <Grid container spacing={4}>
            {posts.map(post => (
              <Grid item key={post._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.img_url}
                    alt={`Image for ${post.title}`}
                  />
                  <CardContent>
                    
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginRight: '5px' }}
                        onClick={() => handleUpdateClick(post)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteClick(post._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6">No data to show</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
