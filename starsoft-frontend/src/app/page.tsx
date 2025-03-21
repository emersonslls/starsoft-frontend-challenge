/* <---- SCSS ----> */
import "./styles/pages/home.scss";

/* <---- COMPONENTS ----> */
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";

export default function Home() {
  return (
    <div className="Container">
      <Header />
      <h1>CONTEUDO DO SITE</h1>
      <Footer />
    </div>
  );
}