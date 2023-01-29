import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import GatewayTable from "./GatewayTable";
import Loading from "./Loading";

const Gateways = () => {
  const [dbGateway, setDbGateway] = useState(null);
  const [errorGateway, setErrorGateway] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

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
  return (
    <>
      {initialLoading && <Loading />}
      {dbGateway && <GatewayTable dbGateway={dbGateway} />}
    </>
  );
};

export default Gateways;
