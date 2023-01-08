import React from 'react';
import ReactDOM from 'react-dom';
import { getAuth, SAMLAuthProvider, signOut } from "firebase/auth";
import { app, db } from './firebaseConfig';
import { setDoc, collection, doc , getDocs, getDoc } from "firebase/firestore"; 
import { Navigate, useNavigate } from "react-router-dom";
import { useState,  useEffect } from 'react';
import { Loading } from './Loading';


function EditProduct() {    
    const auth = getAuth(app);
    const user = auth.currentUser;
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState();
    const [photoURL, setPhotoURL] = useState();    
    const [products, setProducts] = useState([]);

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            navigate("/login");
        }else{
            setDisplayName(user.displayName);
            setPhotoURL(user.photoURL);
        }
    });
 
    const getProducts = async () => {
        const productsCollRef = collection(db, 'products');
        const data = await getDocs(productsCollRef);
        setProducts(data.docs.map((doc) =>{
            if(doc.data().user == auth.currentUser.uid){
                return {...doc.data(), id:doc.id}
            }
            return null;
        }));
    }

    useEffect(() => {
        
        getProducts();
    }, []);

    function getProdutURL(id){
        return '/products/'+id;
    }

    async function addProduct(){
        const data = {
            name: document.getElementById('productName').value,
            desc: document.getElementById('productDesc').value,
            mrp: document.getElementById('productMRP').value,
            user: auth.currentUser.uid,
            last: auth.currentUser.uid
        }

        const docRef = doc(collection(db, 'products'));
        
        await setDoc(docRef,data).then(() => {
            document.getElementById('productName').value = "";
            document.getElementById('productDesc').value = "";
            document.getElementById('productMRP').value = "";
            getProducts();
        });
    }

    function _signOut(){
        signOut(auth)
    }
    return (
    <div className='d-flex '>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100" id="sidebar">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Dashboard</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/dashboard" className="nav-link" aria-current="page">
                        <i className='fa fa-user me-2'></i> Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/edit-products" className="nav-link active" aria-current="page">
                        <i className='fa fa-box-open me-2'></i> Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className='fa fa-money-check-alt me-2'></i>  Transactions
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link text-white">
                        <i className='fa fa-info-circle me-2'></i>  Help
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={photoURL} alt="" width="32" height="32" className="rounded-circle me-2"/>
                    <strong>{displayName}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Help</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" onClick={_signOut} >Sign out</a></li>
                </ul>
            </div>
        </div>
                <div className='container m-5 w-100'>
            <div>
                <button className='btn btn-primary' type="button" data-bs-toggle="modal" data-bs-target="#productModel">Add product</button>
                <div className="row mt-5">
                    {products.map((doc) => {
                        if(doc){
                            return (
                                <div class="col-lg-6 col-md-12 mt-3">
                                    <div class="card border-dark">
                                        <div class="card-body bg-dark">
                                            <h5 class="card-title">{doc.name}</h5>
                                            <p class="card-text m-0">{doc.desc}</p>
                                            <p className='m-0'>MRP: {doc.mrp}</p>
                                            <p className='m-0'>Link: <a href={getProdutURL(doc.id)}>{getProdutURL(doc.id)}</a></p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <div>
                
            </div>
        </div>
        <div className="modal fade" id="productModel" tabindex="-1" aria-labelledby="productModelLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="productModelLabel">Add Product</h5>
                        <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating">
                            <input type="text" className="form-control bg-dark text-white" id="productName"/>
                            <label htmlFor="productName">Name</label>
                        </div>
                        <div className="form-floating mt-3">
                            <textarea className="form-control bg-dark text-white" id="productDesc"></textarea>
                            <label htmlFor="productDesc">Desc</label>
                        </div>                
                        <div className="form-floating mt-3">
                            <input type="number" className="form-control bg-dark text-white" id="productMRP"/>
                            <label htmlFor="productMRP">MRP</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={addProduct}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );


}

export default EditProduct;
