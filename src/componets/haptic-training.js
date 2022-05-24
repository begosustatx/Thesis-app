import { useEffect, useState } from 'react'
const effects = [
    {
        title: 'EFFECT 1',
        source: 'test1',
        id: 0,
        current: false
    },
    {
        title: 'EFFECT 2',
        source: 'test2',
        id: 1,
        current: false
    },
    {
        title: 'EFFECT 3',
        source: 'test3',
        id: 2,
        current: false
    },
    {
        title: 'EFFECT 4',
        source: 'test4',
        id: 3,
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
    {
        title: 'TEST 3',
        effects: [
            {
                title: 'EFFECT 1',
                id: 10,
                current: false
            },
            {
                title: 'EFFECT 2',
                id: 11,
                current: false
            },
        ]
    },
    {
        title: 'TEST 4',
        effects: [
            {
                title: 'EFFECT 1',
                id: 12,
                current: false
            },
            {
                title: 'EFFECT 2',
                id: 13,
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


    function getRandom() {
        return Math.floor(Math.random() * 4);
    }

    function play_sound(effect_type) {
        getRandom()
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
            if (!level) {
                console.log("FOR: ", test[index1].title, test[index1].effects[index2].title, "EFFECT:", effect_type)
            }
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

    function setRandomEffect(index1, index2, level) {
        const i = getRandom();
        const effect = effects[i].source
        handleClick(effect, index1, index2, level)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-4 mt-48 px-48 gap-x-24 gap-y-20">
                {effects.map((file, index) => (
                    <button
                        onClick={() => handleClick(file.source, index, null, true)}
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
            {/*<div className="grid grid-cols-1 sm:grid-cols-2 mt-24 px-48 gap-x-24 gap-y-20">
                {test.map((test, index1) => (
                    <div
                        key={test.title}
                        className="text-center  rounded-lg border border-gray-300 bg-gray-50 p-12 shadow-sm  hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2"
                    >
                        <p className=" text-3xl font-light text-gray-900">{test.title}</p>
                        <div className="grid grid-cols-2 gap-x-5 mt-10">
                            {test.effects.map((file, index2) => (
                                <button
                                    onClick={() => setRandomEffect(index1, index2, false)}
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
                                    </div>*/}
        </div >

    )
}
