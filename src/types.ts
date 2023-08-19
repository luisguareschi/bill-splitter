
interface person {
    name: string;
    id: string;
}

interface transaction {
    payerId: string;
    personsIds: string[];
    amount: number;
    description: string;
    id: string;
}

interface movement {
    from: string;
    to: string;
    amount: number | string

}

interface bill {
    name: string;
    persons: person[];
    transactions: transaction[];
}

type bills = bill[];

export type {person , transaction, movement, bills, bill};