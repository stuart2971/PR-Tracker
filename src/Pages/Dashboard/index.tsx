import React, { useEffect, useState } from "react";
import MainTemplate from "../Templates/MainTemplate";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getDashboardData } from "../../Requests";
import ReactApexChart from "react-apexcharts";

const chartOptions = {
    options: {
        chart: {
            height: 350,
            type: "scatter",
            zoom: {
                type: "xy",
            },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                formatter: function (val) {
                    const d = new Date(val);
                    return (
                        d.toLocaleString("default", {
                            month: "long",
                        }) +
                        " " +
                        d.getDate()
                    );
                },
            },
            tickAmount: 5,
        },
        yaxis: {
            tickAmount: 7,
        },
    },
};

function logsTo2DArray(logs) {
    let arr = [];
    for (let i = 0; i < logs.length; i++) {
        arr.push([logs[i].date, Math.floor(logs[i].estimatedMax)]);
    }
    return arr;
}
function Card({ title, date, weight, reps, estimatedMax }) {
    const dateObj = new Date(date);

    return (
        <div className="w-full md:w-1/3 m-4 h-24 rounded flex justify-center items-center flex-col border-2 border-purple">
            <h2 className="font-bold">{title}</h2>
            {date && weight && reps && estimatedMax ? (
                <>
                    <h4>{Math.round(estimatedMax)} lbs</h4>
                    <h5>
                        {weight} lbs x {reps}
                    </h5>
                    <h5>
                        {dateObj.toLocaleString("default", { month: "long" })}{" "}
                        {dateObj.getDate()}, {dateObj.getFullYear()}
                    </h5>
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    );
}

function Dashboard() {
    const { userId } = useParams();
    const { user, isAuthenticated } = useAuth0();
    const [data, setData] = useState();
    const [selected, setSelected] = useState("Squat");
    const [chartData, setChartData] = useState([]);
    function convertToGraphData(data) {
        try {
            setChartData([
                {
                    name: "Squat",
                    data: logsTo2DArray(data.squatLogs),
                },
                {
                    name: "Bench Press",
                    data: logsTo2DArray(data.benchLogs),
                },
                { name: "Deadlift", data: logsTo2DArray(data.deadliftLogs) },
            ]);
        } catch (err) {}
    }
    async function fetchData() {
        let d = await getDashboardData(userId);
        convertToGraphData(d);
        setData(d);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const logs = {
        Squat: data?.squatLogs,
        "Bench Press": data?.benchLogs,
        Deadlift: data?.deadliftLogs,
    };

    console.log({
        message: "This is from home",
        data,
        userId,
        userSub: user?.sub,
        isAuthenticated,
        chartData,
    });

    return (
        <MainTemplate>
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full justify-center mb-4">
                    <div className="w-full flex flex-col md:flex-row">
                        <Card
                            title="Squat"
                            weight={data?.squatMax?.weight}
                            reps={data?.squatMax?.reps}
                            estimatedMax={data?.squatMax?.estimatedMax}
                            date={data?.squatMax?.date}
                        />
                        <Card
                            title="Bench Press"
                            weight={data?.benchMax?.weight}
                            reps={data?.benchMax?.reps}
                            estimatedMax={data?.benchMax?.estimatedMax}
                            date={data?.benchMax?.date}
                        />
                        <Card
                            title="Deadlift"
                            weight={data?.deadliftMax?.weight}
                            reps={data?.deadliftMax?.reps}
                            estimatedMax={data?.deadliftMax?.estimatedMax}
                            date={data?.deadliftMax?.date}
                        />
                    </div>
                </div>
                <ReactApexChart
                    options={chartOptions.options}
                    series={chartData}
                    type="scatter"
                    height={350}
                />
                <div className="flex justify-center flex-col md:flex-row text-center mt-4">
                    <div className="flex flex-col justify-center my-2">
                        {Object.keys(logs).map((lift) => (
                            <button
                                className={`mx-4 my-2 px-2 py-1 border border-1 border-purple-600 rounded ${
                                    selected === lift
                                        ? "bg-purple-600 text-white"
                                        : ""
                                }`}
                                onClick={() => setSelected(lift)}
                            >
                                {lift}
                            </button>
                        ))}
                    </div>
                    <table className="w-full md:w-4/5">
                        <tr>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Estimated Max</th>
                        </tr>
                        {logs[selected]?.length > 0 &&
                            logs[selected].map((log) => {
                                const d = new Date(log.date);
                                return (
                                    <tr>
                                        <td>
                                            {d.toLocaleString("default", {
                                                month: "long",
                                            })}{" "}
                                            {d.getDate()}, {d.getFullYear()}
                                        </td>
                                        <td>{log.weight}</td>
                                        <td>{log.reps}</td>
                                        <td>{Math.floor(log.estimatedMax)}</td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            </div>
        </MainTemplate>
    );
}

export default Dashboard;
