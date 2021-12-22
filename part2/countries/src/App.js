import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Find from './components/Find';
import CountryList from './components/countryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [find, setFind ] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  const search = (filter) => {
    console.log('effect');
    if (filter !== ""){
      axios
      .get(`https://restcountries.com/v3.1/name/` + filter)
      .then(response => {
        if(response.status === 404){
          console.log('404');
          setCountries([]);
        }
        else{
          console.log('promise fulfilled');
          setCountries(response.data);
        }
        
      })
    }else{
      setCountries([])
    }
    

    console.log(countries);
  }
  

  const handleFind = (event) =>{
    console.log(event.target.value);
    setFind(event.target.value);
    search(event.target.value); 
    
  }

  const ShowCountry = (show) => {
    const newShow = show;
    setFind(newShow);
    search(newShow);
  }

  
  return(
    <div>
      <Find find = {find} handleFind = {handleFind} />
      <CountryList countries = {countries} find = {find} 
      ShowCountry = {ShowCountry} api_key = {api_key}/>
    </div>
  )
}

export default App;
