export function createCountryCard({name, capital, population, languages,}) {
    return `<h1 class="heading">${name.official}</h1>
      <p>
        <strong>Capital:</strong> ${capital[0]}<br />
        <strong>Population:</strong> ${population}<br />
        <strong>Languages:</strong> ${Object.values(languages).join(', ')}
      </p>`
}