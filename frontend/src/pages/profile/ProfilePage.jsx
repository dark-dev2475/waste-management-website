import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    address: '123 Waste St, Clean City',
    contactNumber: '123-456-7890',
    bio: '',
    goal: '',
    preferredPickupLocation1: '',
    preferredPickupLocation2: '',
    profileImage: 'https://via.placeholder.com/150',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file)); // Preview the image
      setUser({ ...user, profileImage: URL.createObjectURL(file) }); // Update profile image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle saving the user data
    console.log('User data saved:', user);
  };

  return (
    <Container className="profile-container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <img src={user.profileImage} alt="Profile" className="profile-image" />
              <h2 className="profile-name">{user.name}</h2>
              <Button variant="primary" onClick={() => alert('Edit functionality not implemented')}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Form */}
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={user.contactNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                name="bio"
                value={user.bio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGoal">
              <Form.Label>Goals</Form.Label>
              <Form.Control
                type="text"
                name="goal"
                value={user.goal}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPreferredPickupLocation1">
              <Form.Label>Preferred Pickup Location 1</Form.Label>
              <Form.Control
                type="text"
                name="preferredPickupLocation1"
                value={user.preferredPickupLocation1}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPreferredPickupLocation2">
              <Form.Label>Preferred Pickup Location 2</Form.Label>
              <Form.Control
                type="text"
                name="preferredPickupLocation2"
                value={user.preferredPickupLocation2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;