import Swal from 'sweetalert2'

import getErrorMessage from './getErrorMessage'

const showErrorAlert = error => {
  const { title, message } = getErrorMessage(error)

  Swal.fire({
    icon: 'error',
    title,
    html: message
  })
}

export default showErrorAlert
