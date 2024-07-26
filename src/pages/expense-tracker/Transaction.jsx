
import {useGetTransactions} from "../../hooks/useGetTransactions"


export default function Transaction(){

    const {transactions} = useGetTransactions();

    return (
        <div className="transactions">
            <h3>Transaction</h3>
            <ul>
                {transactions.map((transaction)=>{

                        const { description, transactionAmount , transactionType} = transaction;

                        return(
                            <li>
                                <h4>{description}</h4>
                                 <p>

                                    ${transactionAmount}.<label style={{color: transactionType==="expense" ? "red":"green" }}>{transactionType }</label></p>
                            </li>
                        )
                }) }
            </ul>
        </div>
    )
}