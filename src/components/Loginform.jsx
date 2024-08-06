import { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import logo from '../Logo.png'
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function Loginform() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log('false');
            setValidated(true);
        }
        else{
            setEmail('');
            setPassword('');
            const userObject = {
                email: email,
                password: password
            }
            console.log(userObject);
            Axios.post('http://localhost:5001/use/login', userObject)
                .then( res =>{
                    localStorage.setItem('auth', JSON.stringify(res.data));
                    navigate("/statistics");
                    if(res.data === 'Email Not Exist'){
                        toast.error("Email Not Exist !", {
                           position: "top-center"
                        });
                    }
                    else{
                        toast.success("Login Successfully", {
                            position: "top-center"
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Invalid User Details", {
                        position: "top-center"
                    });
                })
        }
    };
  return (
    <>
    <ToastContainer />
    <Container fluid className="login-section">
        <Row className="align-content-center justify-content-center" style={{height: "100vh"}} >
        <Col md={4} className='bg-white px-5 py-3'>
                <img src={logo} alt="logo" style={{width:"150px"}} className='d-block m-auto'></img>
                <h4>Sign In</h4>
                <Form noValidate validated={validated} onSubmit ={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="login-email">
                                <InputGroup hasValidation>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    name="login-email"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="login-password">
                                <Form.Control
                                type="password"
                                placeholder="Password"
                                required onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name="login-password"/>
                                <Form.Control.Feedback type="invalid">
                                Please enter a Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit"><i className="fa fa-fw fa-sign-in-alt mr-1"></i>Sign In</Button>
                </Form>
                <div className='btn-section my-3'>
                    <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1 float-left" to="/reset-password">
                        <i className="fa fa-exclamation-triangle text-muted mr-1"></i> Forgot password
                    </Link>
                    <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1 float-right" to="/register">New Account</Link>
                </div>
                
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Loginform