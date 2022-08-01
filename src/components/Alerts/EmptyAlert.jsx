import React from 'react'

const EmptyAlert = () => {
  return (
    <div className="alert alert-warning d-flex align-items-center p-5">
      <i className="fad fa-dolly-empty fa-fw me-4 fs-2x text-warning"></i>
      <div className="d-flex flex-column">
        <h4 className="mb-1 text-warning">Nenhum registro encontrado</h4>
        <span>Não conseguimos trazer resultados para esta solicitação</span>
      </div>
    </div>
  )
}

export default EmptyAlert
