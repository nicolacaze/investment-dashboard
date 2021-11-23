import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Table from "../components/Table";
import Layout from "../components/Layout";
import { useAuthContext } from "../context/AuthContext";

const Home = ({ champions, shares }) => {
  const { isLoggedIn, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return loading ? (
    <Layout>
      <p>Loading...</p>
    </Layout>
  ) : (
    <Layout>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <div className="flex flex-col justify-evenly h-full">
        <div className="flex justify-between">
          {champions.map((champion) => (
            <div
              key={champion.id}
              className="bg-light-khaki h-48 p-3 rounded w-60 mx-4 shadow-lg grid text-xl"
            >
              <h5>{champion.name}</h5>
              <p className="justify-self-end self-end text-3xl">
                ${champion.price}
              </p>
            </div>
          ))}
        </div>
        <Table shares={shares} />
      </div>
    </Layout>
  );
};

Home.propTypes = {
  champions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ticker: PropTypes.string,
      industry: PropTypes.string,
      numberOfYears: PropTypes.number,
      price: PropTypes.number,
      dividendYield: PropTypes.number,
    })
  ),
  shares: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ticker: PropTypes.string,
      industry: PropTypes.string,
      numberOfYears: PropTypes.number,
      price: PropTypes.number,
      dividendYield: PropTypes.number,
    })
  ),
};

export default Home;
