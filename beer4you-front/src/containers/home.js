import React from "react";
import beer from "../assets/logo/kroHome.jpg";

// Page Home
class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <p id="home-presentation">
          {" "}
          Les brésiliens savent faire la fête, ça on sait. Mais ils savent aussi
          faire des bières ! Ici vous trouverez les marques les plus appréciés
          par les brésiliens et peut-être vous trouverez le goût du carnaval.
          Aproveite !
        </p>

        <img src={beer} id="homerHome" />
      </div>
    );
  }
}

export default Home;
