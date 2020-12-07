import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
//npm install --save chart.js
//npm install react-chartjs-2

class Chart extends Component {
    constructor(props) {
        super();
        this.state = {
          chartData: {}
        };
      }
    
      componentWillMount() {
        // this.getchartData(); // this should be this.getChartData();
        this.getChartData();
      }
    
      getChartData() {
        // Ajax calls here
        this.setState({
          chartData: {
            labels: ["You", "Antoine Farley", "Rohhaan Thambithurai"],
            datasets: [
              {
                label: "%",
                data: [30, 30, 40],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)"
                ]
              }
            ]
          }
        });
      }
      
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            tooltips: {
                enabled: true,
                callbacks: {
                  label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (
                      previousValue,
                      currentValue,
                      currentIndex,
                      array
                    ) {
                      return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(
                      (currentValue / total) * 100 + 0.5
                    );
                    return percentage + "%";
                  },
                  title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                  }
                }
              },
              title: {
                display: true,
                text: "Ownership Percentage of Condo Unit " + this.props.id ,
                fontSize: 28,
                fontColor: "black"
              },
            legend: {
                display: true,
                position: "bottom"
              }
          }}
        />
      </div>
    );
  }
}

export default Chart;