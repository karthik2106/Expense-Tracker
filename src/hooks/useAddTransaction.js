import {addDoc, collection,serverTimestamp} from 'firebase/firestore';
import {db} from '../config/firebase-config'
import { useGetUserInfo } from './useGetUserInfo';


export default function useAddTransaction(){

    
    let transactionCollectionRef = collection(db,"transactions");  //get the collection reference
    const {userID} = useGetUserInfo();

    const addTransaction = async ({
        description,transactionAmount,transactionType
    })=>{

        await addDoc(transactionCollectionRef,{
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt : serverTimestamp()
        });
    };


    return {addTransaction};
}