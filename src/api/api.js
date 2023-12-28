import usersData from './data/usersData.json';

export function getUserData() {
  return new Promise((resolve) => {
    const data = usersData
      .map((item) => ({
        users: parseInt(item.users),
        date: new Date(item.date),
      }))
      .sort((a, b) => a.date - b.date);
    resolve(data);
  });
}
