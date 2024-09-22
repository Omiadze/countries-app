const Card = () => {
  const countries = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/800px-Flag_of_Georgia.svg.png",
      name: "Georgia",
      population: "3.736 million",
      capital: "Tbilisi",
    },
  ];
  return (
    <div className="cards-container">
      {countries.map((item) => (
        <div className="card-div">
          <img src={item.img} alt="" />
          <hr />
          <div className="card-content">
            <h3>Country: {item.name}</h3>
            <p>Population: {item.population}</p>
            <p>Capital: {item.capital}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
