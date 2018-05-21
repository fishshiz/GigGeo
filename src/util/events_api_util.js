const key = process.env.REACT_APP_TM_KEY;
export const edSheeranTour = () =>
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${key}&keyword=ed%20sheeran&countryCode=US`
  ).then(res => {
    return res.json();
  });

export const searchArtist = artistName =>
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${key}&keyword=${artistName
      .split(" ")
      .join("%20")}&countryCode=US`
  ).then(res => {
    return res.json();
  });
