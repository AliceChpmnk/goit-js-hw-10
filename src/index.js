import './css/styles.css';
import { CountriesAPI } from './fetchCountries';
import { createCountryCard } from './templates/countryCard';
import { createCountriesList } from './templates/countryListItem';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
}

const countriesApi = new CountriesAPI();

refs.inputEl.addEventListener('input', debounce(onSearchFormInput, DEBOUNCE_DELAY));

//FUNCTIONS

function onSearchFormInput(event) {
    event.preventDefault();
    // В мене питаннячко, чому тут не працює event.currentTarget? Не можу зрозуміти. 
    // console.log(event.currentTarget); - виводить null

    if (event.target.value == "") {
        clearCountriesData();
        return;
    }

    countriesApi.fetchCountries(event.target.value.trim())
        .then(data => {
            if (data.length == 1) {
                refs.countryListEl.innerHTML = "";
                refs.countryInfoEl.innerHTML = createCountryCard(data[0]);
                document.querySelector('.heading').style.setProperty('--before-content', `url(${data[0].flags.svg})`);
            }

            if (data.length > 1 && data.length <= 10) {
                refs.countryInfoEl.innerHTML = "";
                refs.countryListEl.innerHTML = createCountriesList(data);
            }

            if (data.length > 10) {
                clearCountriesData();
                Notify.info('Too many matches found. Please enter a more specific name.');
            }
    })
        .catch(err => {
            clearCountriesData();
            if (err == 'Error: 404') {
                Notify.failure('Oops, there is no country with that name');
            }
    });
}

function clearCountriesData() {
    refs.countryListEl.innerHTML = "";
    refs.countryInfoEl.innerHTML = "";
}