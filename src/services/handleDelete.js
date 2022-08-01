import _ from 'lodash'
import Swal from 'sweetalert2'

const handleDelete = async (path, id, config, dataProvider) => {
  let mustConfirm = true
  let title = 'Tem certeza?'
  let text = 'O registro será excluído permanentemente!'

  if (config) {
    const { confirm, confirmTitle, confirmText } = config

    if (confirm === false) mustConfirm = false
    if (confirmTitle) title = confirmTitle
    if (confirmText) text = confirmText
  }

  const deleteRecord = async id => await dataProvider.delete(path, id)

  if (mustConfirm) {
    await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, pode excluir!',
      cancelButtonText: 'Não',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light btn-active-light-primary'
      }
    }).then(async result => {
      if (result.value) {
        Swal.fire({
          title: 'Excluído!',
          text: 'Seu registro foi excluído permanentemente.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-light btn-active-light-primary'
          }
        })

        await deleteRecord(id)
      } else if (result.dismiss === Swal.DismissReason.cancel)
        Swal.fire('Cancelado', 'Seu registro está a salvo', 'error')
    })
  } else await deleteRecord(id)
}

export default handleDelete
