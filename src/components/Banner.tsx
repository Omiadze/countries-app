import banner from "./assets/banner.jpg";

export default function Banner() {
  return (
    <div>
      <div className="banner-div">
        <img className="banner" src={banner} alt="" />
        <div className="overlay"></div>
      </div>
      <div className="banner-content">
        <h1>
          <span className="banner-span">FIND</span> intresting informations
          about different countries and{" "}
          <span className="banner-span">CHOOSE</span> your favorite
        </h1>
        <button className="btn-find">FIND</button>
      </div>
    </div>
  );
}
