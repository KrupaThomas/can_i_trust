import React from 'react';

function Home() {
  return <div className="d-flex vh-100 text-center text-white bg-dark">
    
<div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header className="mb-auto">
    <div>
      <h3 className="float-md-start mb-0">Can i trust?</h3>
      <nav className="nav nav-masthead justify-content-center float-md-end">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
        <a className="nav-link" href="register">Register</a>
        <a className="nav-link" href="/login">Login</a>
        <a className="nav-link" href="#">Contact</a> 
      </nav>
    </div>
  </header>

  <main className="px-3">
    <h1>Yes! You can trust us.</h1>
    <p className="lead">Every popular brand has fake manufacturers selling a counterfeited item at cheaper rates. We will help you to find a product is genuin or not.</p>
    <p className="lead">
      <a href="/login" className="btn btn-lg btn-primary fw-bold">Login</a>
      <a href="/register" className="btn btn-lg btn-secondary fw-bold border-white bg-white ms-3">Register</a>
    </p>
  </main>

  <footer className="mt-auto text-white-50">
    <p>Created by BROCODERS for IEEE .hack</p>
  </footer>
</div>


    
  </div>;
}

export default Home;
