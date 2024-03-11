// ** React Imports
import { useState } from 'react'

// ** Next Imports

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import Link from 'next/link'

// ** Icons Imports

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '35rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ForgotPasswordPage = () => {
  // ** States
  const [values, setValues] = useState({
    email: ''
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(values.email)
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Enter your email.
            </Typography>
            <Typography variant='body2'>We'll send you a link to reset your password.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder='johndoe@example.com'
              type='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              onChange={handleChange('email')}
              required
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
              Submit
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already changed?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
ForgotPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPasswordPage
