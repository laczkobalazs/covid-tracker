import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios';

function LineGraph() {

  const [data, setData] = useState({})

  const historicalURL =  "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

  useEffect(() => {
    axios.get(historicalURL)
      .then((response) => {
        const chartData = buildChartData(response.data);
        setData(chartData)
      })
    
  }, [])

  const buildChartData = (data, casesType ='cases') => {
    const chartData = [];
    let lastDataPoint;

    data.cases.forEach(date => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    })
    return chartData
  }

  return (
    <div>
      <h1>I am a graph </h1>
      {/* <Line data options/> */}
      
    </div>
  )
}

export default LineGraph
