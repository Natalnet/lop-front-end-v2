import { CodeIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import Card from '../../components/Card'
import ProgressBar from '../../components/ProgressBar'

const ExercisesList = ({
  classId,
  exercisesListId,
  title,
  questionsCompletedSumissionsCount,
  questionsCount,
  questions
}) => {
  const percent = (
    (questionsCompletedSumissionsCount / questionsCount) *
    100
  ).toFixed(0)

  return (
    <div className="px-4 pt-10 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-md leading-6 font-medium text-slate-400">
          {title}
        </h3>
        <div>
          <span className="text-xs font-medium text-right block w-full mb-1">
            {percent}%{' '}
            <span className="text-gray-400">
              ({questionsCompletedSumissionsCount} de {questionsCount})
            </span>
          </span>
          <ProgressBar percent={percent} height={1} />
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {questions &&
          questions.map(item => (
            <Link
              key={item.id}
              href={`/turmas/${classId}/listas-de-exercicios/${exercisesListId}/exercicios/${item.id}`}
              passHref
            >
              <a className="relative bg-slate-800 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-sm rounded-md dark:highlight-white/5 overflow-hidden">
                <dt className="min-h-[50px]">
                  <div className="absolute bg-indigo-500 rounded-md p-3">
                    <CodeIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-16 text-md font-medium text-slate-300">
                    {item.title}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <div className="absolute bottom-0 inset-x-0 bg-slate-700 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-slate-100 hover:text-secondary"
                      >
                        Iniciar
                      </a>
                    </div>
                  </div>
                </dd>
              </a>
            </Link>
          ))}
      </dl>
    </div>
  )
}

export default ExercisesList
