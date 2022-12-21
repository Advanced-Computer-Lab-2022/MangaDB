import NavBar from "../components/UI/NavBar/NavBar";
import InstructorWalletCard from "../components/Wallet/InstructorWalletCard";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryContainer,
} from "victory";
import { motion } from "framer-motion";
import { Fragment } from "react";

//stub for the money owed..
const receivedData = {
  moneyOwed: "9000$",
  history: [
    { month: "1", year: "2020", amount: "900$" },
    { month: "2", year: "2020", amount: "1200$" },
    { month: "3", year: "2020", amount: "1300$" },
    { month: "4", year: "2020", amount: "1400$" },
    { month: "5", year: "2020", amount: "1500$" },
    { month: "6", year: "2020", amount: "1600$" },
    { month: "1", year: "2020", amount: "900$" },
    { month: "2", year: "2020", amount: "1200$" },
    { month: "3", year: "2020", amount: "1300$" },
    { month: "4", year: "2020", amount: "1400$" },
    { month: "5", year: "2020", amount: "1500$" },
    { month: "6", year: "2020", amount: "1600$" },
    { month: "1", year: "2020", amount: "900$" },
    { month: "2", year: "2020", amount: "1200$" },
    { month: "3", year: "2020", amount: "1300$" },
    { month: "4", year: "2020", amount: "1400$" },
    { month: "5", year: "2020", amount: "1500$" },
    { month: "6", year: "2020", amount: "1600$" },
  ],
};

const InstructorWallet = () => {
  const appear = {
    opacity: 0,
    transition: {
      duration: 1,
      yoyo: Infinity,
    },
  };
  const data = [
    { quarter: 1, earnings: 13000, label: "right-side-up" },
    { quarter: 2, earnings: 16500, label: "right-side-up" },
    { quarter: 3, earnings: 14250, label: "right-side-up" },
    { quarter: 4, earnings: 19000, label: "right-side-up" },
  ];

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
            theme={VictoryTheme.material}
            domainPadding={20}
            containerComponent={
              <VictoryContainer
                className="-ml-4"
                style={{ height: "50%", width: "50%" }}
              ></VictoryContainer>
            }
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["2019", "2020", "2021", "2022"]}
            />
            <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
            <VictoryBar
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
        </div>
      </div>
      <div> 2 cards </div>
      <div>
        <InstructorWalletCard
          data={receivedData.history}
        ></InstructorWalletCard>
      </div>
    </Fragment>
  );
};
export default InstructorWallet;
