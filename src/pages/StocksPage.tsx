import React, { useReducer, useState } from "react"
import { FaPlus } from "react-icons/fa"
// import StockForm, { type StockFormData } from "../components/forms/StockForm"
import StockTable from "../components/tables/StockTable"
import Dialog from "../components/Dialog"
import type { Stock } from "../types/Stock"
import stockReducer from "../reducers/stockReducer"
import type { StockFormData } from "../forms/StockForm"
import StockForm from "../forms/StockForm"
// import stockReducer from "../reducers/stock-reducer"
// import type { Stock } from "../types/Stock"

const initialStocks: Stock[] = [
  { id: 1, name: "Rice", unitPrice: 40, availableQty: 100, unit: "kg" },
  { id: 2, name: "Milk", unitPrice: 60, availableQty: 200, unit: "litre" },
]

const StockPage: React.FC = () => {
  const [stocks, dispatch] = useReducer(stockReducer, initialStocks)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStock, setEditingStock] = useState<Stock | null>(null)

  const handleAdd = () => {
    setEditingStock(null)
    setDialogOpen(true)
  }

  const handleEdit = (stock: Stock) => {
    setEditingStock(stock)
    setDialogOpen(true)
  }

  const handleDelete = (stock: Stock) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      dispatch({ type: "DELETE", payload: stock.id })
    }
  }

  const handleSave = (data: StockFormData) => {
    if (editingStock) {
      dispatch({
        type: "UPDATE",
        payload: { ...editingStock, ...data },
      })
    } else {
      dispatch({
        type: "ADD",
        payload: data,
      })
    }
    setDialogOpen(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-blue-700'>Stocks</h1>
          <button
            onClick={handleAdd}
            className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
          >
            <FaPlus /> Add Stock
          </button>
        </div>
        <StockTable stocks={stocks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Dialog isDialogOpen={dialogOpen} title={editingStock ? "Edit Stock" : "Add Stock"}>
        <StockForm
          initialData={
            editingStock
              ? {
                  name: editingStock.name,
                  unitPrice: editingStock.unitPrice,
                  availableQty: editingStock.availableQty,
                  unit: editingStock.unit,
                }
              : undefined
          }
          onSubmit={handleSave}
          onCancel={() => setDialogOpen(false)}
        />
      </Dialog>
    </div>
  )
}

export default StockPage
