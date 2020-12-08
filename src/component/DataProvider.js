import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import '../style/card.css'
import '../style/style.css'


function DataProvider() {
  const [globalData, setGlobalData] = useState({});
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    const apiURL = "https://disease.sh/v3/covid-19/all"
    const countryListApiURL = "https://disease.sh/v3/covid-19/countries"
    axios.get(apiURL)
      .then((response) => {
        setGlobalData(response.data)
        console.log(response.data)
      })
      .catch((err) => console.log(err));
    axios.get()
  }, [])


  return (
    <div className="global-container">
      <h1>Hello, I am the COVID Tracker App!</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value="abc">
          {countryList.map((country) => {}
            
          )}

          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Option 2</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem>
          <MenuItem value="worldwide">Option 4</MenuItem>
        </Select>
      </FormControl>
      <div className="global-data-container">

          <Grid container>
            <Card className="mdc-card">
              <h1>
                Global cases
              </h1>
              <h2>{globalData.cases}</h2>
            </Card>
            <Card className="mdc-card">
              <h1>
                Deaths
              </h1>
              <h2>{globalData.deaths}</h2>
            </Card>
            <Card className="mdc-card">
              <h1>
                Recovered
              </h1>
              <h2>{globalData.recovered}</h2>
            </Card>
          </Grid>

      </div>

    </div>
  )
}

export default DataProvider
