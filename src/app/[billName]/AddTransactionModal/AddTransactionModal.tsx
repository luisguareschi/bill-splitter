"use client"
import {Modal, Form} from "react-bootstrap";
import Button from "@/components/Button/Button";
import styles from "./AddTransactionModal.module.css";
import Select from "react-select";
import {person, transaction} from "@/types";
import CurrencyInput from "react-currency-input-field";
import {useState} from "react";
import {v4 as uuid} from 'uuid';


interface props {
    show: boolean;
    setShow: any;
    persons: person[];
    transactions: transaction[];
    setTransactions: any;
}

const AddTransactionModal = ({show, setShow, persons, transactions, setTransactions}:props) => {
    const [payerId, setPayerId] = useState<string>("")
    const [participants, setParticipants] = useState<string[]>([])
    const [all, setAll] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const personsOptions = persons.map((person) => {
        return {value: person.id , label: person.name}
    })
    const handleSave = () => {
        if (payerId === "" || participants.length === 0 || description === '' || amount === 0) {
            alert('Please fill all the fields')
            return
        }
        let transaction:transaction = {
            amount: amount,
            description: description,
            id: uuid(),
            payerId: payerId,
            personsIds: participants
        }
        setTransactions([...transactions, transaction])
        handleClose()
    }
    const handleClose = () => {
        setShow(false)
        setAll(false)
    };

    const onSelectPlayer = (option:any) => {
        setPayerId(option.value)
    }

    const onSelectParticipants = (option:any) => {
        // @ts-ignore
        let participantsIds = option.map(option => option.value)
        setParticipants(participantsIds)
    }

    const onSelectAll = (event: any) => {
        let checked = event.target.checked
        if (checked) {
            setParticipants(persons.map(person => person.id))
            setAll(true)
        }
        else {
            setParticipants([])
            setAll(false)
        }
    }

    const onDescriptionChange = (event:any) => {
        setDescription(event.target.value)
    }

    const onAmountChange = (value: any):void => {
        setAmount(parseFloat(value))
    }

    return (
        <Modal show={show} onHide={handleClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.bodyContainer}>
                    <div className={styles.rowContainer}>
                        <h5>Payer:</h5>
                        <div className={styles.selectContainer}>
                            <Select options={personsOptions}
                                    onChange={onSelectPlayer}/>
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        <h5>Participants:</h5>
                        <div className={styles.participantsSelectOuterContainer}>
                            <div className={styles.selectContainerParticipants}>
                                <Select options={personsOptions} isMulti={true}
                                        onChange={onSelectParticipants} isDisabled={all}/>
                            </div>
                            <Form.Check
                                type={'checkbox'}
                                label={`All`}
                                onChange={onSelectAll}/>
                        </div>
                    </div>
                    <div className={styles.rowContainer}>
                        <h5>Description:</h5>
                        <input className={styles.input} type={'text'}
                               placeholder={'Description of the transaction'}
                               onChange={onDescriptionChange}/>
                    </div>
                    <div className={styles.rowContainer}>
                        <h5>Amount:</h5>
                        <CurrencyInput
                            placeholder="USD"
                            decimalsLimit={2}
                            suffix={'$'}
                            onValueChange={onAmountChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={styles.footerContainer}>
                    <Button onClick={handleClose} variant={'grey'}>
                        Close
                    </Button>
                    <Button onClick={handleSave} variant={'primary'}>
                        Save Transaction
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTransactionModal