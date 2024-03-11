// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useLoginMutation } from 'src/@core/redux/services/auth'
import { updateUserDetails } from 'src/@core/redux/slices/userDetails'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import MuiAvatar from '@mui/material/Avatar'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: '9rem',
  height: '9rem'
})

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const dispatch = useDispatch()
  const [login, { isLoading, isError, isSuccess, error, data }] = useLoginMutation()
  const { userDetails } = useSelector(state => state.userDetails)

  // ** State
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const currentRoute = router.asPath

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (values.username === '' && values.password === '') {
      toast.error('Please complete all the fields.', {
        duration: 1000,
        position: 'top-center'
      })

      return
    }

    const body = {
      username: values.username,
      password: values.password
    }
    const response = await login(body)
    if (response.data) {
      dispatch(updateUserDetails(response.data))
      router.push('/')
    }
    if (response.error) {
      if (response.error.data) {
        if (response.error.data.detail) {
          toast.error(response.error.data.detail, {
            duration: 1000,
            position: 'top-center'
          })
        }
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
  }, [userDetails])

  return (
    <Box className='content-center'>
      <Toaster />
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar alt='Logo' src='/images/ilpi-logo.png' />
          </Box>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              BOILERPLATE
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              // autoFocus
              fullWidth
              id='username'
              label='Username'
              sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange('username')}
              disabled={isLoading}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                disabled={isLoading}
                sx={{ marginBottom: 4 }}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link passHref href='/auth/forgot-password/'>
                <LinkStyled>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleSubmit}
              onSubmit={handleSubmit}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Doesn't have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/register'>
                  <LinkStyled>Sign up instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
