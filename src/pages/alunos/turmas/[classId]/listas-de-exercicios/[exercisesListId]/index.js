import { useRouter } from 'next/router'

import useRecord from '../../../../../../hooks/useRecord'
import { ClassProvider } from '../../../../../../contexts/ClassContext'
import Layout, { PageHeader } from '../../../../../../components/Layout'
import ExercisesList from '../../../../../../domain/ExercisesLists/Show'

const ClassExercisesListPage = () => {
  const router = useRouter()
  const { classId, exercisesListId } = router.query
  const {
    record: exercicesList,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  } = useRecord('/listQuestion', exercisesListId, {
    query: { idClass: classId }
  })

  const ClassExercisesListPageHeader = classRecord => (
    <PageHeader
      pageTitle={exercicesList?.title}
      breadcrumbs={[
        { slug: 'my-classes', name: 'Minhas Turmas', href: '/' },
        {
          slug: 'class',
          name: classRecord?.name,
          href: `/turmas/${classId}`
        },
        {
          slug: 'list',
          name: 'Listas de exercícios',
          href: `/turmas/${classId}/listas-de-exercicios`
        },
        {
          slug: 'list',
          name: exercicesList?.title,
          href: `/turmas/${classId}/listas-de-exercicios/${exercisesListId}`
        }
      ]}
    />
  )

  return (
    <Layout>
      <ClassProvider
        classId={classId}
        pageHeader={ClassExercisesListPageHeader}
      >
        <ExercisesList
          classId={classId}
          exercisesListId={exercisesListId}
          {...exercicesList}
        />
      </ClassProvider>
    </Layout>
  )
}

export default ClassExercisesListPage
