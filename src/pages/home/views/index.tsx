import { useState } from "react";
import { Banner } from "../main-home-page/components/banner";
import { Card } from "../main-home-page/components/card";
// import { lazy } from "react";

// const LazyBanner = lazy(() => import("@/pages/home/components/banner/banner"));
// const LazyCard = lazy(() => import("@/pages/home/components/card/Card"));
const HomePage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <Banner />
      <Card />
      {/* test, washale mere! */}
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Click to increment
      </button>
      <button
        onClick={() => {
          setCounter(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default HomePage;
