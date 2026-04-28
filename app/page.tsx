'use client'

import { useState, useEffect  } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct
} from '@/services/productService'
import ProductForm from '@/components/ProductForm'
import Modal from '@/components/Modal'

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [deleteProductName, setDeleteProductName] = useState('')

  const itemsPerPage = 6

  if (isLoading) return <p className="p-4">Loading...</p>
  if (isError) return <p className="p-4 text-red-500">Error loading products</p>

  // FILTER
  const safeData = data ?? []

  const searched = safeData.filter((p: any) =>
    (p.name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const filtered = searched.filter((p: any) => {
    if (!category) return true
    return (
      (p.category ?? '').toLowerCase().trim() ===
      category.toLowerCase().trim()
    )
  })

  // PAGINATION
  const paginated = filtered?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  //useEffect(() => {
    //setPage(1)
  //}, [search, category])

  const handleSubmitForm = async (formData: any) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData)
    } else {
      await createProduct(formData)
    }

    refetch()
    setShowModal(false)
    setEditingProduct(null)
  }

    const handleConfirmDelete = async () => {
    if (!deleteProductId) return

    await deleteProduct(deleteProductId)
    refetch()

    setDeleteProductId(null)
    setDeleteProductName('')
  }


  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 w-full mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="mobile phones">Mobile Phones</option>
        <option value="furniture">Furniture</option>
        <option value="food">Food</option>
      </select>

      {/* ADD BUTTON */}
      <button
        onClick={() => {
          setEditingProduct(null)
          setShowModal(true)
        }}
        className="bg-blue-500 text-white p-2 mb-4 rounded"
      >
        Add Product
      </button>

      {/* GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginated?.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">

            <h2 className="font-semibold">{product.name}</h2>
            <p>₦{product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setShowModal(true)
                }}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setDeleteProductId(product.id)
                  setDeleteProductName(product.name)
                }}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="border px-3 py-1"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="border px-3 py-1"
        >
          Next
        </button>
      </div>
      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          onSubmit={handleSubmitForm}
          defaultValues={editingProduct}
        />
      </Modal>

      <Modal
        isOpen={!!deleteProductId}
        onClose={() => setDeleteProductId(null)}
        title="Confirm Delete"
      >
        <p className="mb-4 text-gray-600">
          This action cannot be undone. Are you sure you want to delete{" "}
          <span className="font-semibold text-black">
            {deleteProductName}
          </span>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteProductId(null)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </Modal>

    </div>
  )
}