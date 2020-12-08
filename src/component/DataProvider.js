import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import InfoBox from './InfoBox'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import '../style/card.css'
import '../style/style.css'


function DataProvider() {
  const [globalData, setGlobalData] = useState({});
  const [countryData, setCountryData] = useState([])
  const [countryList, setCountrylist] = useState([])
  const [country, setCountry] = useState("worldwide")

  useEffect(() => {
    const apiURL = "https://disease.sh/v3/covid-19/all"
    axios.get(apiURL)
      .then((response) => {
        setGlobalData(response.data)
      })
      .catch((err) => console.log(err));
    
  }, [])

  useEffect(() => {
    const countryListApiURL = "https://disease.sh/v3/covid-19/countries"
    axios.get(countryListApiURL)
      .then((response) => {
        const countries = response.data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }))
        setCountryData(response.data)
        setCountrylist(countries)
      })
      .catch((err) => console.log(err));
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
  }

  return (
    <div className="global-container">
      <div className="global-container-header">
        <h1>Hello, I am the COVID Tracker App!</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countryList.map((country) => (
              <MenuItem value={country.value} key={country.name}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="container-statistics">
        <InfoBox title="Coronavirus Cases" cases={10002300} total={2000}/>

        <InfoBox title="Recoveries" cases={10102000} total={2000}/>

        <InfoBox title="Death" cases={100012000} total={2000}/>
      </div>


      <div className="global-data-container">
          <Grid container>
            <Card className="mdc-card">
              <h1>
                Cases
              </h1>
              <h2>{globalData.cases}</h2>
            </Card>
            <Card className="mdc-card">
              <h1>
                Recovered
              </h1>
              <h2>{globalData.deaths}</h2>
            </Card>
            <Card className="mdc-card">
              <h1>
                Deaths
              </h1>
              <h2>{globalData.recovered}</h2>
            </Card>
          </Grid>

      </div>

    </div>
  )
}

export default DataProvider
