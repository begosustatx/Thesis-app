import { useEffect, useState } from 'react'

export default function Example() {

    const [x_pos, setX] = useState(0)
    const [y_pos, setY] = useState(0)
    const [coord_5ms, set5MS] = useState()
    const [stop, setStop] = useState()
    const [playing, setPlaying] = useState();
    useEffect(() => {
        let temp_data = 0
        const interval = setInterval(() => {
            fetch('/get_stats').then(res => res.json()).then(data => {
                temp_data = data
            }
            );
            setX(temp_data.x_pos)
            setY(temp_data.y_pos)
            set5MS(temp_data.coord_5ms)
            if (temp_data.playing) setPlaying("TRUE")
            else setPlaying("FALSE")
            if (temp_data.stop) setStop("TRUE")
            else setStop("FALSE")
        }, 100);
        return () => clearInterval(interval);
    },
        []);
    return (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-6">
            <div className=" col-span-2 px-6 py-3 bg-gray-50 border border-gray-200  rounded-lg overflow-hidden font-light">
                <p className="text-3xl font-light text-gray-500 truncate">Position</p>
                <p className="mt-1 text-xl  text-gray-900">x position: {x_pos}</p>
                <p className="mt-1 text-xl  text-gray-900">y position: {y_pos}</p>
            </div>
            <div className="col-span-2  px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden font-light">
                <p className="text-3xl font-light text-gray-500 truncate">Speed</p>
                <p className="mt-1 text-xl  text-gray-900">coord per 5 ms: {coord_5ms}</p>
                <p className="mt-1 text-xl  text-gray-900">Stop: {stop}</p>
            </div>
            <div className="col-span-2  px-6 py-3 bg-gray-50 border border-gray-200  rounded-lg overflow-hidden font-light">
                <p className="text-3xl font-light text-gray-500 truncate">Sounds</p>
                <p className="mt-1 text-xl  text-gray-900">Playing: {playing}</p>
            </div>
        </div>
    )
}
