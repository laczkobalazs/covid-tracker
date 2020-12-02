import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'


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
    <div>
      <div className="global-data-container">
        <Grid container spacing={20}>

        
          <Card>
            <h1>
              Global cases
            </h1>
            <h2>{globalData.cases}</h2>
          </Card>
          <Card>
            <h1>
              Deaths
            </h1>
            <h2>{globalData.deaths}</h2>
          </Card>
          <Card>
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
