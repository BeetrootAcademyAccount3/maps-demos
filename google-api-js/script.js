// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  const position1 = { lat: -37.813, lng: 144.963 };
  const position2 = { lat: -33.868, lng: 151.209 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });

  const marker1 = new AdvancedMarkerElement({
    map: map,
    position: position1,
    title: "Melbourne",
  });

  const marker2 = new AdvancedMarkerElement({
    map: map,
    position: position2,
    title: "Sydney",
  });

  /*
  const line = new google.maps.Polyline({
    path: [position, position2],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  line.setMap(map);
  */

  const directionService = new google.maps.DirectionsService();
  const directionRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true,
  });

  directionService.route(
    {
      origin: position1,
      destination: position2,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionRenderer.setDirections(response);
      } else {
        console.error("Error", status);
      }
    }
  );
}

initMap();
