let map;
let directionsService;
let directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 37.7749, lng: -122.4194 }
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

document.getElementById('jsonFile').addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    computeRoute(data.places);
  };
  reader.readAsText(file);
}

function computeRoute(places) {
  if (!places || places.length < 2) {
    alert('At least two places are required');
    return;
  }
  const origin = places[0].address;
  const destination = places[places.length - 1].address;
  const waypoints = places.slice(1, -1).map(p => ({ location: p.address }));

  directionsService.route({
    origin,
    destination,
    waypoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    } else {
      alert('Directions request failed due to ' + status);
    }
  });
}
