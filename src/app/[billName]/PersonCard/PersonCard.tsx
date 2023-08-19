"use client"
import styles from "./PersonCard.module.css";
import {person, transaction} from "@/types";
import {v4 as uuid} from 'uuid';


interface props {
    person?: person
    persons: person[]
    setPersons: any,
    transactions: transaction[],
    setTransactions: any
}
const PersonCard = ({person, persons, setPersons, setTransactions, transactions}:props) => {

    const addPerson = () => {
        let id = uuid()
        if (!persons || !setPersons) return
        let ps = [...persons]
        let pNumber = persons.length+1
        ps.push({name: 'Person' + pNumber, id: id})

        let tr = [...transactions]
        tr = tr.map(t => {
            if (t.personsIds.length === persons.length) {
                t.personsIds.push(id)
            }
            return t
        })
        setTransactions(tr)
        setPersons(ps)
    }

    const deletePerson = () => {
        if (!persons || !setPersons) return

        // check if person is payer in any transaction
        let payer = transactions.find(t => t.payerId === person?.id)
        if (payer !== undefined) {
            alert('Cannot delete person who is payer in a transaction')
            return;
        }

        let ps = [...persons]
        ps = ps.filter(p => p.id !== person?.id)

        let tr = [...transactions]
        tr = tr.map(t => {
            if (t.personsIds.length === persons.length) {
                t.personsIds = t.personsIds.filter(id => id !== person?.id)
            }
            return t
        })

        setTransactions(tr)
        setPersons(ps)
    }

    const changeName = (event: any) => {
        if (!persons || !setPersons || !person) return
        let ps = [...persons]
        ps = ps.map(p => {
            if (p.id === person.id) {
                p.name = event.target.value
            }
            return p
        })
        setPersons(ps)
    }

    const handleFocus = (event: any) => event.target.select();

    if (!person) return (
        <div className={[styles.container, styles.add].join(' ')}
             onClick={addPerson}>
            <button>+</button>
        </div>
    )

    return (
        <div className={styles.container}>
            <input type="text" value={person.name} onChange={changeName} onFocus={handleFocus}/>
            <button onClick={deletePerson}>X</button>
        </div>
    )
}

export default PersonCard