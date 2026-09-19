import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api from '../lib/api'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/products')
      setProducts(Array.isArray(data.products) ? data.products : [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'We couldn’t load the collection right now.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products],
  )
  const getProductBySlug = useCallback(
    (slug) => products.find((p) => p.slug === slug),
    [products],
  )

  const value = useMemo(
    () => ({ products, loading, error, refresh, getProductById, getProductBySlug }),
    [products, loading, error, refresh, getProductById, getProductBySlug],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}