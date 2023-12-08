import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchOptions from "./searchOptions";
// async function getMap(layer: string,z: string,x: string,y:string) {
//   const response = await fetch(
//     `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${
//       import.meta.env.VITE_API_KEY
//     }`
//   );
//   const blob = await response.blob();

//   const imgUrl = URL.createObjectURL(blob);

//   return imgUrl;
// }

export default function Home() {
  //   const [mapUrl, setMapUrl] = useState<string | null>(null);

  //   useEffect(() => {
  //     getMap('temp_new','2','1','1').then(setMapUrl);
  //   }, []);
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);

  return (
    <>
      <div>
        <form action="">
          <input
            type="text"
            onInput={(evt) => setInputValue(evt.target.value)}
          />
          <Link to="/search">
          <button>SEARCH</button>
          </Link>
        </form>
      </div>
      <div>map</div>
      <div>something</div>
    </>
  );
}
