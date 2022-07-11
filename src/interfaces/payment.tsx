export interface Payment {
    id: number
    paymentName: string
    cost: number
    category: string
    payedById: number
    date: string
    status: string
    onEdit: boolean
    editable: boolean
}

export interface Category {
    id: number
    name: string
}