import { useEffect, useState } from 'react';
import { getUserData } from '../api/api';
import Title from '../components/Title';

function UserHistoryTable({data}) {
  return (
    <table className="width-100">
      <thead>
        <tr>
          <th>Date</th>
          <th>Users</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const date = item.date.toISOString().split('T')[0];
          return(
            <tr key={index}>
              <td>{date}</td>
              <td>{item.users}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function UsersView() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUsersData(data);
      });
  }, []);

  return (
    <>
      <Title text="Users" />
      {!usersData.length ? (
        <p className="text-center">No data</p>
      ) : (
        <div className="grid">
          <div className="card text-center">
            <h4>Current users</h4>
            <div className="divider" />
            <p className="counter-text">
              {usersData.slice(-1)[0].users}
            </p>
          </div>
          <div className="card text-center">
            <h4>Monthly new users</h4>
            <div className="divider" />
            <p className="counter-text">
              {usersData.slice(-1)[0].users - usersData.slice(-2)[0].users}
            </p>
          </div>
          <div className="card text-center">
            <h4>Users history</h4>
            <div className="divider" />
            <UserHistoryTable data={usersData} />
          </div>
        </div>
      )}
    </>
  );
}

export default UsersView;
