import logo from "./assets/logo.png";
export default function Header() {
  const nav = ["Home", "Favorites", "contact"];
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>
          Country<span className="header-span">MAN</span>ia
        </h1>
      </div>
      <div className="nav-lists">
        {nav.map((item) => (
          <a>{item}</a>
        ))}
      </div>
    </div>
  );
}
