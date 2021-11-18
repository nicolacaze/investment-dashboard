import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import Table from "../components/Table";
import Layout from "../components/Layout";
import { useAuthContext } from "../context/AuthContext";

const Home = ({ shares }) => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <Table shares={shares} />
    </Layout>
  );
};

Home.propTypes = {
  shares: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ticker: PropTypes.string,
      industry: PropTypes.string,
      numberOfYears: PropTypes.number,
    })
  ),
};

export default Home;
