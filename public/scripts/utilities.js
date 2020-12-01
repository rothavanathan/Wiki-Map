//test data
// const markerPoints = [
//   { lat: 47.570770, lng: -52.680986 },
//   { lat: 47.670770, lng: -52.680986 },
//   { lat: 47.570770, lng: -52.780986 },
//   { lat: 47.470770, lng: -52.680986 },
// ];

const calcBounds = (markers) => {

  const latMIN = (Math.min(...markers.map(point => JSON.parse(point.latlng).lat)));
  const latMAX = (Math.max(...markers.map(point => JSON.parse(point.latlng).lat)));
  const lngMIN = (Math.min(...markers.map(point => JSON.parse(point.latlng).lng)));
  const lngMAX = (Math.max(...markers.map(point => JSON.parse(point.latlng).lng)));
  const bounds = {
    south: latMIN,
    west: lngMIN,
    north: latMAX,
    east: lngMAX
  };
  return bounds;
};

const clearMainArea = () => {
  $("#main-area")
    //clear main-area of child nodes
    .empty();
}
