import "./App.css";
import { Banner } from "@components/banner";
import { Card } from "@components/card";
import { Layout } from "@components/layout";

function App() {
  return (
    <>
      <Layout>
        <Banner />
        <Card />
      </Layout>
    </>
  );
}

export default App;
