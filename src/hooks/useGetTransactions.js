import {query ,collection, where, orderBy , onSnapshot} from 'firebase/firestore'
import {db} from "../config/firebase-config"
import {useState , useEffect} from 'react'
import {useGetUserInfo} from './useGetUserInfo' // hook function 


export const useGetTransactions = () =>{
    const [transactions,setTransactions] = useState([]);   // to contain all the transactions which occured.

    const transactionCollectionRef = collection(db,"transactions");
    const {userID} = useGetUserInfo();

    const getTransactions = async ()=>{

        try{
            const queryTransactions = query(transactionCollectionRef,where("userID","==",userID),
        orderBy("createdAt") );

            onSnapshot(queryTransactions,(snapshot)=>{

                let docs = []
                snapshot.forEach((doc)=>{          // we filter out the necessary data from each document using doc.data
                    const data  = doc.data( );
                    const id = doc.id;

                    docs.push({...data,id});
                });

                setTransactions(docs);
            });

        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getTransactions();
    },[])

    return {transactions};
}