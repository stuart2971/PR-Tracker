import React, { useState } from "react";
import MainTemplate from "../Templates/MainTemplate";
import { useAuth0 } from "@auth0/auth0-react";
import { addSet } from "../../Requests";

function Card({ exercise, selected, setSelected }) {
    const isSelected = selected === exercise;
    console.log({ isSelected });
    return (
        <div
            className={`w-1/3 text-center m-4 h-24 rounded flex justify-center items-center cursor-pointer text-xl ${
                isSelected ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelected(exercise)}
        >
            {exercise}
        </div>
    );
}

function AddSet() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [selected, setSelected] = useState("Squat");
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [error, setError] = useState("");
    const { user } = useAuth0();

    async function logSet() {
        if (!isAuthenticated) loginWithRedirect();
        let errors = "";
        if (selected === "") errors += "You must choose a lift.\n";
        if (weight === 0) errors += "You must enter a weight.\n";
        if (reps === 0) errors += "You must enter the number of reps.\n";
        if (errors) {
            setError(errors);
            return;
        }

        const res = await addSet({
            userId: user?.sub,
            lift: selected,
            weight,
            reps,
            date: new Date(),
            unit: "lb",
        });

        if (res.status === 200) {
            setReps(0);
            setWeight(0);
            setSelected("");
            setError("");
            console.log(res);
        } else setError(res.statusText);
    }
    return (
        <MainTemplate>
            <div className="flex flex-col w-full h-full justify-center align-middle">
                <div className="w-full flex">
                    <Card
                        exercise="Squat"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Card
                        exercise="Bench Press"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Card
                        exercise="Deadlift"
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <input
                        type="number"
                        placeholder="Weight"
                        value={weight || ""}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="p-2"
                        autoFocus
                    />
                    <span className="mx-4">X</span>

                    <input
                        type="number"
                        placeholder="Reps"
                        value={reps || ""}
                        onChange={(e) => setReps(Number(e.target.value))}
                        className="p-2"
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-black text-white w-24 py-2 px-2 rounded"
                        onClick={logSet}
                    >
                        Log Set
                    </button>
                </div>
                <div className="flex flex-col">
                    {error.split(".").map((err) => (
                        <p>{err}</p>
                    ))}
                </div>
            </div>
        </MainTemplate>
    );
}

export default AddSet;
