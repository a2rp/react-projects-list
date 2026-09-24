import React from "react";
import MemesGenerator from "./memesGenerator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const links = [
    ["Portfolio", "https://www.ashishranjan.net/", "↗"], ["GitHub", "https://github.com/a2rp", "GH"], ["CodePen", "https://codepen.io/ash1198", "CP"], ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", "in"], ["Facebook", "https://www.facebook.com/theash.ashish/", "f"], ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", "▶"], ["Email", "mailto:ash.ranjan09@gmail.com", "@"], ["Support", "https://a2rp-donation-page.netlify.app/", "♥"], ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", "☕"], ["Patreon", "https://www.patreon.com/a2rp", "P"],
];

const App = () => (
    <div className="memeApp">
        <header className="siteHeader">
            <a className="brand" href="https://github.com/a2rp/react-projects-list" target="_blank" rel="noopener noreferrer">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
                <span>Meme Studio</span>
            </a>
            <span className="headerNote">Create and save your own meme cards</span>
        </header>
        <main className="pageContent"><MemesGenerator /></main>
        <footer className="siteFooter">
            <p>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p>
            <nav aria-label="Links and support">{links.map(([label, href, icon]) => <a key={label} href={href} aria-label={label} title={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{icon}</a>)}</nav>
        </footer>
        <ToastContainer />
    </div>
);

export default App;