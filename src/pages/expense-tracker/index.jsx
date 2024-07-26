
import {useState} from "react"
import useAddTransaction from "../../hooks/useAddTransaction" // hook function

import Transaction from "./Transaction"   // its a component

export const ExpenseTracker = ()=>{
    const {addTransaction} = useAddTransaction();
    //const {transactions} = useGetTransactions();
    

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
    };

    
    return(
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1>Expense Tracker</h1>

                <div className="balance">
                    <h3>Your Balance</h3>
                    <h2>$0.00</h2>
                </div>

                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>$0.00</p>
                    </div>
                    <div className="expenses">
                        <h4>Expense</h4>
                        <p>$0.00</p>
                    </div>
                </div>

                <form action="" className="add-transactions" onSubmit={onSubmit}>

                    <input type="text" placeholder="Description" name="description" value={transactionInput.description} onChange={handleChange} required  />
                    <input type="number" placeholder="Amount" name="transactionAmount" value={transactionInput.transactionAmount} onChange={handleChange} required />

                    <input type="radio" id="expense" value="expense" name="transactionType"  onChange={handleChange} />
                    <label htmlFor="expense">Expense</label>

                    <input type="radio" id="income" value="income" name="transactionType" onChange={handleChange} />
                    <label htmlFor="income">Income</label>
                    
                    <button type="submit" >Add transactions</button>

                </form>

                
            </div>
        </div>
            <Transaction />

        </>

    )
}