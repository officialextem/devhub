import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Updates from "./components/Updates.jsx";
import Socials from "./components/Socials.jsx";
import Footer from "./components/Footer.jsx";
import Impressum from "./pages/Impressum.jsx";
import Datenschutz from "./pages/Datenschutz.jsx";

function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Updates />
      <Socials />
    </>
  );
}

function resolvePage(pathname) {
  if (pathname.endsWith("/impressum")) {
    return <Impressum />;
  }

  if (pathname.endsWith("/datenschutz")) {
    return <Datenschutz />;
  }

  return <LandingPage />;
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{resolvePage(window.location.pathname)}</main>
      <Footer />
    </div>
  );
}
