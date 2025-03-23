/* <---- SCSS ----> */
import "./styles/pages/home.scss";

/* <---- COMPONENTS ----> */
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import NFTContainer from "./components/card/NFTContainer";

export default function Home() {
  return (
    <div className="Container">
      <Header />
      <NFTContainer/>
      <Footer />
    </div>
  );
}