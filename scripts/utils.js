export const isClosest = () => {};

export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const getNearestLocations = (lat, long, locations) => {
  let closest = locations[0];
  let closestDistance = getDistance(lat, long, closest.lat, closest.long);
  locations.forEach((location) => {
    let distance = getDistance(lat, long, location.lat, location.long);
    if (distance < closestDistance) {
      closest = location;
      closestDistance = distance;
    }
  });
  return closest;
};
export const getLocationByName = (locationName, locations) => {
  let location = null;
  locations.forEach((loc) => {
    if (loc.name == locationName) {
      location = loc;
      return location;
    }
  });
  return location;
};
