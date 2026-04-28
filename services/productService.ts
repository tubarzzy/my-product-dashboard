import axios from 'axios'

const API_URL = 'https://69f0aaf7c1533dbedc9d809d.mockapi.io/products'

export const getProducts = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createProduct = async (data: any) => {
  const res = await axios.post(API_URL, data)
  return res.data
}

export const updateProduct = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/${id}`, data)
  return res.data
}

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`)
  return res.data
}