import styles from './TransactionCard.module.css'
import {person, transaction} from "@/types";
import stringToColor from "@/functions/stringToColor";
import Button from "@/components/Button/Button";

interface props {
    transaction: transaction
    persons: person[]
    setTransactions: (value: any) => void
    transactions: transaction[]
}

const Icon = ({name}:{name:string}) => {
    let bg = stringToColor(name, 50, 50)
    const initials = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

    return (
       <div className={styles.iconOuterContainer}>
           <div className={styles.icon} style={{background: bg}}>
               {initials}
           </div>
       </div>
    )
}

const TransactionCard = ({transaction, persons, setTransactions, transactions}:props) => {
    let payer = persons.filter(p => p.id === transaction.payerId)[0].name
    let amount = transaction.amount
    let description = transaction.description
    let personsNames = persons.filter(p => transaction.personsIds.includes(p.id))

    const handleDelete = () => {
        let tr = [...transactions]
        tr = tr.filter(t => t.id !== transaction.id)
        setTransactions(tr)
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <Icon name={payer} />
                <div className={styles.info}>
                    <div className={styles.payer}>
                        By: <span className={styles.boldTitle}>{payer}</span>
                    </div>
                    {description} | {personsNames.length === persons.length ? "Everyone" : personsNames.map(p => p.name).join(", ") }
                </div>
            </div>
            <div className={styles.amount}>
                <Button onClick={handleDelete} variant={"danger"} className={styles.deleteButton}>
                    X
                </Button>
                {amount} $
            </div>
        </div>
    )
}

export default TransactionCard