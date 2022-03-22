import { useEffect, useState } from 'react'

/* This example requires Tailwind CSS v2.0+ */
const stats = [
    { name: 'Position:', stat1: 'x position:', stat2: 'y position:' },
    { name: 'Speed:', stat1: 'per sec:', stat2: 'per 0,05:' },
    { name: 'Effects:', stat1: 'effect num:', stat2: 'duration:' },
]

export default function Example() {
    const [data, setData] = useState();
    const [x, setI] = useState(0)
    useEffect(() => {
        let temp_data = 0
        const interval = setInterval(() => {
            fetch('/get_stats').then(res => res.json()).then(data => {
                temp_data = data
            });
            //console.log('This will run every second!');
            setData(temp_data.x_pos)
        }, 50);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="px-6 py-3 bg-gray-50 shadow rounded-lg overflow-hidden font-light">
                        <dt className="text-3xl font-light text-gray-500 truncate">{item.name}</dt>
                        <dd className="mt-1 text-xl  text-gray-900">{item.stat1}:{data}</dd>
                        <dd className="mt-1 text-xl  text-gray-900">{item.stat2}:{data}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
