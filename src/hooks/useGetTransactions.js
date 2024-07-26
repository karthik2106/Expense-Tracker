import {query ,collection, where, orderBy , onSnapshot} from 'firebase/firestore'
import {db} from "../config/firebase-config"
import {useState , useEffect} from 'react'
import {useGetUserInfo} from './useGetUserInfo' // hook function 


export  const useGetTransactions = () =>{
    const [transactions,setTransactions] = useState([]);   // to contain all the transactions which occured.
    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);


    const transactionCollectionRef = collection(db,"transactions");
    const {userID} = useGetUserInfo();

    const getTransactions = async ()=>{
            let unsubscribe;
            
        try{
            const queryTransactions = query(transactionCollectionRef,where("userID","==",userID),
        orderBy("createdAt") );

          unsubscribe =  onSnapshot(queryTransactions,(snapshot)=>{  // the snapshot function is triggered everytime the querylist is updated(eg. a new trnasaction occurs for the userID)
            let totalIncome =0;
            let totalExpense =0;
            let totalBalance=0;
                let docs = []
               snapshot.forEach((doc)=>{          // we filter out the necessary data from each document using doc.data
                    const data  = doc.data();
                    const id = doc.id;              // each doc has a unique id

                    if(data.transactionType === "expense"){
                        totalExpense  = parseFloat(data.transactionAmount) + totalExpense;
                    }
                    else if(data.transactionType === "income"){
                        totalIncome  = parseFloat(data.transactionAmount) + totalIncome;
                    }

                    totalBalance = totalIncome - totalExpense;


                    docs.push({...data,id});
                });

                setTransactions(docs);
                console.log(transactions);

                setBalance(totalBalance); setExpense(totalExpense); setIncome(totalIncome);
            });

        }catch(err){
            console.error(err);
        }

        return ()=>unsubscribe
    };

    useEffect(()=>{        // the function only gets called at the start of the app rendering
        getTransactions();
    },[])

    return {transactions , balance , income , expense};
}