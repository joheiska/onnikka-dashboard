import usersData from './data/usersData.json';
import weightData from './data/weightData.json';

export function getUserData() {
  return new Promise((resolve) => {
    const data = usersData
      .map((item) => ({
        users: parseInt(item.users),
        date: new Date(item.date),
      }))
      .sort((a, b) => b.date - a.date);
    resolve(data);
  });
}

export function getWeightData() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return new Promise((resolve) => {
    const data = weightData.map((item) => ({
      ...item,
      monthName: months[item.month - 1]
    }));
    resolve(data);
  });
}
