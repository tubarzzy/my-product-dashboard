import { useForm } from 'react-hook-form'

export default function ProductForm({ onSubmit, defaultValues }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

      {/* NAME */}
      <div>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
          placeholder="Name"
          className="border p-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* PRICE */}
      <div>
        <input
          {...register('price', {
            required: 'Price is required',
            min: {
              value: 1,
              message: 'Price must be greater than 0'
            }
          })}
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <input
          {...register('category', {
            required: 'Category is required'
          })}
          placeholder="Category"
          className="border p-2 w-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters'
            }
          })}
          placeholder="Description"
          className="border p-2 w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
        Save
      </button>

    </form>
  )
}