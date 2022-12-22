import NavBar from "../components/UI/NavBar/NavBar";
import InstructorWalletCard from "../components/Wallet/InstructorWalletCard";
import Stats from "../components/Wallet/Statistics/Stats";
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
//stub for the money owed..
const receivedData = {
  history: [
    { month: "1", year: "2021", amount: "900" },
    { month: "2", year: "2021", amount: "1200" },
    { month: "3", year: "2021", amount: "1300" },
    { month: "4", year: "2021", amount: "1400" },
    { month: "5", year: "2021", amount: "1500" },
    { month: "6", year: "2021", amount: "1600" },
    { month: "1", year: "2021", amount: "900" },
    { month: "12", year: "2022", amount: "1200" },
    { month: "12", year: "2022", amount: "1300" },
    { month: "12", year: "2022", amount: "1400" },
    { month: "12", year: "2022", amount: "1500" },
    { month: "12", year: "2022", amount: "1600" },
    { month: "12", year: "2022", amount: "900" },
    { month: "11", year: "2022", amount: "1200" },
    { month: "11", year: "2022", amount: "1300" },
    { month: "11", year: "2022", amount: "1400" },
    { month: "11", year: "2022", amount: "1500" },
    { month: "11", year: "2022", amount: "1600" },
  ],
};

//the dots animation
const appear = {
  opacity: 0,
  transition: {
    duration: 1,
    yoyo: Infinity,
  },
};

const InstructorWallet = () => {
  const [data1, setData1] = useState({
    quarter: 1,
    earnings: 0,
    label: "Years Revenue",
  });
  const [data2, setData2] = useState([{ x: 1, y: 2, label: "Jan" }]);
  const received = useState([]);
  
  const data = [
    { quarter: 1, earnings: 13000, label: "Years Revenue" },
    { quarter: 2, earnings: 16500, label: "Years Revenue" },
    { quarter: 3, earnings: 14250, label: "Years Revenue" },
    { quarter: 4, earnings: 19000, label: "Years Revenue" },
  ];

  // for the bottom stats
  var monthRevenue = 0;
  var prevMonthRevenue = 0;
  var yearRevenue = 0;
  var prevYearRevenue = 0;

  const now = new Date();
  var month = now.getMonth();
  var year = now.getFullYear();

  //for the 2 graphs
  var year1 = 0;
  var year2 = 0;
  var year3 = 0;
  var year4 = 0;

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

  //flag to handle the first year display
  var flag = false;

  //calculate some stats
  for (var i = 0; i < receivedData.history.length; i++) {
    if (month + 1 === +receivedData.history[i].month) {
      monthRevenue = monthRevenue + +receivedData.history[i].amount;
    }
    if (month === +receivedData.history[i].month) {
      prevMonthRevenue = prevMonthRevenue + +receivedData.history[i].amount;
    }
    if (year === +receivedData.history[i].year) {
      yearRevenue = yearRevenue + +receivedData.history[i].amount;
    }
    if (year - 1 === +receivedData.history[i].year) {
      flag = true;
      prevYearRevenue = prevYearRevenue + +receivedData.history[i].amount;
    }
    //handle the first barchart
    if (year - 4 === +receivedData.history.year) {
      year1 = year1 + +receivedData.history[i].amount;
    }
    if (year - 3 === +receivedData.history.year) {
      year2 = year2 + +receivedData.history[i].amount;
    }
    if (year - 2 === +receivedData.history.year) {
      year3 = year3 + +receivedData.history[i].amount;
    }
    if (year - 1 === +receivedData.history.year) {
      year4 = year4 + +receivedData.history[i].amount;
      switch (+receivedData.history[i].month) {
        case 1:
          jan += +receivedData.history[i].amount;
          break;
        case 2:
          feb += +receivedData.history[i].amount;
          break;
        case 3:
          mar += +receivedData.history[i].amount;
          break;
        case 4:
          apr += +receivedData.history[i].amount;
          break;
        case 5:
          may += +receivedData.history[i].amount;
          break;
        case 6:
          jun += +receivedData.history[i].amount;
          break;
        case 7:
          jul += +receivedData.history[i].amount;
          break;
        case 8:
          aug += +receivedData.history[i].amount;
          break;
        case 9:
          sep += +receivedData.history[i].amount;
          break;
        case 10:
          oct += +receivedData.history[i].amount;
          break;
        case 11:
          nov += +receivedData.history[i].amount;
          break;
        default:
          dec += +receivedData.history[i].amount;
          break;
      }
    }
  }

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

  useEffect(() => {
    //axios to get the data..

    
    setTimeout(() => {
      setData2([
        { x: 1, y: 2, label: "Jan" },
        { x: 2, y: 3, label: "Feb" },
        { x: 3, y: 5, label: "Mar" },
        { x: 4, y: 7, label: "Apr" },
        { x: 4, y: 7, label: "May" },
        { x: 5, y: 8, label: "Jun" },
        { x: 6, y: 6, label: "Jul" },
        { x: 7, y: 2, label: "Aug" },
        { x: 8, y: 9, label: "Sep" },
        { x: 9, y: 6, label: "Oct" },
        { x: 10, y: 2, label: "Nov" },
        { x: 11, y: 2, label: "Dec" },
      ]);
    }, 50);
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>
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
                duration: 2000,
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
      <Stats
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
  );
};
export default InstructorWallet;
