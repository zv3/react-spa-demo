/* @flow */
import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';

type Props = {
  functionalTest: Object
};

const FunctionalTestBox = ({ functionalTest } : Props) => {
  const chartData = {
      labels: [
        'Tests Passed',
        'Failed Tests'
      ],
      datasets: [{
        data            : [ functionalTest.passed, functionalTest.failed ],
        backgroundColor : [
          '#7aab4e',
          '#e43434'
        ]
      }]
    },
    chartOptions = {
      maintainAspectRatio : false,
      responsive          : true,
      legend              : {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return data.datasets[0].data[tooltipItem.index];
          }
        }
      }
    },
    passedPercent = parseInt((functionalTest.passed * 100) / (functionalTest.passed + functionalTest.failed));

  return (
    <div className="details-box__content">
      <div className="details-box__row">
        <div className="details-box__column functional-test__pie-chart">
          <PieChart data={chartData} options={chartOptions} width={80} height={80} />
        </div>

        <dl className="details-box__column functional-test__test-result">
          <dd>{passedPercent}%</dd>
          <dt>tests passed</dt>
        </dl>
      </div>

      <div className="details-box__row">
        <div className="details-box__column">
          <dl className="functional-test__coverage-result" data-progress={functionalTest.coveragePercent}>
            <dd>{functionalTest.coveragePercent}%</dd>
            <dt>tests passed</dt>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FunctionalTestBox;
