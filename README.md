## TunePlot 🗺

What's going on tonight? That is the question that TunePlot seeks to answer. Users can search through different US cities by inputting different dates, or alternatively search for specific musical artist tours directly.

You can check out the live site [here](https://tuneplot.herokuapp.com/).

### Technology Overview

I built TunePlot over the span of a week. I used React (using the create-react-app to get started) for front-end rendering, Redux for state management, Mapbox GL JS for location lookup and mapping functionality, as well as the Ticketmaster Events API as the data source for all of my queried events. Additionally, I used the flatpickr.js library to serve as a calendar input, and RainbowVis-JS to help with color gradient rendering for artist search functionality.

### Artist Search Gradient Rendering

When you search for a specific artist, Songspot will render markers following a color gradient representing the relative nearness of the event date. This was an interesting challenge to solve. I ended up solving it by building a sorted array of venues from my component state and using the RainbowVis-JS library to generate a gradient of separate colors and then assign specific colors to each marker depending on their position in the sorted array.
![artist search](https://media.giphy.com/media/4N5j7jYWsViUoLls5F/giphy.gif)

Because not every event response object had a dateTime attribute, I needed to check events by both dateTime and localDate when ordering them.

```
orderByDate() {
    let venues = this.props.venues;
    let output = [venues[0]];
    for (let i = 1; i < venues.length; i++) {
      let newDate = venues[i].dates.start.dateTime
        ? venues[i].dates.start.dateTime
        : venues[i].dates.start.localDate;

      let comparisonDate = output[0].dates.start.dateTime
        ? output[0].dates.start.dateTime
        : output[0].dates.start.localDate;
      if (new Date(newDate) < new Date(comparisonDate)) {
        output.unshift(venues[i]);
      } else if (new Date(newDate) > new Date(comparisonDate)) {
        output.push(venues[i]);
      } else {
        for (let j = 0; j < output.length; j++) {
          if (
            new Date(output[j].dates.start.dateTime) <=
              new Date(venues[i].dates.start.dateTime) &&
            new Date(output[j + 1].dates.start.dateTime) >
              new Date(venues[i].dates.start.dateTime)
          ) {
            output = output
              .slice(0, j + 1)
              .concat(venues[i])
              .concat(output.slice(j + 1));
            break;
          }
        }
      }
    }
    return output;
  }
  ```

### Future Implementations

I had a lot of fun working on this project, and am planning on adding new features in the future. I plan on utilizing an external API to request different artist suggestions in a dropdown; currently, the user needs to type in the full artist name. I am also interested in utilizing the Spotify API to provide additional information about queried artists and usign responsive design to make the app mobile friendly.