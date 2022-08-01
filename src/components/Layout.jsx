import Topbar from './Topbar'
import Footer from './Footer'
import PageHeader from './PageHeader'

const Layout = ({ children }) => {
  return (
    <>
      <Topbar />

      <div className="py-10">
        <PageHeader />
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
