import React,  { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid'
import InfoBox from './InfoBox'
import Map from './Map'
import { MenuItem, FormControl, Select, Table, Card, CardContent } from '@material-ui/core'
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
      <div className="global-container-left">
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
        <div className="map-container">
          <Map/>
        </div>
        <div className="global-data-container">
          
        </div>
      </div>
      <Card className="global-container-right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            {/* <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataProvider
