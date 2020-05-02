// Foursquare API Info
const clientId = 'TMZ5DJM4I2VQDY4B5GRKA4CFN2VGYQUFE2OWJCR3JOYYEX4W';
const clientSecret = '1G2A3NT2THTINTOZQXTEOR3DHQ3B3PCN22QTSF1GIDQXTBTM';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const photoUrl = 'https://api.foursquare.com/v2/venues/';


// OpenWeather Info
const openWeatherKey = '8ca8c293f2d25ac683b948bbc6027b1a';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
        const city = $input.val();
        const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
        try {
                const response = await fetch(urlToFetch);
                if (response.ok) {
                        const jsonResponse = await response.json();
                        const venues = jsonResponse.response.groups[0].items.map(item => item.venue);

                        return venues;
                }
        } catch (error) {
                console.log(error)
        }
}


const getForecast = async () => {
        const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
        try {
                const response = await fetch(urlToFetch);
                if (response.ok) {
                        const jsonResponse = await response.json();

                        return jsonResponse;
                }
        } catch (error) {
                console.log(error)
        }
}

const getPhoto = async (venueId) => {
        const urlToFetch = `${photoUrl}${venueId}/photos?&limit=1&client_id=${clientId}&client_secret=${clientSecret}&v=20200501`;
        try {
                const response = await fetch(urlToFetch);
                if (response.ok) {
                        const jsonResponse = await response.json();
                        const photo = `${jsonResponse.response.photos.items[0].prefix}100${jsonResponse.response.photos.items[0].suffix}`;
                        console.log(photo);
                        return photo;

                } else {
                        throw new Error('request failed');
                }
        } catch (error) {
                console.log(error);
        }
}


// Render functions
const renderVenues = (venues) => {
        $venueDivs.forEach(($venue, index) => {
                const venue = venues[index];

                let venueContent = createVenueHTML(venue.name, venue.location);
                $venue.append(venueContent);

                getPhoto(venue.id).
                then(photo => {
                        let photoContent = addPic(photo);
                        $venue.append(photoContent);
                });

        });
        $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
        const weatherContent = createWeatherHTML(day);
        $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
        $venueDivs.forEach(venue => venue.empty());
        $weatherDiv.empty();
        $destination.empty();
        $container.css("visibility", "visible");
        getVenues().then(venues => {
                renderVenues(venues);
        });
        getForecast().then(forecast => renderForecast(forecast));
        return false;
}


$submit.click(executeSearch)