import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import PhotoContainer from './PhotoContainer';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    function authenticateUser() {
      const id = localStorage.getItem('_id');
      /*
        👇🏻 If ID is false, redirects the user to the login page
        */
      if (!id) {
        navigate('/');
      }
    }
    authenticateUser();
  }, [navigate]);

  useEffect(() => {
    //👇🏻 search can be anything
    socket.emit('allPhotos', 'search');
    socket.on("allPhotosMessage", (data) => {
      setPhotos(data.photos);
  });
  }, [socket]);

  return (
    <div>
      <Nav />
      <PhotoContainer photos={photos} socket={socket} />
    </div>
  );
};

export default Home;
