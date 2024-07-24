
import useGetTransactions from "../../hooks/useGetTransactions"


export default function Transaction(){

    const {transactions} = useGetTransactions();

    return (
        <div className="transactions">
            <h3>Transaction</h3>
        </div>
    )
}