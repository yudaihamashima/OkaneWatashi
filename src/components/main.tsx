import PaymentsTables from './actions/paymentsTables'
import Calculation1 from './actions/calculation'
import CreatePayment from './actions/createPayment'
import { Grid, Box } from '@mui/material'
import { paymentState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { Payment } from '../interfaces/payment'

function Main() {

    const payment = useRecoilValue(paymentState)
    
    return(
        <div>
            <Calculation1 />
            <PaymentsTables />

            <Box sx={{
                textAlign: "center",
                mx: 2,
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CreatePayment nameId={0}/>
                    </Grid>
                    <Grid item xs={6}>
                        <CreatePayment nameId={1}/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Main