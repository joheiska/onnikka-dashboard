import { useEffect, useState } from 'react';
import { getWeightData } from '../api/api';
import Title from '../components/Title';
import './WeightView.css';

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
        <div className="card weight-table-card">
          <table className="width-100 text-center weight-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Count</th>
                <th>Avg. Change</th>
                <th>Mdn. Change</th>
                <th>SD</th>
              </tr>
            </thead>
            <tbody>
              {weightData.map((item, index) => {
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
        </div>
      )}
    </>
  );
}

export default WeightView;
