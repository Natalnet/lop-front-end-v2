const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden sm:rounded-lg h-full w-full flex flex-col">
      {children}
    </div>
  )
}

const CardHeader = ({ title, description }) => {
  return (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-md leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create new job
          </button>
        </div>
      </div>
    </div>
  )
}

const CardBody = ({ children }) => {
  return <div className="px-4 py-5 sm:px-6">{children}</div>
}

const CardFooter = ({ title, description }) => {
  return <div className="px-4 py-5 border-t border-gray-200 sm:px-6"></div>
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
