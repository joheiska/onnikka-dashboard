import { useEffect, useState } from 'react';
import { getUserData } from '../api/api';
import Title from '../components/Title';

function UserHistoryTable({data}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxItems, setMaxItems] = useState(3);
  const [btnText, setBtnText] = useState('More');

  useEffect(() => {
    isExpanded ? setMaxItems(12) : setMaxItems(3);
    isExpanded ? setBtnText('Less') : setBtnText('More');
  }, [isExpanded]);

  return (
    <>
      <table className="width-100">
        <thead>
          <tr>
            <th>Date</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0,maxItems).map((item, index) => {
            const date = item.date?.toISOString().split('T')[0];
            return(
              <tr key={index}>
                <td>{date}</td>
                <td>{item.users}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="history-button" onClick={() => setIsExpanded(!isExpanded)}>
        {btnText}
      </button>
    </>
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
              {usersData[0].users}
            </p>
          </div>
          <div className="card text-center">
            <h4>Monthly new users</h4>
            <div className="divider" />
            <p className="counter-text">
              {usersData[0].users - usersData[1]?.users || 0}
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
