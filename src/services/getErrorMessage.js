import _ from 'lodash'
import '@formatjs/intl-listformat/polyfill'
import '@formatjs/intl-listformat/locale-data/pt'

const getErrorMessage = (error, keysNames = {}) => {
  let errors = error
  let errorTitle = 'Oops'
  let errorMessage = ''

  // Error 😨
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    errorTitle = error.response.status

    if (_.has(error.response, 'data.errors'))
      errors = error.response.data.errors
    else if (_.has(error.response, 'data.error'))
      errors = error.response.data.error
    else if (_.has(error.response, 'data.erro'))
      errors = error.response.data.erro
    else if (_.has(error.response, 'data.message.errors'))
      errors = error.response.data.message.errors
    else if (_.has(error.response, 'data.message.error'))
      errors = error.response.data.message.error
    else if (_.has(error.response, 'data.message'))
      errors = error.response.data.message
    else errors = 'Ocorreu um erro inesperado'
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    errorTitle = 'Sem internet'
    errors =
      'Sua conexão falhou durante o processo e não conseguimos continuar, verifique e tente novamente.'
  } else if (error.message) {
    // Something happened in setting up the request and triggered an Error
    errors = error.message
  }

  let errorsArray = []
  if (_.isArray(errors)) {
    errorsArray = errors
  } else if (_.isObject(errors)) {
    for (const errorKey of Object.keys(errors)) {
      const errorMessages = errors[errorKey]
      const name = _.get(keysNames, errorKey, errorKey)

      if (_.isArray(errorMessages)) {
        errorsArray.push(
          `${name} ${new Intl.ListFormat('pt-BR').format(errorMessages)}`
        )
      } else {
        errorsArray.push(
          `${name} ${
            _.isString(errorMessages)
              ? errorMessages
              : JSON.stringify(errorMessages)
          }`
        )
      }
    }
  } else {
    errorsArray = [errors]
  }

  errorMessage = new Intl.ListFormat('pt-BR').format(errorsArray)

  return {
    title: errorTitle.toString(),
    message: errorMessage,
    errors
  }
}

export default getErrorMessage
