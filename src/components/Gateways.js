import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import AddLoading from "./AddLoading";
import GatewayTable from "./GatewayTable";
import Loading from "./Loading";
import Modal from "./Modal";
import ModalMessage from "./ModalMessage";

const Gateways = () => {
  const [dbGateway, setDbGateway] = useState(null);
  const [errorGateway, setErrorGateway] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [toUpdating, setToUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const url = "http://localhost:5000/api/gateways";
  useEffect(() => {
    setInitialLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDbGateway(res);
          setErrorGateway(null);
        } else {
          setDbGateway(null);
          setErrorGateway(res);
        }
        setInitialLoading(false);
      });
  }, []);

  const createGateway = (data, count) => {
    try {
      if (count > 0) throw new Error();
      delete data.id
      const options = {
        body: data,
        headers: {
          "content-type": "application/json"
        }
      }
      setAddLoading(true)
      helpHttp()
        .post(url, options)
        .then(res => {
          if (!res.err) {
            setDbGateway([...dbGateway, res])
            setErrorGateway(null);
          }
          else {
            res.resp.then(resp => {
              const error = {
                message: resp.message,
                status: res.status
              }
              setErrorGateway(error)
            })
          }
          setAddLoading(false)
        })
    } catch (error) {
      error.message = "Fill all the information.";
      setErrorGateway(error)
    }
  }

  const updateGateway = (data, count) => {
    try {
      if (count > 0) throw new Error();
      const endpoint = `${url}/${data.idGateway}`;
      const options = {
        body: data,
        headers: {
          "content-type": "application/json"
        }
      }
      setAddLoading(true)
      helpHttp()
        .put(endpoint, options)
        .then(res => {
          if (!res.err) {
            const newData = dbGateway.map(el => el.idGateway === data.idGateway ? data : el)
            setDbGateway(newData)
            setErrorGateway(null);
          }
          else {
            res.resp.then(resp => {
              const error = {
                message: resp.message,
                status: res.status
              }
              setErrorGateway(error)
            })
          }
          setAddLoading(false)
          setToUpdating(null);

        })
    } catch (error) {
      error.message = "Fill all the information.";
      setErrorGateway(error)
    }
  }

  const deleteGateway = (id) => {
    const endpoint = `${url}/${id}`;
    const options = {
      headers: {
        "content-type": "application/json"
      }
    }
    const isDelete = window.confirm("Are you sure you wanna delete this gateway?")
    if (isDelete) {
      setIsDeleting(true)
      helpHttp()
        .del(endpoint, options)
        .then(res => {
          if (!res.err) {
            const newData = dbGateway.filter(el => el.idGateway !== id)
            setDbGateway(newData)
            setErrorGateway(null);
          }
          else {
            console.log(res)
            res.resp.then(resp => {
              const error = {
                message: resp.message,
                status: res.status
              }
              setErrorGateway(error)
            })
          }
          setIsDeleting(false)

        })
    }
  }


  return (
    <>
      {initialLoading && <Loading />}
      {(addLoading || isDeleting) && <Modal addState={true} toUpdating={toUpdating} isDeleting={isDeleting}>
        <AddLoading /> </Modal>}
      {errorGateway && <ModalMessage errorGateway={errorGateway} setErrorGateway={setErrorGateway} setToUpdating={setToUpdating}>
        <div style={{ margin: "2rem 1rem" }}>
          <h2>Message:</h2>
          <p style={{ marginTop: "1rem", fontSize: "1.3rem" }}>{errorGateway.message}</p>
        </div>
      </ModalMessage>}
      {dbGateway && <GatewayTable dbGateway={dbGateway} createGateway={createGateway} setToUpdating={setToUpdating} toUpdating={toUpdating} updateGateway={updateGateway} deleteGateway={deleteGateway} />}
    </>
  );
};

export default Gateways;
