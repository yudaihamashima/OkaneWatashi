import { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { paymentState, names, emptyPayments, defaultEmptyPayments } from '../../recoil/atoms'
import { Payment } from '../../interfaces/payment'
import {  
    TableContainer, 
    Table,
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
    Checkbox,
    TextField
} from '@mui/material'
import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'


function CreatePayment (props: any) {
    /////////////////////////////// common import ////////////////////////////////////
    const userNames = useRecoilValue(names)
    const nameId = props.nameId
    const [payments, setPayments] = useRecoilState(paymentState)
    const [newPayments, setNewPayments] = useRecoilState(emptyPayments)
    const defaultPayments = useRecoilValue(defaultEmptyPayments)
    const [textName, setTextName] = useState('')
    const [textCost, setTextCost] = useState('')
    //////////////////////////////////////////////////////////////////////////////////

    console.log('---- render ----')
    console.log(payments)
    console.log(newPayments)

    const handleChangedState = () => {
        if (newPayments[nameId].status === 'common') {
            setNewPayments(newPayments.map((newPayment: Payment, index: number) => {
                if (index === nameId) {
                    return {...newPayment, status: 'personal'}
                } else { 
                    return newPayment
                }
            }))
        }
        if (newPayments[nameId].status === 'personal') {
            setNewPayments(newPayments.map((newPayment: Payment, index: number) => {
                if (index === nameId) {
                    return {...newPayment, status: 'common'}
                } else { 
                    return newPayment
                }
            }))
        }
        //console.log(newPayments)
    }

    const handleChangeName = (event: any) => {
        setNewPayments(newPayments.map((newPayment: Payment, index: number) => {
            if (index === nameId) {
                return {...newPayment, paymentName: event.target.value}
            } else { 
                return newPayment
            }
        }))
        setTextName(event.target.value)
    }

    /*
    const handleChangeCategory = (event: any) => {
        setNewPayments(newPayments.map((newPayment: Payment, index: number) => {
            if (index === nameId) {
                return {...newPayment, category: event.target.value}
            } else { 
                return newPayment
            }
        }))
        setTextCategory(event.target.value)
    }
    */

    const handleChangeCost = (event: any) => {
        setNewPayments(newPayments.map((newPayment: Payment, index: number) => {
            if (index === nameId) {
                const newCost = event.target.value as number
                return {...newPayment, cost: newCost} 
            } else { 
                return newPayment
            }
        }))
        setTextCost(event.target.value)
    }

    const handleSubmit = () => {
        setPayments([...payments, {...newPayments[nameId], id: payments.length}])
        setNewPayments(newPayments.map((newPayment: Payment, index: number) => {
            if (index === nameId) {
                return defaultPayments[index]
            } else { 
                return newPayment
            }
        }))
        setTextName('')
        setTextCost('')
        ////
        console.log('=== submit ===')
        console.log(payments)
        console.log(newPayments)
    } 

    return(
        <>
            <Typography variant='h6' sx={{ mt:2 }}>NEW Pay</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>用途</TableCell>
                            <TableCell align='center'>金額</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {/* 
                            <TableCell key={'status'+userNames[nameId]} align='center'>
                                {newPayments[nameId].status === 'personal'
                                    ?
                                    <Checkbox 
                                        defaultChecked={false}
                                        onChange={handleChangedState}
                                    />
                                    :
                                    <Checkbox 
                                        defaultChecked={true}
                                        onChange={handleChangedState}
                                    />
                                }
                            </TableCell>
                             */}
                            <TableCell align='center' key={'name'+userNames[nameId]}>
                                <TextField onChange={handleChangeName} value={textName}></TextField>
                            </TableCell>
                            <TableCell align='center' key={'cost'+userNames[nameId]}>                                        
                                <TextField onChange={handleChangeCost} value={textCost}></TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell key={'button'+userNames[nameId]}>
                                <Button
                                    sx={{ 
                                        display: 'block',
                                        textAlign: 'ceter',
                                        backgroundColor: 'blue',
                                        width: 1/1
                                    }}
                                    onClick={handleSubmit}
                                >
                                    追加
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CreatePayment