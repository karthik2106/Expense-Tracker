
import {useState} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import useAddTransaction from "../../hooks/useAddTransaction" // hook function
import { useGetUserInfo } from "../../hooks/useGetUserInfo"  // hook function
import { useGetTransactions } from "../../hooks/useGetTransactions";  // hook function

import { useNavigate } from "react-router-dom";


import Transaction from "./Transaction";   // its a component


import './expense.css';

export const ExpenseTracker = ()=>{

    const {addTransaction} = useAddTransaction();

    const {balance,income,expense} = useGetTransactions();


    const {name, profilePhoto} = useGetUserInfo();

    const navigate  = useNavigate();
    

    const [transactionInput,setTransactionInput] = useState({
        description:"",transactionAmount:0 , transactionType:"expense"
    });         

    function handleChange(e){
        const {name,type,value,checked} = e.target;

        setTransactionInput((prevTransaction)=>{
            return ({
                ...prevTransaction, [name]: value
            })
        })
    };

    const onSubmit = (e)=>{
        e.preventDefault()
        addTransaction(transactionInput);

        setTransactionInput({
            description:"", transactionAmount:0 , transactionType:"expense"
        })
    };


    const signUserOut =  async ()=>{
         try{await signOut(auth);
            navigate("/");
            localStorage.clear();
             
         }catch(err){
            console.error(err); 
         }
    }
    
    return(
        <div className="expense">
        <div className="expense-tracker">
            <div className="container">
               <div className="profile-data">
               <h1>{name}'s <span>Expense Tracker</span></h1>
               {profilePhoto && <div className="profile"><img className="profile-Photo" src={profilePhoto}/>
            </div>}
               </div> 

                <div className="balance">
                    <h3>Your Balance</h3>
                    {balance >=0 ? <h2>${balance}</h2> : <h2>-${balance*-1}</h2> }
                    
                </div>

                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>${income}</p>
                    </div>
                    <div className="expenses">
                        <h4>Expense</h4>
                        <p>${expense}</p>
                    </div>
                </div>

                <form action="" className="add-transactions" onSubmit={onSubmit}>
                    <h2>Key in your transactions</h2>

                    <div className="transaction-info">
                        
                    <input type="text" placeholder="Description" name="description" value={transactionInput.description} onChange={handleChange} required  />
                    <input type="number" placeholder="Amount" name="transactionAmount" value={transactionInput.transactionAmount} onChange={handleChange} required />
                    </div>
                    
                    <div className="transaction-radio">
                    <input type="radio" id="expense" value="expense" name="transactionType"  onChange={handleChange} className="expense-radio" />
                    <label htmlFor="expense">Expense</label>

                    <input type="radio" id="income" value="income" name="transactionType" onChange={handleChange} className="income-radio" />
                    <label htmlFor="income">Income</label>
                    </div>
                    
                    
                    <button type="submit" className="add-transaction-btn" >Add transactions</button>

                </form>

                
            </div>
            

            <button className="sign-out-button" onClick={signUserOut}>
                Sign Out
            </button>
        </div>
            <Transaction />
            </div>

    )
}