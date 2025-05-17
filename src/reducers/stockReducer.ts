import type { Stock } from "../types/Stock"

type StockAction =
  | { type: "ADD"; payload: Omit<Stock, "id"> }
  | { type: "UPDATE"; payload: Stock }
  | { type: "DELETE"; payload: number }

function stockReducer(state: Stock[], action: StockAction): Stock[] {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload, id: Date.now() }]
    case "UPDATE":
      return state.map((s) => (s.id === action.payload.id ? action.payload : s))
    case "DELETE":
      return state.filter((s) => s.id !== action.payload)
    default:
      return state
  }
}

export default stockReducer
