import React from "react";

const ErrorAlert = () => {
  return (
    <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
      <i className="fad fa-exclamation-circle fa-fw me-4 fs-2x text-danger"></i>
      <div className="d-flex flex-column">
        <h4 className="mb-1 text-danger">Ooops, houve um problema!</h4>
        <span>
          Por favor, tente novamente em instantes e, caso o erro persista, entre
          em contato com o nosso time de suporte
        </span>
      </div>
    </div>
  );
};

export default ErrorAlert;
