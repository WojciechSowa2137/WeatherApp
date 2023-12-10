import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchData } from "../store/slices/searchSlice";
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
  const dispatch = useDispatch();
  function handleSet(value: string) {
    dispatch(setSearchData(value));
  }
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div>
        <form action="">
          <input
            type="text"
            placeholder="lat lon or city name"
            onInput={(evt) => setInputValue(evt.target.value)}
          />
          <Link to="/search">
            <button
              onClick={() => {
                handleSet(inputValue);
              }}
            >
              SEARCH
            </button>
          </Link>
        </form>
      </div>
      <div>map</div>
      <div>something</div>
    </>
  );
}
