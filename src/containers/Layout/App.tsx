import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/containers/Header'
import { useUserQuery } from '@/queries/user'

export const AppLayout = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useUserQuery()
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if (!jwt || isError) {
      navigate('/auth/login')
    }
  }, [jwt, isError, navigate])

  if (isLoading || !jwt) {
    return <div>Loading...</div>
  }

  if (data) {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    )
  }

  return null
}
