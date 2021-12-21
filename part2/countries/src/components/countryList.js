import Country from "./Country";

const CountryList = ({ countries }) =>{
    if (countries.length > 10 ){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countries.length >1){
        return (
            <ul>
                {countries.map(country => 
                    <div key = {country.name.official}>
                        {country.name.common}
                    </div>
                )}
            </ul>
        )
    }
    else if (countries.length == 1){
        const country = countries[0];
        const language = Object.values(country.languages);
        console.log(language);
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p> population {country.population}</p>
                <h2>languages</h2>
                <ul>
                {language.map(lan =>
                    <li key={lan}>
                        {lan}
                    </li>
                    )}
                </ul>
                <p>{country.flag}</p>
            </div>
            
        )
    }
    else{
        return(
            <p>none found</p>
        )
    }
    
}

export default CountryList;