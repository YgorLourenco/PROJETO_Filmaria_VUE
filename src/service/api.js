import axios from 'axios'

// URL da API: https://sujeitoprogramador.com/r-api/?api=filmes

// axios.create é um metodo pra armazenar URL de API
const api = axios.create({
    baseURL:'https://sujeitoprogramador.com/r-api'
})

export default api