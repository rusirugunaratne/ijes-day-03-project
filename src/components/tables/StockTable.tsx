import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import type { Stock } from "../../types/Stock"
// import type { Stock } from "../../types/Stock"

type StockTableProps = {
  stocks: Stock[]
  onEdit: (stock: Stock) => void
  onDelete: (stock: Stock) => void
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onEdit, onDelete }) => (
  <div className='overflow-x-auto'>
    <table className='min-w-full bg-white border border-gray-200 rounded'>
      <thead>
        <tr>
          <th className='px-4 py-2 border-b'>ID</th>
          <th className='px-4 py-2 border-b'>Name</th>
          <th className='px-4 py-2 border-b'>Unit Price</th>
          <th className='px-4 py-2 border-b'>Available Qty</th>
          <th className='px-4 py-2 border-b'>Unit</th>
          <th className='px-4 py-2 border-b text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id} className='hover:bg-gray-50'>
            <td className='px-4 py-2 border-b text-center'>{stock.id}</td>
            <td className='px-4 py-2 border-b'>{stock.name}</td>
            <td className='px-4 py-2 border-b text-right'>${stock.unitPrice}</td>
            <td className='px-4 py-2 border-b text-right'>{stock.availableQty}</td>
            <td className='px-4 py-2 border-b'>{stock.unit}</td>
            <td className='px-4 py-2 border-b text-center'>
              <button
                onClick={() => onEdit(stock)}
                className='inline-flex items-center justify-center p-2 mr-2 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                title='Edit'
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(stock)}
                className='inline-flex items-center justify-center p-2 rounded bg-red-100 text-red-700 hover:bg-red-200'
                title='Delete'
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
        {stocks.length === 0 && (
          <tr>
            <td colSpan={6} className='text-center py-6 text-gray-400'>
              No stocks found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default StockTable
