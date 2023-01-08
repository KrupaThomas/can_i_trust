import React from 'react';
import { app, db } from './firebaseConfig';
import { getAuth  } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc , doc, setDoc, updateDoc, collection} from 'firebase/firestore';
import { useState, useEffect } from 'react/cjs/react.development';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';


function Transaction() {
    
    let { id } = useParams();

    const auth = getAuth(app);
    const user = auth.currentUser;
    
    const navigate = useNavigate();

    const [lastTrans, setLastTrans] = useState();
    const [curUserInfo, setCurUserInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [productInfo, setProductInfo] = useState([]);

    
    useEffect(() => {
        const getProductInfo = async () =>{
            const producDocRef = doc(db, "products", id);
            await getDoc(producDocRef).then((doc) => {

                const data = {...doc.data()}
                setProductInfo(data);
            });
        }
        getProductInfo();
    })

    async function getCurUserInfo(uid){
        const userDocRef = doc(db, 'users', uid);
        await getDoc(userDocRef).then((curUser) => {
            const data = {...curUser.data(), id: curUser.id}
            setCurUserInfo(data);
        }).catch((error) => {
            alert(error);
        })
    }

    async function getUserInfo(){
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await getDoc(userDocRef).then((doc) => {
            const data = {...doc.data(), id: doc.id}
            setUserInfo(data);
        }).catch((error) => {
            alert(error);
        })
    }

    async function payment(){
        const transDocRef = doc(collection( db, 'transactions'));
        var lastTransId = ""
        var success = true;
        const data = {
            product: id,
            from: curUserInfo.id,
            to: userInfo.id,
            prev: lastTrans,
            next: ""
        }
        await setDoc(transDocRef, data).then((tdoc) => {
            lastTransId = transDocRef.id;
        }).catch((error) => {
            alert(error);
            success = false;
        })
        const productDocRef = doc(db, 'products', id);
            updateDoc(productDocRef, {last: userInfo.id}).then((pdoc) => {

            }).catch((error) => {
                alert(error);
            success = false;

            });
        if(success){
            alert('Payment Success')
        }
    }

    auth.onAuthStateChanged(async (user) => {
        if(!user){
            navigate('/login');
        }else{
            const producDocRef = doc(db, 'products', id);
            await getDoc(producDocRef).then((product) => {
                const last = product.data().last;
                setLastTrans(last);
                getCurUserInfo(last);
            }).catch((error) => {
                alert(error);
            })
            getUserInfo();
        }
    });

  return (
      <div className='vh-100 p-5'>
          <div class="card border-dark">
            <div class="card-body bg-dark">
                <h5 class="card-title">{productInfo.name}</h5>
                <p class="card-text m-0">{productInfo.desc}</p>
                <p className='m-0'>MRP: {productInfo.mrp}</p>
                <hr />
                <p>Current owner details</p>
                <p className='m-0'><span className='text-muted'>Current User:</span> {curUserInfo.name} ({curUserInfo.desc})</p>
                <p className='m-0'><span className='text-muted'>Transaction Method:</span> {curUserInfo.transactionMethod}</p>
                <p className='m-0'><span className='text-muted'>UPI:</span> {curUserInfo.upi}</p>
                <hr />
                <p>My details</p>
                <p className='m-0'><span className='text-muted'>User:</span> {userInfo.name} ({userInfo.desc})</p>
                <p className='m-0'><span className='text-muted'>Transaction Method:</span> {userInfo.transactionMethod}</p>
                <p className='m-0'><span className='text-muted'>UPI:</span> {userInfo.upi}</p>
                <hr />
                <button className='btn btn-primary mt-5'onClick={payment}> Payment</button>
            </div>
        </div>
      </div>
  );
}

export default Transaction;
