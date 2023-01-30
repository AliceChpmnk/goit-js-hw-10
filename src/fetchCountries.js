export class CountriesAPI {
    static BASE_URL = 'https://restcountries.com/v3.1/';

    fetchCountries(name) {
        const searchParams = new URLSearchParams({
            fields:'name,capital,population,flags,languages',
        });
        return fetch(`${CountriesAPI.BASE_URL}name/${name}?${searchParams}`).then(
            response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        );
}
}