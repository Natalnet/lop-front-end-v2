import React from "react";

const LoadingAlert = () => {
  return (
    <div className="alert alert-primary d-flex align-items-center p-5">
      <i className="fad fa-spinner-third fa-spin fa-fw me-4 fs-2x text-primary"></i>
      <div className="d-flex flex-column">
        <h4 className="mb-1 text-primary">Carregando...</h4>
        <span>Por favor, aguarde enquanto os dados estão sendo carregados</span>
      </div>
    </div>
  );
};

export default LoadingAlert;
