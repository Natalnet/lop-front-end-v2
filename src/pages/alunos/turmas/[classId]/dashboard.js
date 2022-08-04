import { useRouter } from 'next/router'

import { ClassProvider } from '../../../../contexts/ClassContext'
import Layout, { PageHeader } from '../../../../components/Layout'

const ClassPage = () => {
  const router = useRouter()
  const { classId } = router.query

  const ClassPageHeader = classRecord => (
    <PageHeader
      pageTitle={classRecord?.name}
      breadcrumbs={[
        { slug: 'my-classes', name: 'Minhas Turmas', href: '/' },
        {
          slug: 'class',
          name: classRecord?.name,
          href: `/turmas/${classId}/dashboard`
        }
      ]}
    />
  )

  return (
    <Layout>
      <ClassProvider
        classId={classId}
        pageHeader={ClassPageHeader}
      ></ClassProvider>
    </Layout>
  )
}

export default ClassPage
