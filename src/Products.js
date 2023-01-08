import React from 'react';
import { useState,  useEffect} from 'react';
import { collection, getDocs, getDoc, doc} from "firebase/firestore"; 
import { db } from './firebaseConfig';
import { useParams } from "react-router-dom";


function Products() {
    let { id } = useParams();
    const [blocks, setBlock] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [fromUserInfo, setFromUserInfo] = useState([]);
    const [toUserInfo, setToUserInfo] = useState([]);

    
    const producDocRef = doc(db, "products", id);
    const blockCollRef = collection(db, 'transactions');

    useEffect(() => {
        const getProductInfo = async () =>{
            await getDoc(producDocRef).then((doc) => {
                const data = {...doc.data()}
                setProductInfo(data);
                getUserInfo(data.user);
            });
        }
        getProductInfo();
    })

async function getUserInfo(uid){
        const userDocRef = doc(db, 'users', uid);
        await getDoc(userDocRef).then((curUser) => {
            const data = {...curUser.data()}
            setUserInfo(data);
        }).catch((error) => {
            alert(error);
        })
    }

 useEffect(() => {
    const getBlocks = async () => {
      const data = await getDocs(blockCollRef);
      setBlock(data.docs.map((block) => {
        if(block.data().product == id){
          var data = {block: block.data()};
          var userDocRef = doc(db, 'users', block.data().from);
          getDoc(userDocRef).then((fromUser) => {
            data.fromName = fromUser.data().name
            data.fromDesc = fromUser.data().desc
          }).catch((error) => {
            alert(error);
          });
          var userDocRef = doc(db, 'users', block.data().to );
          getDoc(userDocRef).then((toUser) => {
            data.toName = toUser.data().name
            data.toDesc = toUser.data().desc
          }).catch((error) => {
            alert(error);
          });
          return data;
        }else{
          return null;
        }
      }));
    }
    getBlocks();
  }, []);

  function getTransUrl(){
    return "/transactions/"+id;
  }

  return <div className='p-5 vh-100'>
      <div class="card border-dark">
            <div class="card-body bg-dark">
                <h5 class="card-title">{productInfo.name}</h5>
                <p class="card-text m-0">{productInfo.desc}</p>
                <p className='m-0'>MRP: {productInfo.mrp}</p>
                <hr />
                <p className='m-0'>Manufacturer: {userInfo.name} ({userInfo.desc})</p>
            </div>
        </div>
      <div className="list-group">
    {
        blocks.map((block) => {
                if(block){
                return (<><a href="#" className="list-group-item list-group-item-action my-2" aria-current="true">
    <div className="w-100">
      <h5 className="mb-1">From: {block.fromName} <small>({block.fromDesc})</small></h5>
      <h5 className="mb-1">To: {block.toName} <small>({block.toDesc})</small></h5>
      <small></small>
    </div>
  </a></>);

                }
        })
    }
  </div>
  <div className='text-center mt-5'><a href={getTransUrl()}><button className='btn btn-primary'>Buy this product</button></a></div>
  </div>;
}

export default Products;
