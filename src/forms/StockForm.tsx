import React, { useState } from "react"

export type StockFormData = {
  name: string
  unitPrice: number
  availableQty: number
  unit: string
}

type StockFormProps = {
  initialData?: StockFormData
  onSubmit: (data: StockFormData) => void
  onCancel: () => void
}

const UNIT_OPTIONS = ["kg", "g", "mg", "litre", "ml", "piece", "pack", "box", "meter", "dozen"]

const validate = (form: StockFormData) => {
  const errors: Partial<Record<keyof StockFormData, string>> = {}
  if (!form.name.trim()) errors.name = "Name is required."
  if (!form.unitPrice || form.unitPrice <= 0) errors.unitPrice = "Unit price must be positive."
  if (!form.availableQty || form.availableQty < 0) errors.availableQty = "Available quantity must be zero or more."
  if (!form.unit.trim()) errors.unit = "Unit is required."
  return errors
}

const StockForm: React.FC<StockFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState<StockFormData>(initialData || { name: "", unitPrice: 0, availableQty: 0, unit: "" })
  const [errors, setErrors] = useState<Partial<Record<keyof StockFormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "unitPrice" || name === "availableQty" ? Number(value) : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block font-medium mb-1'>Name</label>
        <input
          name='name'
          className={`w-full border rounded px-3 py-2 ${errors.name ? "border-red-400" : ""}`}
          value={form.name}
          onChange={handleChange}
          autoFocus
        />
        {submitted && errors.name && <div className='text-red-500 text-sm mt-1'>{errors.name}</div>}
      </div>
      <div>
        <label className='block font-medium mb-1'>Unit Price</label>
        <input
          name='unitPrice'
          type='number'
          min={0}
          className={`w-full border rounded px-3 py-2 ${errors.unitPrice ? "border-red-400" : ""}`}
          value={form.unitPrice}
          onChange={handleChange}
        />
        {submitted && errors.unitPrice && <div className='text-red-500 text-sm mt-1'>{errors.unitPrice}</div>}
      </div>
      <div>
        <label className='block font-medium mb-1'>Available Quantity</label>
        <input
          name='availableQty'
          type='number'
          min={0}
          className={`w-full border rounded px-3 py-2 ${errors.availableQty ? "border-red-400" : ""}`}
          value={form.availableQty}
          onChange={handleChange}
        />
        {submitted && errors.availableQty && <div className='text-red-500 text-sm mt-1'>{errors.availableQty}</div>}
      </div>
      <div>
        <label className='block font-medium mb-1'>Unit</label>
        <select
          name='unit'
          className={`w-full border rounded px-3 py-2 ${errors.unit ? "border-red-400" : ""}`}
          value={form.unit}
          onChange={handleChange}
        >
          <option value=''>Select unit</option>
          {UNIT_OPTIONS.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        {submitted && errors.unit && <div className='text-red-500 text-sm mt-1'>{errors.unit}</div>}
      </div>
      <div className='flex justify-end gap-2 pt-2'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300'
        >
          Cancel
        </button>
        <button type='submit' className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'>
          Save
        </button>
      </div>
    </form>
  )
}

export default StockForm
