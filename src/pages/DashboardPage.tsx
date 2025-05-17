import { useNavigate } from "react-router-dom"
import { FaUsers, FaBoxOpen, FaFileInvoiceDollar } from "react-icons/fa"

const dashboardButtons = [
  {
    name: "Customers",
    to: "/dashboard/customers",
    icon: <FaUsers className='mr-2 text-blue-600' />,
  },
  {
    name: "Stocks",
    to: "/dashboard/stocks",
    icon: <FaBoxOpen className='mr-2 text-green-600' />,
  },
  {
    name: "Sales",
    to: "/dashboard/sales",
    icon: <FaFileInvoiceDollar className='mr-2 text-yellow-600' />,
  },
]

const DashboardPage = () => {
  const navigate = useNavigate()

  const onButtonClicked = (to: string) => {
    navigate(to)
  }

  return (
    <div className='max-w-4xl mx-auto py-12 px-4'>
      <h3 className='text-3xl font-bold text-gray-800 mb-10 text-center'>Dashboard</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {dashboardButtons.map((button, index) => (
          <button
            onClick={() => onButtonClicked(button.to)}
            key={index}
            className='flex items-center justify-center w-full h-32 bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition transform text-lg font-semibold text-gray-700 focus:outline-none border border-gray-100 hover:border-blue-400'
          >
            {button.icon}
            {button.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
