"use client"
import styles from "./navbar.module.css";
import {useRouter} from "next/navigation";
import {person, transaction} from "@/types";
import Button from "@/components/Button/Button";
import splitTransactions from "@/functions/splitTransactions";

interface props {
    persons: person[],
    transactions: transaction[],
    setMovements: any,
    setShowResults: any
}

const Navbar = ({persons, transactions, setMovements, setShowResults}:props) => {
    const router = useRouter()

    const handleCalculate = () => {
        const movements = splitTransactions(persons, transactions)
        setMovements(movements)
        setShowResults(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title} onClick={() => router.push('/')}>
                Bill Splitter
            </div>
            {/*<button className={styles.button}*/}
            {/*        onClick={()=>router.push('/')}>*/}
            {/*    Home*/}
            {/*</button>*/}
            <Button variant={'primary'} onClick={handleCalculate} className={styles.calculateButton}>
                Calculate
            </Button>
        </div>
    )
}

export default Navbar