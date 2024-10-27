import { useState } from "react";
import Loading from "./global/loading";

const AboutUs = () => {
  const [state, setState] = useState({ loading: true });
  return state.loading ? <Loading /> : <div>Hakkimizda sayfasi</div>;
};

export default AboutUs;
