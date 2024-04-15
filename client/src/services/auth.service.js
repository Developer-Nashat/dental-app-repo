import axios from 'axios'

const API_URL = 'http://localhost:3000/'

class AuthService {
  login(user) {
    return axios
      .post(`${API_URL}login`, {
        username: user.username,
        userPassword: user.userPassword
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.userData
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'login', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
