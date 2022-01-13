import React from "react";

import Table from "../components/Table";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

type HomeProps = {
  loading: boolean;
  champions: Share[];
  shares: Share[];
};

const Home = ({ loading, champions, shares }: HomeProps) => {
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

export default Home;
