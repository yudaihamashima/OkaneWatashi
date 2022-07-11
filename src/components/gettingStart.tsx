import { useRecoilState } from 'recoil'
import { names } from '../recoil/atoms'
import { TextField, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom' 

function GettingStart () {
    const [userNames, setUserNames] = useRecoilState(names)
    const navigate = useNavigate()

    const handleChange0 = (event: any) => {
        setUserNames([event.target.value, userNames[1]])
    }
    const handleChange1 = (event: any) => {
        setUserNames([userNames[0], event.target.value])
    }
        
    const handleSubmit = () => {
        navigate('/main')
    }
    
    return(
        <div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <h2>名前を教えてください</h2>
                </Grid>
                <Grid item xs={6} key='name0' sx={{align: 'center'}} alignItems="center">
                    <h4>User 1</h4>
                    <TextField
                        value={userNames[0]}
                        onChange={handleChange0}
                    />
                </Grid>
                <Grid item xs={6} key='name1'>
                    <h4>User 2</h4>
                    <TextField
                        value={userNames[1]}
                        onChange={handleChange1}
                    />
                </Grid>
                <Grid item xs={12} key='submit'>
                    <Button onClick={handleSubmit}>
                        精算をはじめる
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default GettingStart