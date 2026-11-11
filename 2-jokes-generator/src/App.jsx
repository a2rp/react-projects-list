import { useState } from "react";
import "./App.css";

const sampleJokes = [
  { setup: "Why did the developer go broke?", punchline: "Because they used up all their cache." },
  { setup: "What do React developers eat for breakfast?", punchline: "Component flakes." },
  { setup: "Why was the JavaScript developer calm?", punchline: "They knew how to handle their callbacks." },
];

const links = [
  ["Portfolio", "https://www.ashishranjan.net/", "↗"], ["GitHub", "https://github.com/a2rp", "GH"], ["CodePen", "https://codepen.io/ash1198", "CP"], ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", "in"], ["Facebook", "https://www.facebook.com/theash.ashish/", "f"], ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", "▶"], ["Email", "mailto:ash.ranjan09@gmail.com", "@"], ["Support", "https://a2rp-donation-page.netlify.app/", "♥"], ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", "☕"], ["Patreon", "https://www.patreon.com/a2rp", "P"],
];

function App() {
  const [joke, setJoke] = useState(sampleJokes[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getJoke = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!response.ok) throw new Error("Unable to load a joke");
      const nextJoke = await response.json();
      if (typeof nextJoke.setup !== "string" || typeof nextJoke.punchline !== "string") {
        throw new Error("The joke service returned an invalid response.");
      }
      setJoke(nextJoke);
    } catch {
      const fallback = sampleJokes[Math.floor(Math.random() * sampleJokes.length)];
      setJoke(fallback);
      setMessage("Showing an offline joke.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jokeApp">
      <header className="siteHeader">
        <a className="brand" href="https://github.com/a2rp/react-projects-list" target="_blank" rel="noopener noreferrer">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
          <span>Jokes Generator</span>
        </a>
        <span className="headerNote">A little fun for your break</span>
      </header>
      <main className="jokeMain">
        <section className="jokeCard" aria-live="polite">
          <p className="eyebrow">Random joke</p>
          <h1>{joke.setup}</h1>
          <p className="punchline">{joke.punchline}</p>
          <button type="button" onClick={getJoke} disabled={loading}>{loading ? "Loading..." : "Get another joke"} <span aria-hidden="true">↗</span></button>
          {message && <p className="message">{message}</p>}
        </section>
      </main>
      <footer className="siteFooter">
        <p>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p>
        <nav aria-label="Links and support">{links.map(([label, href, icon]) => <a key={label} href={href} aria-label={label} title={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{icon}</a>)}</nav>
      </footer>
    </div>
  );
}

export default App;
