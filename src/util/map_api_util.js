const key = process.env.REACT_APP_MAPBOX_KEY;
export const geocoder = query =>
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=us&types=place&access_token=${key}`
  ).then(res => {
    return res.json();
  });
