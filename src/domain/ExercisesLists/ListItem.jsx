import Link from 'next/link'
import {
  CheckCircleIcon,
  ChevronRightIcon,
  DotsCircleHorizontalIcon
} from '@heroicons/react/outline'
import dayjs from 'dayjs'
import Countdown from 'react-countdown'

import Badge from '../../components/Badge'

const ExercisesListItem = ({
  classId,
  id,
  title,
  questionsCompletedSumissionsCount,
  questionsCount,
  classHasListQuestion
}) => {
  const href = classId
    ? `/turmas/${classId}/listas-de-exercicios/${id}`
    : `/listas-de-exercicios/${id}`
  const closed =
    classHasListQuestion.submissionDeadline &&
    dayjs(classHasListQuestion.submissionDeadline) < dayjs()
  const finished = questionsCompletedSumissionsCount >= questionsCount

  return (
    <li>
      <Link href={href}>
        <a className="block hover:bg-gray-50">
          <div className="flex items-center px-4 py-5 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <div className="flex-shrink-0">
                {finished ? (
                  <CheckCircleIcon
                    className="flex-shrink-0 mr-4 h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                ) : (
                  <DotsCircleHorizontalIcon
                    className="flex-shrink-0 mr-4 h-5 w-5 text-gray-200"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 items-center pr-4 md:grid md:grid-cols-2 md:gap-4">
                <div className="mb-4 sm:mb-0">
                  {/* {closed && (
                    <Badge color="red" className="mb-1">
                      Fechado
                    </Badge>
                  )} */}
                  <p className="text-sm font-medium text-gray-900 block">
                    {title}
                    {classHasListQuestion?.submissionDeadline && !closed && (
                      <span className="text-gray-500 font-normal">
                        {/* {dayjs(classHasListQuestion.submissionDeadline).format(
                          'DD/MM/YYYY'
                        )} */}
                        <Countdown
                          date={Date.now() + 502200}
                          renderer={({ hours, minutes, seconds, completed }) =>
                            completed ? (
                              <></>
                            ) : (
                              <>
                                fecha em {hours}h {minutes}min {seconds}s
                              </>
                            )
                          }
                        />
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-right block w-full mb-1">
                    {(
                      (questionsCompletedSumissionsCount / questionsCount) *
                      100
                    ).toFixed(0)}
                    %{' '}
                    <span className="text-gray-400">
                      ({questionsCompletedSumissionsCount} de {questionsCount})
                    </span>
                  </span>
                  <span className="w-full sm:w-[200px] h-1 bg-gray-200 ml-auto block rounded-md relative">
                    <span
                      className={`absolute rounded-md top-0 left-0 block h-full bg-${
                        finished ? 'green' : 'blue'
                      }-400`}
                      style={{
                        width: `${(
                          (questionsCompletedSumissionsCount / questionsCount) *
                          100
                        ).toFixed(0)}%`
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default ExercisesListItem
