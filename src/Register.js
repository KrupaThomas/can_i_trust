import React, { useEffect, useState } from 'react';
import { app, db } from './firebaseConfig';
import { getAuth, signInWithPopup , GoogleAuthProvider, signOut  } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { setDoc, collection, doc, addDoc, getDoc } from "firebase/firestore"; 
import { showLoading } from './Loading';
import { useAuth } from './Contexts/AuthContext';

function Register(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repassword, setRepassword] = useState()

    const { loginWithGoogle, signupWithEmail, isLoading, isLogged } = useAuth()
    
    const navigate = useNavigate();

    function registerWithEmail(){
        if(password === repassword){
            signupWithEmail(email, password).then(result => {
                
            }).catch(err =>{
                alert(err)
            })
        }else{
            alert("Passwords are not match!")
        }
    }

    function registerWithGoogle(){
        loginWithGoogle().then(result => {

        }).catch(err => {
            alert(err)
        })
    }

    useEffect(() => {
        if(isLogged){
            navigate('/dashboard')
        }
    }, [isLogged])

    return (
        <div className="d-flex vh-100 text-center text-white bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-start mb-0">Shadow</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <a className="nav-link" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">Register</a>
                            <a className="nav-link active" href="#">Login</a>
                            <a className="nav-link" href="#">Contact</a>
                        </nav>
                    </div>
                </header>
                <main className="px-3">
                    <h1>Register</h1>
                    <div  className='mx-5 px-5'>
                        <div className="form-floating">
                            <input type="email" className="form-control bg-dark text-white" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
                            <label for="floatingInput"><i className='fa fa-envelope me-1'></i> Email address</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" className="form-control bg-dark text-white" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <label for="floatingPassword"><i className='fa fa-lock me-1'></i> Password</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" className="form-control bg-dark text-white" id="floatingPassword" placeholder="Password" onChange={(e) => setRepassword(e.target.value)}/>
                            <label for="floatingPassword"><i className='fa fa-lock me-1'></i> Re-Enter Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mt-3" onClick={registerWithEmail}>Register</button>
                    <hr />
                    <button className="w-100 btn btn-lg btn-success" onClick={registerWithGoogle}>Register with  <i className='fab fa-google'></i></button>
                    <p className='mt-3'>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </main>
                <footer className="mt-auto text-white-50">
                    <p>Created by BROCODERS for IEEE .hack</p>
                </footer>
            </div>    
        </div>
    );
}

export default Register;
