import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import user_icon from './assets/user.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';



export const Login = () => {

    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [userIdentifier, setUserIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [showLogoutButton, setShowLogoutButton] = useState(true);

    const [isRegistrationMode, setIsRegistrationMode] = useState(true);

    axios.defaults.withCredentials = true;


    const register = () => {

        if (!usernameReg || !emailReg || !passwordReg) {
            setRegisterStatus({ message: "Käyttäjänimi, sähköposti ja salasana eivät voi olla tyhjiä", type: 'error' });
            return;
        }

        axios.post('http://localhost:3001/register', {
            user_name: usernameReg,
            user_email: emailReg,
            user_password: passwordReg
        }).then((response) => {
            console.log(response);
            setUsernameReg('');
            setEmailReg('');
            setPasswordReg('');
            setRegisterStatus({ message: "Rekisteröityminen onnistui! Nyt voit kirjautua sisään", type: 'success' });
        }).catch((error) => {
            console.error('Error registering:', error);
            setRegisterStatus({ message: "Rekisteröityminen epäonnistui", type: 'error' });
        });
    };

    const login = () => {
        axios.post('http://localhost:3001/login',
            {
                user_identifier: userIdentifier,
                user_password: password

            }).then((response) => {

                if (response.data.loggedIn) {
                    setLoginStatus(response.data.user_name);
                    setUserIdentifier('');
                    setPassword('');
                    setShowLogoutButton(true);
                } else {
                    setLoginStatus(response.data.message);
                    setShowLogoutButton(false);
                }
            }).catch((error) => {
                console.error('Error during login', error);
            });
    };


    useEffect(() => {
        axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user_name[0].user_name)
            }
        }).catch((error) => {
            console.error('Error checking login status:', error);
        });
    }, []);

    const logout = () => {
        axios.post('http://localhost:3001/logout')
            .then((response) => {
                if (response.data.loggedIn === false) {
                    setLoginStatus('');
                }
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    const toggleMode = () => {
        setIsRegistrationMode(!isRegistrationMode);
    };


    return (

        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form.Group className='custom-class registration-form'>
                        <div className='header text-center'>
                            <div className='text'>{isRegistrationMode ? 'Rekisteröidy' : 'Kirjaudu sisään'}</div>
                        </div>

                        <Form>
                            {isRegistrationMode && (
                                <>
                                    <Form.Group className='input'>
                                        <img src={user_icon} alt='' />
                                        <Form.Control type='text' placeholder='Luo käyttäjänimi' value={usernameReg} onChange={(e) => setUsernameReg(e.target.value)} autoComplete="off" />
                                    </Form.Group>

                                    <Form.Group className='input'>
                                        <img src={email_icon} alt='' />
                                        <Form.Control type='email' placeholder='Sähköposti' value={emailReg} onChange={(e) => setEmailReg(e.target.value)} autoComplete="off" />
                                    </Form.Group>

                                    <Form.Group className='input'>
                                        <img src={password_icon} alt='' />
                                        <Form.Control type='password' placeholder='Luo salasana' value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} autoComplete="off" />
                                    </Form.Group>

                                    {!isRegistrationMode && (
                                        <>
                                            <Form.Group className='input'>
                                                <img src={user_icon} alt='' />
                                                <Form.Control type='text' placeholder='Syötä käyttäjänimi tai sähköpostiosoite' value={userIdentifier} onChange={(e) => setUserIdentifier(e.target.value)} autoComplete="off" />
                                            </Form.Group>

                                            <Form.Group className='input'>
                                                <img src={password_icon} alt='' />
                                                <Form.Control type='password' placeholder='Syötä salasana' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                                            </Form.Group>

                                            <Row className='submit-container justify-content-center'>
                                                <Col xs='auto' className='mb-2'>
                                                    <Button className='submit btn-block' variant='primary' size='lg' onClick={login}>
                                                        Kirjaudu sisään
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    )}



                                    <Row className='submit-container justify-content-center'>
                                        <Col xs='12' md='6' className='mb-2 text-center'>
                                            <div className={registerStatus.type === 'error' ? 'red-text' : 'green-text'}>
                                                {registerStatus.message}
                                            </div>
                                            <Button className='submit btn-block' variant='primary' size='lg' onClick={isRegistrationMode ? register : login}>
                                                {isRegistrationMode ? 'Rekisteröidy' : 'Kirjaudu sisään'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {!isRegistrationMode && (
                                <>
                                    <Form.Group className='input'>
                                        <img src={user_icon} alt='' />
                                        <Form.Control type='text' placeholder='Syötä käyttäjänimi tai sähköpostiosoite' value={userIdentifier} onChange={(e) => setUserIdentifier(e.target.value)} autoComplete="off" />
                                    </Form.Group>

                                    <Form.Group className='input'>
                                        <img src={password_icon} alt='' />
                                        <Form.Control type='password' placeholder='Syötä salasana' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                                    </Form.Group>

                                    <Row className='submit-container justify-content-center'>
                                        <Col xs='auto' className='mb-2'>
                                            <Button className='submit btn-block' variant='primary' size='lg' onClick={login}>
                                                Kirjaudu sisään
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {loginStatus && (
                                <div className={loginStatus.includes("Väärä käyttäjänimi tai salasana") || loginStatus.includes("Käyttäjää ei löydy") ? 'red-text' : ''} style={{ marginTop: '20px', textAlign: 'center' }}>

                                    <h4>{loginStatus}</h4>
                                    {showLogoutButton && (
                                        <Button className='submit btn-block' variant='primary' size='lg' onClick={logout}>
                                            Kirjaudu ulos
                                        </Button>
                                    )}
                                </div>
                            )}


                            <Row className='text-center mt-3'>
                                <Col>
                                    <Button variant='link' style={{ color: 'white' }} onClick={toggleMode}>
                                        {isRegistrationMode ? 'Onko sinulla jo tili? Kirjaudu sisään.' : 'Eikö sinulla ole vielä tiliä? Rekisteröidy tästä.'}
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