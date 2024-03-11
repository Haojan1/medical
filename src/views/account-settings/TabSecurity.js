// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { useChangePasswordMutation } from 'src/@core/redux/services/accounts'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'

const TabSecurity = () => {
  const dispatch = useDispatch()
  const [changePassword, { isLoading, isError, isSuccess, error, data }] = useChangePasswordMutation()
  const { userDetails } = useSelector(state => state.userDetails)

  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    oldPassword: '',
    confirmNewPassword: '',
    showNewPassword: false,
    showOldPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Old Password
  const handleOldPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowOldPassword = () => {
    setValues({ ...values, showOldPassword: !values.showOldPassword })
  }

  const handleMouseDownOldPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  async function handleClick() {
    if (values.confirmNewPassword !== values.newPassword) {
      toast.error('Passwords does not match.', {
        duration: 1000,
        position: 'top-center'
      })

      return
    }
    if (!values.oldPassword && !values.newPassword && !values.confirmNewPassword) {
      toast.error('Please complete all the fields.', {
        duration: 1000,
        position: 'top-center'
      })

      return
    }
    const body = {
      old_password: values.oldPassword,
      new_password: values.newPassword
    }
    const response = await changePassword(body)
    if (response.data) {
      toast.success('Successfully saved.', {
        duration: 1000,
        position: 'top-center'
      })
    }
    if (response.error) {
      if (response.error.data.message) {
        toast.error(response.error.data.message, {
          duration: 1000,
          position: 'top-center'
        })
      }
    }
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Toaster />
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-old-password'>Old Password</InputLabel>
                  <OutlinedInput
                    label='Old Password'
                    value={values.oldPassword}
                    id='account-settings-old-password'
                    type={values.showOldPassword ? 'text' : 'password'}
                    onChange={handleOldPasswordChange('oldPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowOldPassword}
                          onMouseDown={handleMouseDownOldPassword}
                        >
                          {values.showOldPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                    disabled={isLoading}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                    disabled={isLoading}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleClick}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
