/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react";





export default function Example({ sethtml, setIntonation_dict, postData, setStyle }) {

    const [levels, setLevels] = useState([
        { id: 'sentence', title: 'Sentence', selected: false },
        { id: 'word', title: 'Word', selected: true },
    ])

    const [info, setInfo] = useState([
        { id: 'intonation', title: 'Intonation', selected: false, active: true },
        { id: 'style', title: 'Style', selected: false, active: true },
        { id: 'part_speech', title: 'Part of the speech', selected: false, active: true },
        { id: 'semmantics', title: 'Semmantics', selected: false, active: true },
    ])

    const [numSelected, setNumSelected] = useState(0)

    function handleSelectChange(index) {
        let new_levels = [...levels]
        let old_index = levels.indexOf(levels.filter(elem => elem.selected === true)[0])
        if (old_index != -1)
            new_levels[old_index].selected = false
        new_levels[index].selected = true;
        setLevels(new_levels)

        let i = info.indexOf(info.filter(elem => elem.id === 'intonation')[0])
        let bool = true
        if (levels[index].id === 'sentence')
            bool = false
        info[i].active = bool
    }

    function handleCheckBoxChange(index) {
        let bool = !info[index].selected
        if (info[index].selected) {
            setNumSelected(numSelected - 1)
        }
        else if (!info[index].selected && numSelected < 2) {
            setNumSelected(numSelected + 1)
        }
        else {
            bool = false
        }
        info[index].selected = bool
    }

    function handleStart() {
        let lev = levels.filter(elem => elem.selected === true)
        let sub = info.filter(elem => elem.selected === true)
        if (lev.length === 0 || sub.length === 0) {
            alert("Please select you options")
        }

        else {
            setStyle(false)
            //TODO: FIX IF WE ALLOW MORE THAN 1 
            if (sub[0].id === 'style') {
                setStyle(true)
            }
            postData('/process_text', { type: lev[0].id, option: sub[0].id })
                .then(data => {
                    sethtml(data.object)
                    if (sub[0].id === 'intonation') {
                        console.log(data)
                        setIntonation_dict(data.intonation_info)
                    }
                });
        }

    }

    return (
        <div className="flex-1 flex flex-col min-h-0 px-16 mt-5 font-light">
            <div className=" flex flex-col p-10 rounded-xl bg-gray-50 border border-gray-200 ">
                <label className="text-4xl  text-gray-900">Haptics level</label>
                <p className="text-xl leading-5 text-gray-500 mt-5">How do you prefer the haptics effect to be applied? </p>
                <fieldset className="mt-10">
                    <div className="space-y-10">
                        {levels.map((level, index) => (
                            <div key={level.id} className="flex items-center">
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="radio"
                                    selected={level.id === 'word'}
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer "
                                    onChange={() => handleSelectChange(index)}
                                />
                                <label htmlFor={level.id} className="ml-3 block text-4xl text-gray-700 cursor-pointer">
                                    {level.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div className=" flex flex-col p-10 rounded-xl mt-20 bg-gray-50 border border-gray-200">
                <label className="text-4xl  text-gray-900">Information represented</label>
                <p className="text-xl leading-5 text-gray-500 mt-5">What information do you wish to represent? </p>
                <fieldset className="mt-10">
                    <div className="space-y-10">
                        {info.map((level, index) => (
                            level.active &&
                            < div key={level.id} className="flex items-center" >
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer"
                                    disabled={!level.selected && numSelected >= 2}
                                    onChange={() => handleCheckBoxChange(index)}
                                />
                                <label htmlFor={level.id} className="ml-3 block text-4xl text-gray-700 cursor-pointer">
                                    {level.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div
                onClick={handleStart}
                className="bg-gray-50 border border-gray-200 mt-10 rounded-xl p-20 text-5xl text-center font-semibold cursor-pointer">
                START
            </div>
        </div >
    )
}
