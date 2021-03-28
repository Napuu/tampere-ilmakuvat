import React, { useEffect, useState, useRef } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { setRef } from "@material-ui/core";

mapboxgl.accessToken = "pk.eyJ1IjoicGFsaWtrIiwiYSI6ImNrbTliODB6OTA5OGIydnFsdmozOXNoM3kifQ.lIwSnEiG4haqzQjfkuN9og";

interface Props {
    year: number;
}

export function Map ({year}: Props) {
    const mapRef = useRef();

    const [mapLoaded, setMapLoaded] = useState(false);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/satellite-streets-v11",
            center: { lng: 23.759083900356823, lat: 61.49589108094602 },
            zoom: 12,
        });
        setRef(mapRef, map);

        map.on("load", () => {
            setMapLoaded(true);
        })

        map.on("movestart", () => {
            let tampereLayers = ((map as any).getStyle().layers)
                .filter((l: mapboxgl.Layer) => (l.id as string).startsWith("tampere"))
            tampereLayers = tampereLayers.slice(0, tampereLayers.length - 2);
            // remove all but current visible layer when panning around to
            // keep performance at an acceptable level
            tampereLayers.forEach((layer: mapboxgl.Layer) => {
                console.log("removed", layer.id);
                if (layer.layout?.visibility === "none")
                    map.removeLayer(layer.id);
            });
        })
        return () => map.remove();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapRef !== undefined && mapLoaded) {
            const map: mapboxgl.Map = (mapRef as any).current;
            const layer = map.getLayer("tampere_" + year);
            const src = map.getSource("tampere_" + year);
            if (!src) {
                map.addSource("tampere_" + year, {
                    "type": "raster",
                    "scheme": "tms",
                    "tiles": [
                        `http://192.168.1.184:20001/tampere_${year}/{z}/{x}/{y}.png`
                    ],
                    "tileSize": 256
                });
            }
            if (!layer) {
                map.addLayer({
                    type: "raster",
                    id: "tampere_" + year,
                    source: "tampere_" + year
                });
            }

            map.setLayoutProperty("tampere_" + year, "visibility", "visible");
            const layerIds = ((map as any).getStyle().layers)
                                 .filter((l: mapboxgl.Layer) => (l.id as string).startsWith("tampere"))
                                 .map((l: mapboxgl.Layer) => l.id);
            layerIds.forEach((l: string) => {
                if (l !== "tampere_" + year)
                    map.setLayoutProperty(l, "visibility", "none");
            })
            console.log(year);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, mapRef, mapLoaded]);

    return (
        <div id="mapContainer" />
    )
}
