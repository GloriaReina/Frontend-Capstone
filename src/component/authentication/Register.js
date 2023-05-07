import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("app_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <div class="register-page">
        <div id= "register"className="auth-form-container">
          <Container>
            <Row>
              <Col xs={10} sm={6} lg={4} md={8} className="register-container mx-auto">
                <Form className="register-form"onSubmit={handleRegister}>
                  <h1 className="register-heading">Register</h1>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"  
                      placeholder="Enter your name" 
                      onChange={updateUser}
                      required
                      autoFocus
                    />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        onChange={updateUser}
                        required
                        autoFocus
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
      
                  <Button 
                  variant="primary" 
                  type="submit" 
                  className="sign-in-button">
                    Register
                  </Button>
      
                  <Form.Group>
                  <Link to="/login" className="registration-link sansSerif">
                  Already a member?
                </Link>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        </div>
      );
}