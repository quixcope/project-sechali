import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/global/header";
import Home from "@/components/home";
import Loading from "@/components/global/loading";
import AboutUs from "@/components/aboutus";
import Login from "@/components/login";

const Index = () => {
  const [state, setState] = useState({
    loading: false,
    activePage: "home",
  });

  return state.loading ? (
    <Loading />
  ) : (
    <div>
      <Head>
        <title>Seç Halı</title>
        <meta name="description" content="sechali-website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sechali.png" />
      </Head>
      <Header setState={setState} />
      {state.activePage === "home" ? (
        <Home />
      ) : state.activePage === "aboutus" ? (
        <AboutUs />
      ) : state.activePage === "login" ? (
        <Login setState={setState} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Index;
