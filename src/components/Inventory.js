import React, { useEffect, useState } from "react";
import InventoryForm from "./InventoryForm";

import { db } from "../firebase";
import { toast } from "react-toastify";

const Inventory = () => {
  const [inventarios, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getLinks = async () => {
    db.collection("Control de Inventarios").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("¿Esta seguro que quiere eliminar el enlace?")) {
      await db.collection("Control de Inventarios").doc(id).delete();
      toast("Enlace eliminado satisfactoriamente", {
        type: "error",
        autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("Control de Inventarios").doc().set(linkObject);
        toast("Nuevo producto registrado", {
          type: "success",
        });
      } else {
        await db.collection("Control de Inventarios").doc(currentId).update(linkObject);
        toast("Producto actualizado satisfactoriamente", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-8 p-2">
        <InventoryForm {...{ addOrEditLink, currentId, inventarios }} />
      </div>
      <div className="col-md-4 p-2">
        {inventarios.map((inventario) => (
          <div className="card mb-1" key={inventario.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{inventario.namef}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(inventario.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(inventario.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              
              <h6>URL de la empresa </h6>
              <p>{inventario.url}</p>

              <h6>Nombre de la empresa </h6>
              <p>{inventario.namef}</p>

              <h6>ID</h6>
              <p>{inventario.id}</p>

              <h6>Nombre del producto</h6>
              <p>{inventario.producto}</p>

              <h6>Precio de productos </h6>
              <p>{inventario.precio}</p>

              <h6>Cuantos hay en bodega </h6>
              <p>{inventario.bodega}</p>

              <h6>Descripcion </h6>
              <p>{inventario.description}</p>

              <a href={inventario.url} target="_blank" rel="noopener noreferrer">Ir al sitio web</a>
              
            </div>
             
          </div>
        ))}
      </div>
    </>
  );
};

export default Inventory;