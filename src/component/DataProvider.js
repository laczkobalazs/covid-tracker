import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table'
import Grid from '@material-ui/core/Grid'
import InfoBox from './InfoBox'
import LineGraph from './LineGraph'
import Map from './Map'
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core'
import '../style/card.css'
import '../style/style.css'
import { sortData } from '../util.js'
import "leaflet/dist/leaflet.css";


function DataProvider() {
  const [globalData, setGlobalData] = useState({});
  const [countryData, setCountryData] = useState([])
  const [countryNameList, setCountryNamelist] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases")

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
        const countries = response.data.map((country) => (country.country))
        setCountryData(response.data)
        setCountryNamelist(countries)
        let sortedData = sortData(response.data);
        setTableData(sortedData)
        console.log(countryData)
      })
      .catch((err) => console.log(err));
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    axios.get(url)
    .then((res) => {
      setCountryData(res.data)
    })
  };

  return (
    <div className="global-container">
      <div className="global-container-left">
        <div className="global-container-header">
          <h1>Hello, I am the COVID Tracker App!</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countryNameList.map((country) => (
                <MenuItem value={country} key={country}>{country}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="container-statistics">
          <InfoBox title="Coronavirus Cases" cases={countryData.todayCases} total={countryData.cases}/>
          <InfoBox title="Recoveries" cases={countryData.todayRecovered} total={countryData.recovered}/>
          <InfoBox title="Death" cases={countryData.todayDeaths} total={countryData.deaths}/>
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
            <Table countries={tableData} />
            <h3>Worldwide new cases</h3>
            <LineGraph caseType={caseType} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataProvider
