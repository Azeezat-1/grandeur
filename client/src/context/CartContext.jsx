import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useProducts } from './ProductContext'

const CartContext = createContext(null)

const STORAGE_KEY = 'grandeur-cart'

function normalizeItem(item, product) {
  return {
    id: product.id,
    qty: Math.max(1, Number(item.qty) || 1),
    size: item.size || (product.sizes && product.sizes[0]) || 'One Size',
    color: item.color || (product.colors && product.colors[0]) || 'Standard',
  }
}

export function CartProvider({ children }) {
  const { loading: productsLoading, getProductById } = useProducts()
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (productsLoading) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      if (!Array.isArray(parsed)) {
        setItems([])
        return
      }
      const list = parsed
        .filter((i) => i && getProductById(i.id))
        .map((i) => normalizeItem(i, getProductById(i.id)))
      setItems(list)
    } catch {
      setItems([])
    } finally {
      setHydrated(true)
    }
  }, [productsLoading, getProductById])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [items, hydrated])

  const addItem = (id, { size, color, qty = 1 } = {}) => {
    const product = getProductById(id)
    if (!product) return
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'One Size'
    const chosenColor = color || (product.colors && product.colors[0]) || 'Standard'
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === id && (i.size || '') === chosenSize && (i.color || '') === chosenColor,
      )
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: Math.min(next[idx].qty + qty, product.stock || 99) }
        return next
      }
      return [...prev, { id, size: chosenSize, color: chosenColor, qty }]
    })
    setIsOpen(true)
  }

  const increaseQty = (id, size, color) => {
    const product = getProductById(id)
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.color === color
          ? { ...i, qty: Math.min(i.qty + 1, product?.stock || 99) }
          : i,
      ),
    )
  }

  const decreaseQty = (id, size, color) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size && i.color === color ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    )
  }

  const removeItem = (id, size, color) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)))
  }

  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + getProductById(i.id)?.price * i.qty, 0),
    [items, getProductById],
  )

  const value = {
    items,
    count,
    subtotal,
    isOpen,
    setIsOpen,
    addItem,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}