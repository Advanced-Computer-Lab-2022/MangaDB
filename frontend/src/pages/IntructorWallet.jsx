import InstructorWalletCard from "../components/Wallet/InstructorWalletCard";
import Stats from "../components/Wallet/Statistics/Stats";
import axios from "axios";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryPie,
  VictoryContainer,
} from "victory";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
import { useNavigate } from "react-router-dom";
//the dots animation
const appear = {
  opacity: 0,
  transition: {
    duration: 1,
    yoyo: Infinity,
  },
};

const InstructorWallet = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([{ x: 1, y: 2, label: "Jan" }]);
  const [receivedData, setReceivedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode") === null
      ? "US"
      : localStorage.getItem("countryCode")
  );

  const navigate = useNavigate();
  
  // for the bottom stats
  var monthRevenue = 0;
  var prevMonthRevenue = 0;
  var yearRevenue = 0;
  var prevYearRevenue = 0;

  //get the current date
  const now = new Date();
  var month = now.getMonth();
  var year = now.getFullYear();

  //calculate some stats
  if (!loading) {
    for (var i = 0; i < receivedData.history.length; i++) {
      if (
        month + 1 === +receivedData.history[i].month &&
        year === +receivedData.history[i].year
      ) {
        monthRevenue = monthRevenue + +receivedData.history[i].amount;
      }
      if (month === +receivedData.history[i].month) {
        prevMonthRevenue = prevMonthRevenue + +receivedData.history[i].amount;
      }
      if (year === +receivedData.history[i].year) {
        yearRevenue = yearRevenue + +receivedData.history[i].amount;
      }
      if (year - 1 === +receivedData.history[i].year) {
        prevYearRevenue = prevYearRevenue + +receivedData.history[i].amount;
      }
    }
  }
  //data for the barchart ..

  // stats for the boxes
  if (prevMonthRevenue === 0) {
    prevMonthRevenue = 1;
  }
  if (prevYearRevenue === 0) {
    prevYearRevenue = 1;
  }
  const monthChange = (monthRevenue / prevMonthRevenue).toFixed(1);
  const monthDirection =
    monthRevenue >= prevMonthRevenue ? "increase" : "decrease";

  const yearChange = (yearRevenue / prevYearRevenue).toFixed(1);
  const yearDirection =
    yearRevenue >= prevYearRevenue ? "increase" : "decrease";

  var prevYearPurchases = receivedData.lastYearPurchases;
  if (prevYearPurchases === 0) {
    prevYearPurchases = 1;
  }
  const purchasesChange = (
    receivedData.currentYearPurchases / prevYearPurchases
  ).toFixed(1);
  const purchaseDirection =
    receivedData.currentYearPurchases >= prevYearPurchases
      ? "increase"
      : "decrease";

  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    const role = localStorage.getItem("role");
  if (role !== "INSTRUCTOR") {
    navigate("/403");
  }
    //axios to get the data..
    axios
      .get("http://localhost:3000/instructor/amountOwed", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setReceivedData(res.data);
        setLoading(false);
        var year = now.getFullYear();
        //for the piechart
        var jan = 0;
        var feb = 0;
        var mar = 0;
        var apr = 0;
        var may = 0;
        var jun = 0;
        var jul = 0;
        var aug = 0;
        var sep = 0;
        var oct = 0;
        var nov = 0;
        var dec = 0;
        //for the barchart
        var year1 = 0;
        var year2 = 0;
        var year3 = 0;
        var year4 = 0;
        var yearRevenue = 0;
        for (var i = 0; i < res.data.history.length; i++) {
          //handle the first barchart
          if (year - 4 === +res.data.history[i].year) {
            year1 = year1 + +res.data.history[i].amount;
          }
          if (year - 3 === +res.data.history[i].year) {
            year2 = year2 + +res.data.history[i].amount;
          }
          if (year - 2 === +res.data.history[i].year) {
            year3 = year3 + +res.data.history[i].amount;
          }
          if (year === +res.data.history[i].year) {
            yearRevenue = yearRevenue + +res.data.history[i].amount;
          }
          if (year - 1 === +res.data.history[i].year) {
            year4 = year4 + +res.data.history[i].amount;

            switch (+res.data.history[i].month) {
              case 1:
                jan += +res.data.history[i].amount;
                break;
              case 2:
                feb += +res.data.history[i].amount;
                break;
              case 3:
                mar += +res.data.history[i].amount;
                break;
              case 4:
                apr += +res.data.history[i].amount;
                break;
              case 5:
                may += +res.data.history[i].amount;
                break;
              case 6:
                jun += +res.data.history[i].amount;
                break;
              case 7:
                jul += +res.data.history[i].amount;
                break;
              case 8:
                aug += +res.data.history[i].amount;
                break;
              case 9:
                sep += +res.data.history[i].amount;
                break;
              case 10:
                oct += +res.data.history[i].amount;
                break;
              case 11:
                nov += +res.data.history[i].amount;
                break;
              default:
                dec += +res.data.history[i].amount;
                break;
            }
          }
        }
        setData([
          { quarter: 1, earnings: year1, label: "Years Revenue" },
          { quarter: 2, earnings: year2, label: "Years Revenue" },
          { quarter: 3, earnings: year3, label: "Years Revenue" },
          { quarter: 4, earnings: year4, label: "Years Revenue" },
          { quarter: 5, earnings: yearRevenue, label: "Years Revenue" },
        ]);
        setData2([
          { x: 1, y: jan, label: "Jan" },
          { x: 2, y: feb, label: "Feb" },
          { x: 3, y: mar, label: "Mar" },
          { x: 4, y: apr, label: "Apr" },
          { x: 4, y: may, label: "May" },
          { x: 5, y: jun, label: "Jun" },
          { x: 6, y: jul, label: "Jul" },
          { x: 7, y: aug, label: "Aug" },
          { x: 8, y: sep, label: "Sep" },
          { x: 9, y: oct, label: "Oct" },
          { x: 10, y: nov, label: "Nov" },
          { x: 11, y: dec, label: "Dec" },
        ]);
      });
  }, []);

  const onChangeHandler = (e) => {
    setCountryCode(e);
    localStorage.setItem("countryCode", e);
  };

  return (
    <Fragment>
      <NavBarSearch onChange={onChangeHandler} currentTab="Wallet" />
      <div className="mt-24">
        <div className="flex-col items-center justify-center mt-8">
          <div className="w-[100%] flex items-center justify-center ">
            <p className="md:text-5xl text-4xl uppercase tracking-widest font-semibold max-w-2xl">
              Your Total Earnings So Far
              <motion.span initial={{ opacity: 1 }} animate={appear}>
                ...
              </motion.span>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <VictoryChart
              colorScale={"blue"}
              theme={VictoryTheme.material}
              domainPadding={20}
              containerComponent={
                <VictoryContainer
                  className="-ml-4"
                  style={{ height: "20%", width: "50%" }}
                ></VictoryContainer>
              }
            >
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={["2019", "2020", "2021", "2022", "2023"]}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `$${x / 1000}k`}
                animate={{
                  duration: 1000,
                  easing: "bounce",
                }}
              />
              <VictoryBar
                style={{
                  data: {
                    fill: "#74a0d1",
                  },
                }}
                animate={{
                  onExit: {
                    duration: 500,
                  },
                }}
                labelComponent={<VictoryTooltip />}
                data={data}
                x="quarter"
                y="earnings"
              />
            </VictoryChart>
            <VictoryPie
              animate={{
                duration: 500,
                easing: "circleInOut",
              }}
              containerComponent={
                <VictoryContainer
                  className="-ml-4"
                  style={{ height: "20%", width: "40%" }}
                ></VictoryContainer>
              }
              colorScale={"blue"}
              data={data2}
            ></VictoryPie>
          </div>
        </div>
        {!loading && (
          <Fragment>
            <Stats
              purchasesChange={purchasesChange}
              purchasesDirection={purchaseDirection}
              yearPurchases={receivedData.currentYearPurchases}
              monthChange={monthChange}
              monthDirection={monthDirection}
              yearChange={yearChange}
              yearDirection={yearDirection}
              yearRevenue={yearRevenue}
              monthRevenue={monthRevenue}
            ></Stats>
            <div>
              <InstructorWalletCard
                data={receivedData.history}
              ></InstructorWalletCard>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
export default InstructorWallet;
