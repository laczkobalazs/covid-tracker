import React,  { useState, useEffect } from 'react';
import axios from 'axios';


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
      
    </div>
  )
}

export default DataProvider
