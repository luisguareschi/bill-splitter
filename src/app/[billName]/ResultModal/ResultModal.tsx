"use client"
import styles from './ResultModal.module.css'
import {movement} from "@/types";
import {Modal} from "react-bootstrap";
import Button from "@/components/Button/Button";
import {useState} from "react";
import {FaRegCopy} from "react-icons/fa";

interface props {
    movements: movement[],
    setShowResults: any,
    show: boolean
}

const ResultModal = ({movements, setShowResults, show}:props) => {
    let text = ""
    const handleClose = () => {
        setShowResults(false)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        alert("Copied to clipboard")
    }

    return (
        <Modal show={show} onHide={handleClose} centered backdrop={'static'}>
            <Modal.Header closeButton>
                <Modal.Title>Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.bodyContainer}>
                    {movements.map((movement, index) => {
                        text = text + movement.from + " ➡ " + movement.to + " |  Amount: " + movement.amount + " $\n"
                        return (
                            <div key={index}>
                                {movement.from} ➡ {movement.to} |  Amount: {movement.amount} $
                            </div>
                        )
                    })}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className={styles.copyButton} onClick={handleCopy}>
                    <FaRegCopy/>
                </button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ResultModal