import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-bootstrap'
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("app_user")

    return (
        <Navbar className='navbar' expand="lg" bg="navbar-background" variant="dark" >
            <Navbar.Brand href="/" bsPrefix="navbar-brand-custom">Life Hack</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <NavLink  href="/" bsPrefix="nav-link-custom">HomePage</NavLink>
    
                    <NavLink  href="/tasks" bsPrefix="nav-link-custom"> Tasks</NavLink>
    
                    <NavLink href="/visuals"  bsPrefix="nav-link-custom">Visuals</NavLink>
                    
                    <NavLink href="/profile"  bsPrefix="nav-link-custom" >Profile</NavLink>
                    
                    
                    {isLoggedIn &&
                            <NavLink bsPrefix="nav-link-custom" to="/login" onClick={() => {
                                localStorage.removeItem("app_user")
                                navigate("/login", { replace: true })
                            }}>Logout</NavLink>
                    }
    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

