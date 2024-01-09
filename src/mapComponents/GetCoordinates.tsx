import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import { Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";

interface mousePositionProps {
  lat: number;
  lng: number;
}

interface GetCoordinatesProps {
  handleSet: (value: string) => void;
}

export default function GetCoordinates({ handleSet }: GetCoordinatesProps) {
  const map = useMap();
  const [position, setPosition] = useState<mousePositionProps | null>(null);
  useEffect(() => {
    if (!map) return;

    const info = L.DomUtil.create("div", "legend");

    const PositionControl = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function () {
        info.textContent = "Click on the map";
        return info;
      },
    });

    const positionControl = new PositionControl();
    positionControl.addTo(map);

    const handleMapClick = (e: any) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      info.textContent = `${lat}, ${lng}`;
      console.log(e);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      map.removeControl(positionControl);
    };
  }, [map]);
  return position ? (
    <Marker position={position}>
      <Popup>
        <Link to="/search">
          <Button
            onClick={() => {
              handleSet(`${position.lat} ${position.lng}`);
            }}
          >
            GET
          </Button>
        </Link>
      </Popup>
    </Marker>
  ) : null;
}
