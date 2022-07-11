import { useRecoilValue } from 'recoil'
import { paymentState, names } from '../../recoil/atoms'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

function Calculation1 () {
    /////////////////////////////// common import ////////////////////////////////////
    const userNames = useRecoilValue(names)
    const name1 = userNames[0]
    const name2 = userNames[1]
    const payments = useRecoilValue(paymentState)
    const payments1 = payments.filter(payment => payment.payedById === 0)
    const payments2 = payments.filter(payment => payment.payedById === 1) 
    //////////////////////////////////////////////////////////////////////////////////
    console.log('-------------')

    const commonPayments1 = payments1.filter((payment) => payment.status === 'common')
    const commonPayments2 = payments2.filter((payment) => payment.status === 'common')

    let tmpCommonPaymentsCost1 = 0
    commonPayments1.map((payment) => {
        tmpCommonPaymentsCost1 = tmpCommonPaymentsCost1 + payment.cost*1
    })
    const commonPaymentsCost1 = tmpCommonPaymentsCost1

    let tmpCommonPaymentsCost2 = 0
    commonPayments2.map((payment) => {
        tmpCommonPaymentsCost2 = tmpCommonPaymentsCost2 + payment.cost*1
        console.log(payment.cost)
    })
    const commonPaymentsCost2 = tmpCommonPaymentsCost2
    console.log(commonPaymentsCost2 * 0.5)

    const give2to1 = commonPaymentsCost1 * 0.5
    const give1to2 = commonPaymentsCost2 * 0.5

    const calculatedGive2to1 = give2to1 - give1to2

    //console.log('2to1',give2to1)
    //console.log('1to2',give1to2)

    let display = <></>

    if(calculatedGive2to1 > 0) {
        display = <Typography variant='h3' align='center'>{name2} → {name1} : {calculatedGive2to1} 円</Typography>
    } else 
    if(calculatedGive2to1 === 0) {
        display = <Typography variant='h3' align='center'>二人とも同額支払っています</Typography>
    }
    if(calculatedGive2to1 < 0) {
        display = <Typography variant='h3' align='center'>{name1} → {name2} : {calculatedGive2to1*(-1)} 円</Typography>
    }

    return (
        <>
        {display}
        </>
    )
    
}

export default Calculation1