import { getVenue, showVenue } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options = {
  venue: "mappedin-demo-mall",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
};

async function init() {
  const venue = await getVenue(options);

  const mapView = await showVenue(document.getElementById("app"), venue);
  mapView.FlatLabels.labelAllLocations();

  const startLocation = venue.locations.find(
    (location) => location.name === "Scotiabank"
  );
  const endLocation = venue.locations.find(
    (location) => location.name === "American Eagle"
  );

  const directions = startLocation.directionsTo(endLocation);
  mapView.Journey.draw(directions);

  await mapView.setMap(directions.path[0].map);
}

init();
