import { useState, useEffect } from "react";
import { customerTransactionAPI } from "../APIs/customersAPI";

const calculateMonths = (transactions) => {
  let months = new Set();
  transactions.forEach((obj) => {
    months.add(obj.date.getMonth());
  });
  return months;
};

const calculateRewards = (transactions) => {
  let rewards = 0;
  if (transactions.amount > 100) {
    rewards += (transactions.amount - 100) * 2 + 50;
  } else if (transactions.amount > 50) {
    rewards += transactions.amount - 50;
  }
  return rewards;
};

const calculateData = (transactions) => {
  let userDB = {};
  transactions.forEach((t) => {
    let { id, name, date } = t;
    const rewards = calculateRewards(t);
    if (!(id in userDB)) {
      userDB[id] = {
        id: id,
        name: name,
        monthlyRewards: { [date.getMonth()]: rewards },
        total: rewards,
      };
    } else {
      if (date.getMonth() in userDB[id].monthlyRewards) {
        userDB[id].monthlyRewards[date.getMonth()] += rewards;
      } else {
        userDB[id].monthlyRewards[date.getMonth()] = rewards;
      }
      userDB[id].total += rewards;
    }
  });
  return userDB;
};

function PointsTable() {
  const [customerTransaction, setCustomerTransaction] = useState([]);
  const [monthData, setMonthData] = useState({});
  const [userDB, setUserDB] = useState({});
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    customerTransactionAPI().then((res) => {
      setCustomerTransaction(res);
    });
  }, []);

  useEffect(() => {
    setMonthData(calculateMonths(customerTransaction));
    setUserDB(calculateData(customerTransaction));
  }, [customerTransaction]);
  return (
    <>
      <table className="points-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {Array.from(monthData).map((month) => (
              <th key={month}>{monthNames[month]}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userDB).map((user) => {
            return (
              <tr key={user}>
                <td>{user}</td>
                <td>{userDB[user].name}</td>
                {Array.from(monthData).map((month) => (
                  <td key={`${user[0]}${month}`}>
                    {userDB[user].monthlyRewards[month] || 0}
                  </td>
                ))}
                <td>{userDB[user].total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PointsTable;
