import axios from 'axios'

const API_URL = 'http://localhost:3000/'

class ProblemCatalogService {
  getAllProblemsCatalogs() {
    return axios.get(`${API_URL}problemCatalog`).then((response) => {
      return response.data
    })
  }

  insertProblemCatalog(problemCatalogName) {
    return axios
      .post(`${API_URL}problemCatalog`, { problemCatalogName: problemCatalogName })
      .then((response) => {
        return response
      })
  }

  UpdateProblemCatalog(problemCatalogName, problemCatalogId) {
    return axios
      .put(`${API_URL}problemCatalog`, {
        problemCatalogName: problemCatalogName,
        problemCatalogId: problemCatalogId
      })
      .then((response) => {
        return response
      })
  }
}

export default new ProblemCatalogService()
