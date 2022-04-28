import { useEffect, useState } from 'react'
const effects = [
    {
        title: 'EFFECT 1',
        source: 'bold',
        id: 0,
        current: false
    },
    {
        title: 'EFFECT 2',
        source: 'negative',
        id: 1,
        current: false
    },
    {
        title: 'EFFECT 3',
        source: 'italics',
        id: 2,
        current: false
    },
    {
        title: 'EFFECT 4',
        source: 'neutral',
        id: 3,
        current: false
    },
    {
        title: 'EFFECT 5',
        source: 'intonation',
        id: 4,
        current: false
    },
    {
        title: 'EFFECT 6',
        source: 'positive',
        id: 5,
        current: false
    },
]
const test = [
    {
        title: 'TEST 1',
        effects: [
            {
                title: 'EFFECT 1',
                source: 'bold',
                id: 6,
                current: false
            },
            {
                title: 'EFFECT 2',
                source: 'negative',
                id: 7,
                current: false
            },
        ]
    },
    {
        title: 'TEST 2',
        effects: [
            {
                title: 'EFFECT 1',
                source: 'intonation',
                id: 8,
                current: false
            },
            {
                title: 'EFFECT 2',
                source: 'intonation',
                id: 9,
                current: false
            },
        ]
    },
]


export default function Example({ postData }) {

    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        fetch('/haptic_test').then(res => res.json()).then(data => {
            console.log("")
        });
    }, []);


    function play_sound(effect_type) {
        postData('/play', { value: (effect_type) })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    function stop_sound() {
        let data
        fetch('/stop_touching').then(res => res.json()).then(dat => {
            data = dat
        });
        return data
    }

    function handleClick(effect_type, index1, index2, level) {
        if (playing) {
            play_sound(effect_type)
        }
        else {
            stop_sound()
        }
        if (level) {
            effects[index1].current = playing
        }
        else {
            test[index1].effects[index2].current = playing
        }
        setPlaying(!playing)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 mt-48 px-48 gap-x-24 gap-y-20">
                {effects.map((file, index) => (
                    <button
                        onClick={() => handleClick(file.source, index, 10, true)}
                        key={file.title}
                        className={classNames(
                            file.current ? 'border-indigo-900 ' : 'border-gray-300',
                            'text-center relative rounded-lg border  bg-gray-50 p-12 shadow-sm  items-center  hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2'
                        )}
                    >
                        <p className=" text-3xl font-light text-gray-900">{file.title}</p>
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-24 px-48 gap-x-24 gap-y-20">
                {test.map((test, index1) => (
                    <div
                        key={test.title}
                        className="text-center  rounded-lg border border-gray-300 bg-gray-50 p-12 shadow-sm  hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2"
                    >
                        <p className=" text-3xl font-light text-gray-900">{test.title}</p>
                        <div className="grid grid-cols-2 gap-x-5 mt-10">
                            {test.effects.map((file, index2) => (
                                <button
                                    onClick={() => handleClick(file.source, index1, index2, false)}
                                    key={file.title}
                                    className={classNames(
                                        file.current ? 'border-indigo-900 ' : 'border-gray-300',
                                        'text-center relative rounded-lg border  bg-gray-100 p-12 shadow-sm  items-center  hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2'
                                    )}
                                >
                                    <p className=" text-3xl font-light text-gray-900">{file.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
