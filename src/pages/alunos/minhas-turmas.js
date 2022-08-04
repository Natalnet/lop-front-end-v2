import LoadWrapper from '../../components/LoadWrapper'
import useRecords from '../../hooks/useRecords'
import ClassCard from '../../domain/Classes/Card'
import Layout, { PageHeader } from '../../components/Layout'

const StudentHomePage = () => {
  const {
    records: classItems,
    isLoading,
    isError,
    isSuccess,
    isEmpty
  } = useRecords('/class')

  return (
    <Layout>
      <PageHeader pageTitle="Minhas turmas" />
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <LoadWrapper
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          isEmpty={isEmpty}
        >
          <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {classItems &&
              classItems.map(classItem => (
                <li key={classItem.id} className="col-span-1">
                  <ClassCard {...classItem} />
                </li>
              ))}
          </ul>
        </LoadWrapper>
      </div>
    </Layout>
  )
}

export default StudentHomePage
