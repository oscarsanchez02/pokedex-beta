import { Link } from "react-router-dom";
import "@fontsource/luckiest-guy"; // Importing the font

export default function NavBar() {
  return (
    <div className="flex justify-center bg-red-400 py-4">
      <div className="text-center font-extrabold text-4xl">
        <Link to="/" className="relative">
          <p
            className="text-yellow-400 font-[Luckiest Guy] 
                       text-5xl md:text-6xl lg:text-7xl 
                       uppercase tracking-widest 
                       [text-shadow:_-4px_-4px_0px_#3B4CCA,_4px_4px_0px_#3B4CCA]"
            style={{ transform: "skewX(-10deg)" }} // Slight slant effect
          >
            Pokédex
          </p>
        </Link>
      </div>
    </div>
  );
}