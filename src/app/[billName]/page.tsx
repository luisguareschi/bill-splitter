"use client"
import styles from "./page.module.css"
import Navbar from "@/components/navbar/Navbar";
import PersonCard from "@/app/[billName]/PersonCard/PersonCard";
import {bill, movement, person, transaction} from "@/types";
import {useEffect, useState} from "react";
import TransactionCard from "@/app/[billName]/TransactionCard/TransactionCard";
import AddTransactionModal from "@/app/[billName]/AddTransactionModal/AddTransactionModal";
import ResultModal from "@/app/[billName]/ResultModal/ResultModal";
import {useRouter} from "next/navigation";

const personsEx:person[] = [

]

const transactionsEx:transaction[] = [

]

const SplitPage = ({params}: { params: { billName: string } }) => {
    const [persons, setPersons] = useState<person[]>(personsEx)
    const [transactions, setTransactions] = useState<transaction[]>(transactionsEx)
    const [showAdd, setShowAdd] = useState<boolean>(false)
    const [showResults, setShowResults] = useState<boolean>(false)
    const [movements, setMovements] = useState<movement[]>([])
    const billName = params.billName.replace('%', ' ')

    useEffect(() => {
        let bill: bill = JSON.parse(localStorage.getItem('bills') || '[]').find((bill: any) => bill.name === billName)
        if (bill) {
            setPersons(bill.persons)
            setTransactions(bill.transactions)
        }
    }, [])

    useEffect(() => {
        let bills: bill[] = JSON.parse(localStorage.getItem('bills') || '[]')
        bills = bills.map((bill: bill) => {
            if (bill.name === billName) {
                bill.persons = persons
                bill.transactions = transactions
            }
            return bill
        })
        localStorage.setItem('bills', JSON.stringify(bills))
    }, [persons, transactions])

    return (
        <>
            <Navbar persons={persons} transactions={transactions}
                    setMovements={(value:any) => setMovements(value)}
                    setShowResults={(value:any) => setShowResults(value)}/>
            <div className={styles.container}>
                <div className={styles.peopleOuterContainer}>
                    <h1>Bill: {billName}</h1>
                    <p className={styles.headerTitle}>People to split with: {persons.length}</p>
                    <div className={styles.peopleContainer}>
                        {persons.length === 0 && (
                            <div>Add a participant</div>
                        )}
                        {persons.map((person, index) => {
                            return (
                                <PersonCard key={person.id}
                                            person={person}
                                            setPersons={(value:any) => setPersons(value)}
                                            persons={persons}
                                            transactions={transactions}
                                            setTransactions={(value:any) => setTransactions(value)}
                                />
                            )
                        })}
                        <PersonCard setPersons={(value:any) => setPersons(value)}
                                    transactions={transactions}
                                    setTransactions={(value:any) => setTransactions(value)}
                                    persons={persons}/>
                    </div>
                </div>
                <div className={styles.peopleOuterContainer}>
                    <p className={styles.headerTitle}>Transactions:</p>
                    <div className={styles.transactionsContainer}>
                        {transactions.map((transaction, index) => {
                            return (
                                <TransactionCard transaction={transaction} persons={persons}
                                                 key={transaction.id}
                                                 setTransactions={(value:any) => setTransactions(value)}
                                                 transactions={transactions}
                                />
                            )})}
                        {transactions.length === 0 && (
                            <h6>
                                No transactions yet
                            </h6>
                        )}
                    </div>
                    <button className={styles.transactionButton} onClick={()=>setShowAdd(!showAdd)}>
                        Add transaction +
                    </button>
                </div>
            </div>
            <AddTransactionModal show={showAdd} persons={persons}
                                 setShow={(value:boolean) => setShowAdd(value)}
                                 transactions={transactions}
                                 setTransactions={(value:any) => setTransactions(value)}/>
            <ResultModal movements={movements} setShowResults={(value:any) => setShowResults(value)} show={showResults}/>
        </>
    )
}

export default SplitPage