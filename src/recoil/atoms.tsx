import { atom } from 'recoil'
import { Payment, Category } from '../interfaces/payment'

const payments = [] as Payment[]

export const paymentState = atom<Payment[]>({
    key: 'paymentState',
    default: payments.map((payment: any, index: number) => (
    {
        id: index,
        paymentName: payment.paymentName,
        cost: payment.cost,
        category: payment.category,
        payedById: payment.payedById,
        date: payment.date,
        status: 'personal',
        onEdit: false,
        editable: true,
    })),
})

export const emptyPayments = atom<Payment[]>({
    key: 'emptyPayment',
    default:[
        {
            id: -1,
            paymentName: '',
            cost: 0,
            category: '',
            payedById: 0,
            date: '',
            status: 'personal',
            onEdit: false,
            editable: true,
        },
        {
            id: -1,
            paymentName: '',
            cost: 0,
            category: '',
            payedById: 1,
            date: '',
            status: 'personal',
            onEdit: false,
            editable: true,
        },   
    ]
})

export const defaultEmptyPayments = atom<Payment[]>({
    key: 'defaultEmptyPayments',
    default:[
        {
            id: -1,
            paymentName: '',
            cost: 0,
            category: '',
            payedById: 0,
            date: '',
            status: 'personal',
            onEdit: false,
            editable: true,
        },
        {
            id: -1,
            paymentName: '',
            cost: 0,
            category: '',
            payedById: 1,
            date: '',
            status: 'personal',
            onEdit: false,
            editable: true,
        },   
    ]
})

export const names = atom<string[]>({
    key: 'names',
    default: ['', ''],
})




