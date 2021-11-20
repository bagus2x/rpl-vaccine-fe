import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

export const saveToken = (token: string) => {
  return Cookies.set('token', token)
}

export const getToken = () => {
  return Cookies.get('token')
}

export const removeToken = () => {
  return Cookies.remove('token')
}

export const isUserAuthenticated = () => {
  const token = getToken()
  if (!token) return false

  try {
    const { exp } = jwtDecode<{ exp: number }>(token)
    if (exp < new Date().getTime() / 1000) return false
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
