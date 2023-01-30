export function createCountriesList (countries) {
    const countriesItems = countries.map(el => {
        return `<li class="country-item">
        <img
          src="${el.flags.svg}"
          alt="${el.flags.alt}"
          width="50px" 
          height="30px"
        />${el.name.official}
      </li>`;    
    });

    return countriesItems.join('');
}