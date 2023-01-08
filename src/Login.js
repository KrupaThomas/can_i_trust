import React from 'react';
import { app, db } from './firebaseConfig';
import { getAuth, signInWithPopup , GoogleAuthProvider, signOut  } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { setDoc, collection, doc, addDoc, getDoc } from "firebase/firestore"; 
import { showLoading } from './Loading';

function Login() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const user = auth.currentUser;
    const navigate = useNavigate();

    async function loginWithGoogle(){
        await signInWithPopup (auth, provider).then((result) => {
            const userDocRef = doc(collection(db, 'users'), result.user.uid);
            getDoc(userDocRef).then((doc) => {
                if(doc.exists()){
                    navigate("/dashboard");
                }else{
                    signOut(auth);
                    alert('register first');
                }
            }).catch((error) => {
                alert(error);
            });
        }).catch((error) =>{
            alert(error)
        });
    }

    if(!user){
        return (<div className="d-flex vh-100 text-center text-white bg-dark">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <div>
                        <h3 className="float-md-start mb-0">Can i trust?</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <a className="nav-link" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">Register</a>
                            <a className="nav-link active" href="#">Login</a>
                            <a className="nav-link" href="#">Contact</a>
                        </nav>
                    </div>
                </header>
                <main className="px-3">
                    <h1>Login</h1>
                    <div className='m-5 px-5'>
                        <form>
                            <div className="form-floating">
                                <input type="email" className="form-control bg-dark text-white" id="floatingInput" placeholder="name@example.com"/>
                                <label htmlFor="floatingInput"><i className='fa fa-envelope me-1'></i> Email address</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="password" className="form-control bg-dark text-white" id="floatingPassword" placeholder="Password"/>
                                <label htmlFor="floatingPassword"><i className='fa fa-lock me-1'></i> Password</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
                        </form>
                        <hr />
                        <button className="w-100 btn btn-lg btn-success" onClick={loginWithGoogle}>Login with <i className='fab fa-google'></i></button>
                        <p className='mt-3'>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </main>
                <footer className="mt-auto text-white-50">
                    <p>Created by BROCODERS for IEEE .hack</p>
                </footer>
            </div>    
        </div>);
    }else{
        return <Navigate to='/dashboard'/>
    }
}


export default Login;
