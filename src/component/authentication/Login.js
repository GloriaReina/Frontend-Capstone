import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("john@example.com");
  const [pass, setPass] = useState("123456");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "app_user",
            JSON.stringify({
              id: user.id,
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <div class="login-page">
    <div id= "login"className="auth-form-container">
      <Container>
        <Row>
          <Col xs={10} sm={6} lg={4} md={8} className="login-container mx-auto">
            <Form className="login-form" onSubmit={handleLogin}>
              <h1 className="login-heading">Login </h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(evt) => set(evt.target.value)}
                  className="form-control"
                  placeholder="Email address"
                  required
                  autoFocus
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={pass}
                  onChange={(evt) => setPass(evt.target.value)}
                  placeholder="********"
                  required
                  autoFocus
                />
              </Form.Group>
  
              <Button 
              variant="primary" 
              type="submit" 
              className="sign-in-button">
                Submit
              </Button>

              <Form.Group>
              <Link to="/register" className="registration-link sansSerif">
                Not a member yet?
              </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
  
};
