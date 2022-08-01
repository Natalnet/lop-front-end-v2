import axios from 'axios'

const baseUrlBackend =
  process.env.REACT_APP_BASE_URL_BACKEND || 'http://localhost:3001'

const api = axios.create({
  baseURL: baseUrlBackend
})

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  const accessLevel = sessionStorage.getItem('accessLevel')

  if (token) config.headers.authorization = `Bearer ${token}`
  if (accessLevel) config.headers.profile = accessLevel.toUpperCase()

  return config
})

// api.interceptors.response.use(
//   response => response,
//   err => {
//     if (
//       (err.response && err.response.status === 404) ||
//       err.message === 'Network Error'
//     ) {
//       // this.props.history.push('/404')
//     } else if (err.response && err.response.status === 401) {
//       if (err.response.data.msg === 'token mal formatado') {
//         sessionStorage.clear()

//         document.location.href = '/'
//       } else if (err.response.data.msg === 'perfil inválido') {
//         sessionStorage.clear()

//         document.location.href = '/'
//       } else {
//         const profile = sessionStorage.getItem('user.profile')

//         document.location.href = `/${profile && profile.toLocaleLowerCase()}`
//       }
//     } else return Promise.reject(err)
//   }
// )

export { api, baseUrlBackend }
export default api
