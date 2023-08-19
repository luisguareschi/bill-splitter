"use client";
import Image from 'next/image'
import styles from './page.module.css'
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {bill} from "@/types";
import Button from "@/components/Button/Button";

export default function Home() {
    const router = useRouter()
    const [billName, setBillName] = useState<string>('')
    const [bills, setBills] = useState<bill[]>([])

    useEffect(() => {
        const b: bill[] = JSON.parse(localStorage.getItem('bills') || '[]')
        setBills(b)
    }, [])

    const handleCreateBill = () => {
        if (billName === '') {
            alert("Please enter a bill name")
            return
        }

        if (bills.find(bill => bill.name === billName)) {
            alert("Bill name already exists")
            return
        }

        let bs = [...bills]
        let bill: bill = {
            name: billName,
            persons: [],
            transactions: []
        }
        bs.push(bill)
        localStorage.setItem('bills', JSON.stringify(bs))
        router.push(`/${billName}`)
    }

    const handleDeleteBill = (event:any, billName:string) => {
        event.stopPropagation()
        const result = confirm("Are you sure you want to delete this bill?")
        if (!result) {
            return
        }
        let bs = [...bills]
        bs = bs.filter(bill => bill.name !== billName)
        localStorage.setItem('bills', JSON.stringify(bs))
        setBills(bs)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Bill Splitter
            </div>
            <div className={styles.subtitle}>
                Create a bill and split it between friends
            </div>
            <div className={styles.billsContainer}>
                <h6>My bills</h6>
                <div className={styles.topRow}>
                    <input placeholder={'Bill name'} value={billName}
                           onChange={(event:any) => setBillName(event.target.value)}/>
                    <button className={styles.button} onClick={handleCreateBill}>
                        Create Bill
                    </button>
                </div>
                <div className={styles.bills}>
                    {bills.length === 0 && (
                        <p className={styles.bill}>No bills</p>
                    )}
                    {bills.map((bill, index) => {
                        return (
                            <div key={index} className={styles.bill} onClick={() => router.push(`/${bill.name}`)}>
                                {bill.name}
                                <Button onClick={(event:any) => {handleDeleteBill(event, bill.name)}}
                                        variant={'danger'} className={styles.deleteBill}>
                                    X
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}
