import {movement, person, transaction} from "@/types";


const splitTransactions = (persons:person[], transactions:transaction[]) => {
    // (-) es que te deben plata y (+) es que debes plata
    const balanceRecords = persons.map((person) => {
        return {
            personId: person.id,
            personName: person.name,
            balance: 0
        }
    })

    // calculate balance for each person
    for (let transaction of transactions) {
        let payerBalance = - transaction.amount
        let amountPerPerson = transaction.amount / transaction.personsIds.length
        for (let record of balanceRecords) {
            if (record.personId === transaction.payerId) {
                record.balance += payerBalance
            }
            if (transaction.personsIds.includes(record.personId)) {
                record.balance += amountPerPerson
            }
        }
    }

    // sort balance records by balance
    balanceRecords.sort((a, b) => {
        return a.balance - b.balance
    })

    const initialBalanceRecords = JSON.parse(JSON.stringify(balanceRecords))


    console.log(initialBalanceRecords)

    // console.log the actions needed to balance the account
    console.log('------------------Begin------------------')
    let movements = []
    for (let index in balanceRecords) {
        let record = balanceRecords[index]
        if (record.balance < 0) {
            for (let index2 in balanceRecords) {
                if (index2 <= index) {
                    continue
                }
                let record2 = balanceRecords[index2]
                if (record2.balance > 0) {
                    let amount = Math.min(-record.balance, record2.balance)
                    record.balance += amount
                    record2.balance -= amount
                    let movement: movement = {
                        from: record2.personName,
                        to: record.personName,
                        amount: amount.toFixed(2)
                    }
                    console.log(movement)
                    movements.push(movement)
                }

            }
        }
    }
    console.log('------------------End------------------')
    console.log(balanceRecords)

    return movements
}

export default splitTransactions