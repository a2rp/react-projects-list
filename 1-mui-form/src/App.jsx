import MuiForm from "./muiForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const links = [
    ["Portfolio", "https://www.ashishranjan.net/", "↗"],
    ["GitHub", "https://github.com/a2rp", "GH"],
    ["CodePen", "https://codepen.io/ash1198", "CP"],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", "in"],
    ["Facebook", "https://www.facebook.com/theash.ashish/", "f"],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", "▶"],
    ["Email", "mailto:ash.ranjan09@gmail.com", "@"],
    ["Support", "https://a2rp-donation-page.netlify.app/", "♥"],
    ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", "☕"],
    ["Patreon", "https://www.patreon.com/a2rp", "P"],
];

function App() {
    return (
        <div className="appShell">
            <header className="siteHeader">
                <a className="brand" href="https://github.com/a2rp/react-projects-list" target="_blank" rel="noopener noreferrer">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                    <span>Material UI Form</span>
                </a>
                <span className="headerNote">Validation demo</span>
            </header>
            <main className="pageContent"><MuiForm /></main>
            <footer className="siteFooter">
                <p>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p>
                <nav aria-label="Links and support">
                    {links.map(([label, href, icon]) => <a key={label} href={href} aria-label={label} title={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{icon}</a>)}
                </nav>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default App;