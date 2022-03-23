import { useEffect, useState } from 'react'

/* This example requires Tailwind CSS v2.0+ */
const stats = [
    { name: 'Position:', stat1: 'x position:', stat2: 'y position:' },
    { name: 'Speed:', stat1: 'per sec:', stat2: 'per 0,05:' },
    { name: 'Effects:', stat1: 'effect num:', stat2: 'playing:' },
]

export default function Example() {

    const [x_pos, setX] = useState(0)
    const [y_pos, setY] = useState(0)
    const [coord_5ms, set5MS] = useState()
    const [stop, setStop] = useState()
    const [effect, setEffect] = useState();
    const [playing, setPlaying] = useState();
    useEffect(() => {
        let temp_data = 0
        const interval = setInterval(() => {
            fetch('/get_stats').then(res => res.json()).then(data => {
                temp_data = data
                //                console.log(data)
            }
            );
            //console.log('This will run every second!');
            setX(temp_data.x_pos)
            setY(temp_data.y_pos)
            set5MS(temp_data.coord_5ms)
            setEffect(temp_data.effect)
            if (temp_data.playing) setPlaying("TRUE")
            else setPlaying("FALSE")
            if (temp_data.stop) setStop("TRUE")
            else setStop("FALSE")
        }, 100);
        return () => clearInterval(interval);
    },
        []);
    return (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-6 py-3 bg-gray-50 shadow rounded-lg overflow-hidden font-light">
                <p className="text-3xl font-light text-gray-500 truncate">Position</p>
                <p className="mt-1 text-xl  text-gray-900">x position: {x_pos}</p>
                <p className="mt-1 text-xl  text-gray-900">y position: {y_pos}</p>
            </div>
            <div className="px-6 py-3 bg-gray-50 shadow rounded-lg overflow-hidden font-light">
                <p className="text-3xl font-light text-gray-500 truncate">Speed</p>
                <p className="mt-1 text-xl  text-gray-900">coord per 5 ms: {coord_5ms}</p>
                <p className="mt-1 text-xl  text-gray-900">Stop: {stop}</p>
            </div>
            <div className="px-6 py-3 bg-gray-50 shadow rounded-lg overflow-hidden font-light">
                <p className="text-3xl font-light text-gray-500 truncate">Position</p>
                <p className="mt-1 text-xl  text-gray-900">Effects: {effect}</p>
                <p className="mt-1 text-xl  text-gray-900">Playing: {playing}</p>
            </div>
        </div>
    )
}
