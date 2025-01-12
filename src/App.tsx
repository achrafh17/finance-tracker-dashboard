import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import coffeimage from "./local_cafe_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.png";
import shoppingimage from "./shopping_bag_24dp_EA33F7_FILL0_wght400_GRAD0_opsz24.png";
import foodimage from "./restaurant_24dp_F19E39_FILL0_wght400_GRAD0_opsz24.png";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

function App() {
  const [shopping, setShopping] = useState(() => {
    const saved = localStorage.getItem("shopping");
    return saved ? JSON.parse(saved) : [];
  });
  const [activity, setActivity] = useState("");
  const dateref = useRef();
  const amountref = useRef();
  const noteref = useRef();

  useEffect(() => {
    localStorage.setItem("shopping", JSON.stringify(shopping));
  }, [shopping]);

  const addEntry = () => {
    const item = {
      Date: dateref.current.value,
      Amount: amountref.current.value,
      Note: noteref.current.value,
      Activity: activity,
    };
    if (
      dateref.current.value &&
      amountref.current.value &&
      noteref.current.value
    ) {
      setShopping([...shopping, item]);
    }
    dateref.current.value = "";
    amountref.current.value = "";
    noteref.current.value = "";
    setActivity("");
  };

  const handleActivity = (selectedActivity) => {
    setActivity(selectedActivity);
  };
  const handledelete = (index) => {   
    const newshopping = shopping.filter((_, i) => i !== index);
    setShopping(newshopping);
  }
  const handleClear = () => {
    setShopping([]);
  };

  //-----------------------------------------------------------------
  const data = {
    labels: shopping.map((item) => item.Date),
    datasets: [
      {
        label: "spending",
        data: shopping.map((item) => item.Amount),
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Finance Tracker",
      },
      scales: {
        X: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount",
          },
          beginAtzero: true,
        },
      },
    },
  };

  return (
    <div className="body">
      <h1>Finance Tracker</h1>
      <div className="main">
        <div className="card">
          <div className="form">
            <div className="titles">
              <h4>Add new entry</h4>
              <p>Track your daily spending and mood</p>
            </div>

            <label htmlFor="date">Date</label>
            <input id="date" type="date" ref={dateref} />
            <label htmlFor="spending">Spending ($)</label>
            <input id="spending" type="number" ref={amountref} />
            <label htmlFor="activity">Activity</label>
            <div className="activity">
              <div className="coffe" onClick={() => handleActivity("Coffe")}>
                <img id="emoji" src={coffeimage} alt="Coffe" />
                &nbsp; Coffe
              </div>
              <div
                className="shopping"
                onClick={() => handleActivity("Shopping")}
              >
                <img id="emoji" src={shoppingimage} alt="Shopping" />
                &nbsp; Shopping
              </div>
              <div className="food" onClick={() => handleActivity("Food")}>
                <img id="emoji" src={foodimage} alt="Food" />
                &nbsp; Food
              </div>
            </div>
            <label htmlFor="">Note</label>
            <input type="text" ref={noteref} />
            <button onClick={addEntry}>+ Add Entry</button>
          </div>
        </div>
        <div className="output">
          <div className="titles">
            <h4>Add new entry</h4>
            <p>Track your daily spending and mood</p>
            <button onClick={handleClear}>clear</button>
          </div>
          <div className="entries">
            {shopping.map((item, index) => (
              <div className="entry" key={index}>
                <div className="date-emojis-note">
                  <img
                    id="emoji"
                    src={
                      item.Activity === "Coffe"
                        ? coffeimage
                        : item.Activity === "Shopping"
                        ? shoppingimage
                        : foodimage
                    }
                    alt={item.Activity}
                  />
                  <div className="date-note">
                    <p className="date">{item.Date}</p>
                    <p className="note">{item.Note}</p>
                  </div>
                </div>
                <div className="amount-delete">
                  <p className="amount">${item.Amount}</p>
                  <svg onClick={() => handledelete(index)}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#EA3323"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="Chart">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default App;
