import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserDetails } from 'src/@core/redux/slices/userDetails'
import { useRefreshMutation } from 'src/@core/redux/services/auth'
import toast, { Toaster } from 'react-hot-toast'

const protectedRoute = WrappedComponent => {
  const protectedComponent = props => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { userDetails } = useSelector(state => state.userDetails)
    const [refresh, { isLoading, isSuccess, isError, error }] = useRefreshMutation()

    async function checkToken(token) {
      const response = await refresh({
        refresh: token
      })
      if (response.data) {
        return true
      }
      if (response.error) {
        return false
      }
    }

    useEffect(() => {
      const item = JSON.parse(localStorage.getItem('userDetails'))
      if (item) {
        checkToken(item.refresh).then(result => {
          if (result) {
            dispatch(updateUserDetails(item))
          } else {
            toast.error('Session expired.', {
              duration: 2000,
              position: 'top-center'
            })
            dispatch(updateUserDetails(null))
            router.push('auth/login')
          }
        })
      } else {
        dispatch(updateUserDetails(null))
        router.push('auth/login')
      }
    }, [])

    return (
      <>
        {userDetails && <WrappedComponent {...props} />}
        <Toaster />
      </>
    )
  }

  return protectedComponent
}

export default protectedRoute
