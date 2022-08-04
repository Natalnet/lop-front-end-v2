import { useRouter } from 'next/router'

import { ClassProvider } from '../../../../../contexts/ClassContext'
import Layout, { PageHeader } from '../../../../../components/Layout'
import ExercisesLists from '../../../../../domain/ExercisesLists/List'

const ClassPage = () => {
  const router = useRouter()
  const { classId } = router.query

  const ClassPageHeader = classRecord => (
    <PageHeader
      pageTitle="Listas de exercícios"
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
        }
      ]}
    />
  )

  return (
    <Layout>
      <ClassProvider classId={classId} pageHeader={ClassPageHeader}>
        <ExercisesLists classId={classId} />
      </ClassProvider>
    </Layout>
  )
}

export default ClassPage
