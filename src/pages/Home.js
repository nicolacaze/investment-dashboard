import React from "react";
import PropTypes from "prop-types";

import Table from "../components/Table";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

const Home = ({ loading, champions, shares }) => {
  return loading ? (
    <Layout>
      <Loader />
    </Layout>
  ) : (
    <Layout>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <div className="flex flex-col justify-evenly h-full">
        <div className="flex justify-center max-w-6xl">
          {champions.map((champion) => (
            <div
              key={champion.id}
              className="bg-light-khaki h-48 p-3 rounded w-60 mx-10 shadow-lg grid text-xl"
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
  loading: PropTypes.bool,
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
