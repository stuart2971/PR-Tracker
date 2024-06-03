import React, { useEffect, useRef, useState } from "react";
import MainTemplate from "../Templates/MainTemplate";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getLogs } from "../../Requests";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const graphData = {
    labels,
    datasets: [
        {
            label: "Squat",
            data: [1, 2, 3, 4],
            borderColor: "rgb(255, 255, 255)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};

function Card({
    title,
    selected,
    setSelected,
    date,
    weight,
    reps,
    estimatedMax,
}) {
    const dateObj = new Date(date);

    return (
        <div
            className={`w-1/3 m-4 h-24 rounded flex justify-center items-center flex-col border-4 border-${
                selected === title ? "purple-700" : "gray-300"
            }`}
            onClick={() => setSelected(title)}
        >
            <h3>{title}</h3>
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

function Dashboard({ logs }) {
    const { userId } = useParams();
    const { user } = useAuth0();
    const [data, setData] = useState(logs);
    const [selected, setSelected] = useState("Squat");

    const isMyData = userId === user?.sub;

    async function fetchData() {
        // If the user is looking at someone elses logs page
        if (!isMyData && user?.sub !== undefined) {
            let d = await getLogs(userId);
            console.log(
                `This is not my data. Fetched someone else's data. userId: ${userId} userSub: ${user?.sub}`
            );
            console.log(d);
            setData(d);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    console.log({
        message: "This is from home",
        data,
        isMyData,
        userId,
        userSub: user?.sub,
    });

    return (
        <MainTemplate>
            This is Home
            <div className="flex flex-col w-full justify-center">
                <div className="w-full flex">
                    <Card
                        title="Squat"
                        selected={selected}
                        setSelected={setSelected}
                        weight={data?.squatMax?.weight}
                        reps={data?.squatMax?.reps}
                        estimatedMax={data?.squatMax?.estimatedMax}
                        date={data?.squatMax?.date}
                    />
                    <Card
                        title="Bench Press"
                        selected={selected}
                        setSelected={setSelected}
                        weight={data?.benchMax?.weight}
                        reps={data?.benchMax?.reps}
                        estimatedMax={data?.benchMax?.estimatedMax}
                        date={data?.benchMax?.date}
                    />
                    <Card
                        title="Deadlift"
                        selected={selected}
                        setSelected={setSelected}
                        weight={data?.deadliftMax?.weight}
                        reps={data?.deadliftMax?.reps}
                        estimatedMax={data?.deadliftMax?.estimatedMax}
                        date={data?.deadliftMax?.date}
                    />
                </div>
            </div>
            <Line data={graphData} />
            {}
        </MainTemplate>
    );
}

export default Dashboard;
