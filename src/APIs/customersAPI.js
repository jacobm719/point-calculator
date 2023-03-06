const customerTransaction = [
  { id: 1, name: "A", amount: 60, date: new Date(2023, 0, 1) },
  { id: 2, name: "B", amount: 110, date: new Date(2023, 0, 3) },
  { id: 4, name: "C", amount: 30, date: new Date(2023, 0, 10) },
  { id: 3, name: "D", amount: 90, date: new Date(2023, 1, 10) },
  { id: 2, name: "B", amount: 10, date: new Date(2023, 1, 12) },
  { id: 5, name: "F", amount: 150, date: new Date(2023, 1, 15) },
  { id: 1, name: "A", amount: 120, date: new Date(2023, 1, 20) },
  { id: 2, name: "B", amount: 200, date: new Date(2023, 1, 21) },
  { id: 3, name: "D", amount: 160, date: new Date(2023, 1, 29) },
  { id: 1, name: "A", amount: 60, date: new Date(2023, 2, 1) },
];

export const customerTransactionAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(res(customerTransaction), Math.random() * 1000);
  });
};
