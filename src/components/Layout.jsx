import Topbar from './Topbar'
import Footer from './Footer'
import PageHeader from './PageHeader'
import Container from './Container'

const Layout = ({ pageTitle, breadcrumbs, children }) => {
  return (
    <>
      <Topbar />
      <div className="py-10 min-h-[800px]">
        <PageHeader pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
        <main>
          <Container>{children}</Container>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
