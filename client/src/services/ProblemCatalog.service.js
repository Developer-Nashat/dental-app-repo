import axios from 'axios'

const API_URL = 'http://localhost:3000/'

class ProblemCatalogService {
  getAllProblemsCatalogs() {
    return axios.get(`${API_URL}problemCatalog`, {}).then((response) => {
      return response.result
    })
  }
}

export default new ProblemCatalogService()
