import _ from 'lodash'

const ClassCard = ({ name, description, languages: _languages, author }) => {
  const languages = _.isArray(_languages) ? _languages : JSON.parse(_languages)

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200 h-full flex flex-col">
      <div className="px-4 py-5  sm:px-6">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              {name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            {languages && (
              <img src={`/languages/${languages[0]}.svg`} alt={languages[0]} />
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6 mt-auto">
        <div className="w-full flex items-center justify-between">
          <img
            className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 mr-4"
            src={author.imageUrl}
            alt=""
          />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="text-gray-900 text-sm font-medium truncate">
                {author.name}
              </h3>
            </div>
            <p className="mt-1 text-gray-500 text-sm truncate">
              {author.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassCard
