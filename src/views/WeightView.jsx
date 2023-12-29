import { useEffect, useState } from 'react';
import { getWeightData } from '../api/api';
import Title from '../components/Title';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './WeightView.css';

function WeightTable({ data }) {
  const headings = ['Month', 'Count', 'Avg. Change', 'Mdn. Change', 'SD'];
  return (
    <table className="width-100 text-center">
      <thead>
        <tr>
          {headings.map((item, index) => {
            return <th key={index}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.monthName}</td>
              <td>{item.count}</td>
              <td>{item.averageChange?.toFixed(1)}</td>
              <td>{item.medianChange?.toFixed(1)}</td>
              <td>{item.standardDeviation?.toFixed(1)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function WeightChart({ data }) {
  const avg = data.map((i) => i.averageChange);
  const mdn = data.map((i) => i.medianChange);
  return (
    <Line
      datasetIdKey="wchart"
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
              font: { size: 14 },
            }
          },
          y: {
            title: {
              display: true,
              text: 'Kg',
              font: { size: 14 },
            }
          },
        }
      }}
      data = {{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            id: 1,
            label: 'Average Change',
            data: avg,
            backgroundColor: 'rgba(211, 141, 19, 0.5)',
            borderColor: 'rgba(211, 141, 19, 0.8)',
            borderWidth: 2
          },
          {
            id: 2,
            label: 'Median Change',
            data: mdn,
            backgroundColor: 'rgba(33, 207, 166, 0.5)',
            borderColor: 'rgba(33, 207, 166, 0.8)',
            borderWidth: 2
          },
        ],
      }}
    />
  );
}

function WeightView() {
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    getWeightData()
      .then((data) => {
        setWeightData(data);
      });
  }, []);

  return (
    <>
      <Title text="Weight Data" />
      {!weightData.length ? (
        <p className="text-center">No data</p>
      ) : (
        <div className="card weight-card">
          <WeightTable data={weightData} />
          <div className="divider margin-y" />
          <WeightChart data={weightData} />
        </div>
      )}
    </>
  );
}

export default WeightView;
