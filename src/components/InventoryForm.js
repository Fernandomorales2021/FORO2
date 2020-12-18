import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const InventoryForm = (props) => {
  const initialStateValues = {
    namef:"",
    url:"",
    description: "",
    producto: "",
    precio: "",
    bodega: "",
    id: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validURL = str => {
     return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
}

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.url)) {
      return toast("invalid url", { type: "warning", autoClose: 1000 });
    
}
    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("Control de Inventarios").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }

  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <h5 color = "warning">Inventario de productos de empresas <img src="https://www.ceutec.hn/assets/img/logo-ceutec-blanco.png" heigh="250" width="250" alt=""/></h5>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">add</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://www.urldelaempresa.com"
          value={values.url}
          name="url"
          onChange={handleInputChange}
        />
        </div>
        <div className="form-group input-group">
        <div className="input-group-text bg-light">
        <i className="material-icons">account_box</i>
        </div>
        <input
          type="text"
          className="form-control"
          value={values.namef}
          name="namef"
          placeholder="Nombre de la empresa"
          onChange={handleInputChange}
        />
        </div>
        <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
          </div>

        <input
          type="text"
          value={values.producto}
          name="producto"
          placeholder="Nombre del producto "
          className="form-control"
          onChange={handleInputChange}
        />
        <input
          type="text"
          value={values.precio}
          name="precio"
          placeholder="L. Precio"
          className="form-control"
          onChange={handleInputChange}
        />
         <input
          type="text"
          value={values.id}
          name="id"
          placeholder="ID"
          className="form-control"
          onChange={handleInputChange}
        />
         <input
          type="text"
          value={values.bodega}
          name="bodega"
          placeholder="Productos en existencia"
          className="form-control"
          onChange={handleInputChange}
        />

      </div>
      <div className="form-group">
        <textarea
          rows="4"
          className="form-control"
          placeholder="Write a Description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button 
      className="btn btn-primary btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"}
      </button>

<div>
  <h6>Fernando Morales - 61841285</h6>
</div>

    </form>
  );
  };


export default InventoryForm;
