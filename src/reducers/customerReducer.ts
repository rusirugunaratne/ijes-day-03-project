import type { Customer } from "../types/Customer"

type CustomerReducerActions = 
    { type: "ADD"; payload: Customer } 
    |   { type: "DELETE", payload: number }
    |   { type: "UPDATE", payload: Customer }

const customerReducer = (
    state: Customer[], 
    action: CustomerReducerActions
) => {
  switch (action.type) { 
    case "ADD":
      return [...state, action.payload]
    case "DELETE":
        return state.filter(customer => customer.id !== action.payload)
    case "UPDATE":
        return state.map(originalCustomer =>
                    originalCustomer.id === action.payload.id
                        ? {...originalCustomer, ...action.payload} // spread operator
                        : originalCustomer
                    )
    default:
      return state
  }
}

export default customerReducer
