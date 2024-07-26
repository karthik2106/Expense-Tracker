import {query ,collection, where, orderBy , onSnapshot} from 'firebase/firestore'
import {db} from "../config/firebase-config"
import {useState , useEffect} from 'react'
import {useGetUserInfo} from './useGetUserInfo' // hook function 


export  const useGetTransactions = () =>{
    const [transactions,setTransactions] = useState([]);   // to contain all the transactions which occured.

    const transactionCollectionRef = collection(db,"transactions");
    const {userID} = useGetUserInfo();

    const getTransactions = async ()=>{
            let unsubscribe;
        try{
            const queryTransactions = query(transactionCollectionRef,where("userID","==",userID),
        orderBy("createdAt") );

          unsubscribe =  onSnapshot(queryTransactions,(snapshot)=>{  // the snapshot function is triggered everytime the querylist is updated(eg. a new trnasaction occurs for the userID)

                let docs = []
               snapshot.forEach((doc)=>{          // we filter out the necessary data from each document using doc.data
                    const data  = doc.data();
                    const id = doc.id;              // each doc has a unique id

                    docs.push({...data,id});
                });

                setTransactions(docs);
                console.log(transactions);
            });

        }catch(err){
            console.error(err);
        }

        return ()=>unsubscribe
    };

    useEffect(()=>{        // the function only gets called at the start of the app rendering
        getTransactions();
    },[])

    return {transactions};
}