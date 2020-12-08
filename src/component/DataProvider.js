import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import '../style/card.css'
import '../style/style.css'


function DataProvider() {
  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    const apiURL = "https://disease.sh/v3/covid-19/all"
    axios.get(apiURL)
      .then((response) => {
        setGlobalData(response.data)
        console.log(response.data)
      })
      .catch((err) => console.log(err));

  }, [])


  return (
    <div className="global-container">
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
        <FormControl>

        </FormControl>
      </div>
      
    </div>
  )
}

export default DataProvider
