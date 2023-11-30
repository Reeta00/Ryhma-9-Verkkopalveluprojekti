import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import user_icon from './assets/user.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';


export const Login = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form.Group className='custom-class'>
                        <div className='header text-center'>
                            <div className='text'>Rekisteröidy</div>
                        </div>

                        <Form>
                            <Form.Group className='input'>
                                <img src={user_icon} alt='' />
                                <Form.Control type='text' placeholder='Nimi' />
                            </Form.Group>

                            <Form.Group className='input'>
                                <img src={email_icon} alt='' />
                                <Form.Control type='email' placeholder='Sähköposti' />
                            </Form.Group>

                            <Form.Group className='input'>
                                <img src={password_icon} alt='' />
                                <Form.Control type='password' placeholder='Salasana' />
                            </Form.Group>

                            <div className='forgotten-password text-center'>
                                Unohditko salasanan? <button>Klikkaa tästä!</button>
                            </div>

                            <Row className='submit-container justify-content-center'>
                                <Col xs='auto' className='mb-2'>
                                    <Button className='submit btn-block' variant='success' size='lg'>
                                        Rekisteröidy
                                    </Button>
                                </Col>
                                <Col xs='auto' className='mb-2'>
                                    <Button className='submit btn-block' variant='success' size='lg'>
                                        Kirjaudu sisään
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};
