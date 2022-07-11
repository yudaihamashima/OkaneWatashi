import { useRecoilState, useRecoilValue } from 'recoil'
import { paymentState, names } from '../../recoil/atoms'
import { Payment } from '../../interfaces/payment'
import { TextField, Typography } from '@mui/material'
import {  
    TableContainer, 
    Table,
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
    Checkbox,
    Button
} from '@mui/material'
import { Paper } from '@mui/material'
import { Box, Grid } from '@mui/material'
import { Icon, SvgIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react'

function PaymentsTables () {
    /////////////////////////////// common import ////////////////////////////////////
    const userNames = useRecoilValue(names)
    const name1 = userNames[0]
    const name2 = userNames[1]
    const [payments, setPayments] = useRecoilState(paymentState)
    const payments1 = payments.filter(payment => payment.payedById === 0)
    const payments2 = payments.filter(payment => payment.payedById === 1) 
    const [newName, setNewName] = useState<string>('')
    const [newCost, setNewCost] = useState<number>(0)
    //////////////////////////////////////////////////////////////////////////////////

    console.log('s',newCost)
    
    const handle = (payment: Payment) => {
        if(payment.status === 'personal'){
            const newPayment = {...payment, status: 'common'}
            const newPayments = [...payments.slice(0,payment.id), newPayment, ...payments.slice(payment.id+1)]
            setPayments(newPayments)
        }
        if(payment.status === 'common'){
            const newPayment = {...payment, status: 'personal'}
            const newPayments = [...payments.slice(0,payment.id), newPayment, ...payments.slice(payment.id+1)]
            setPayments(newPayments)
        }
    }

    const handleDelete = (payment: Payment) => {
        const newPayments = [
            ...payments.slice(0,payment.id).map((pay)=>{return {...pay, editable: true}}),
            ...payments.slice(payment.id+1).map((pay)=>{return {...pay, id: pay.id-1, editable: true}})
        ]
        setPayments(newPayments)
    }

    const handelEdit = (payment: Payment) => {
        if (payment.onEdit === false) {
            const newPayment = {...payment, onEdit: true}
            const newPayments = [
                ...payments.slice(0,payment.id).map((pay)=>{return {...pay,editable:false}}),
                newPayment,
                ...payments.slice(payment.id+1).map((pay)=>{return {...pay,editable:false}})
            ]
            setPayments(newPayments)
            setNewName(payment.paymentName)
            setNewCost(payment.cost)
        }
        if (payment.onEdit === true) {
            const newPayment = {...payment, paymentName: newName, cost: newCost, onEdit: false}
            const newPayments = [
                ...payments.slice(0,payment.id).map((pay)=>{return {...pay,editable:true}}),
                newPayment,
                ...payments.slice(payment.id+1).map((pay)=>{return {...pay,editable:true}})
            ]
            setPayments(newPayments)
            console.log('last',newCost)
        }
    }

    const handleEditPaymentName = (event: any) => {
        setNewName(event.target.value)
    }

    const handleEditCost = (event: any) => {
        setNewCost(event.target.value*1)
        console.log('onChange',newCost)
    }

    const allPayments = [
        {
            payedBy: name1,
            payments: payments1,
        },
        {
            payedBy: name2,
            payments: payments2,
        },
    ]

    return(
        <>
        <Box sx={{
            textAlign: "center",
            mx: 2,
        }}>
            <Grid container spacing={2}>
                {allPayments.map((onesPaymentsInfo) => (
                    <Grid item xs={6} key={onesPaymentsInfo.payedBy}>
                        <Typography variant='h4' sx={{ mb: 2 }}> {onesPaymentsInfo.payedBy} </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align='center'>共通</TableCell>
                                        <TableCell align='center'>用途</TableCell>
                                        <TableCell align='center'>金額</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {onesPaymentsInfo.payments.map((payment) => (
                                        <TableRow
                                            key={payment.paymentName}
                                        >
                                            {/* Delete Edit Icons */}
                                            <TableCell>
                                                {payment.editable === true 
                                                ?
                                                    <div>
                                                        <Button
                                                            onClick={()=>handleDelete(payment)}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                        <Button
                                                            onClick={()=>handelEdit(payment)}
                                                        >
                                                            {payment.onEdit === false ? <EditIcon /> : <CheckIcon />}
                                                        </Button>
                                                    </div>
                                                :
                                                    <div>
                                                        <Button
                                                            disabled
                                                            sx={{opacity: 0.5}}
                                                        >
                                                            <DeleteIcon />
                                                        </Button>
                                                        <Button
                                                            disabled
                                                            sx={{opacity: 0.5}}
                                                        >
                                                            <EditIcon /> 
                                                        </Button>
                                                    </div>  
                                                }
                                            </TableCell>
                                            {/* CheckBox Common or Not */}
                                            <TableCell align='center'>
                                                {payment.status === 'personal' 
                                                    ?
                                                    <Checkbox
                                                        defaultChecked = {false}
                                                        onChange={()=>handle(payment)}
                                                    />
                                                    :
                                                    <Checkbox 
                                                        defaultChecked = {true}
                                                        onChange={()=>handle(payment)}
                                                    />
                                                }
                                            </TableCell>
                                            {/* Content: Payment Name */}
                                            <TableCell align='center'>
                                                {payment.onEdit === false
                                                ? 
                                                <div>{payment.paymentName}</div>
                                                : 
                                                <TextField 
                                                    value={newName}
                                                    onChange={handleEditPaymentName}
                                                >
                                                </TextField>
                                                }     
                                            </TableCell>
                                            {/* Content: Payment Cost */}
                                            <TableCell align="right">
                                                {payment.onEdit === false 
                                                ?
                                                <div>{payment.cost}</div>
                                                :
                                                <TextField 
                                                    value={newCost}
                                                    onChange={handleEditCost}
                                                >
                                                </TextField>
                                                } 
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                ))}
            </Grid>
        </Box>
        </>
    )
}

export default PaymentsTables 



