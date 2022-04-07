/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react";

export default function Example({ sethtml, setIntonation_dict, postData, setStyle }) {

    const levels = [
        { id: 'sentence', title: 'Sentence', selected: false },
        { id: 'word', title: 'Word', selected: true },
        { id: 'style', title: 'Style', selected: false },
    ]

    const [info, setInfo] = useState([
        { id: 'intonation', title: 'Intonation', selected: false, active: true },
        { id: 'semantics', title: 'Semantics', selected: false, active: true },
        { id: 'part_speech', title: 'Part of the speech', selected: false, active: true },
    ])

    const semantics = [
        { id: 'verb', title: 'Verb' },
        { id: 'adverb', title: 'Adverb' },
        { id: 'pronoun', title: 'Pronoun' },
        { id: 'noun', title: 'Noun' },

    ]

    const [activeLev, setActiveLev] = useState('')
    const [activeTag, setActiveTag] = useState('')
    const [numSelected, setNumSelected] = useState(0)

    function handleSelectChange(id, index) {
        for (let i = 0; i < info.length; i++) {
            info[i].active = true
        }
        setActiveLev(id)
        /*
        let new_levels = [...levels]
        let old_index = levels.indexOf(levels.filter(elem => elem.selected === true)[0])
        if (old_index !== -1)
            new_levels[old_index].selected = false
        new_levels[index].selected = true;
        setLevels(new_levels)
        */

        let i = info.indexOf(info.filter(elem => elem.id === 'part_speech')[0])
        if (id === 'style' || id === 'sentence') {
            for (let j = 0; i < info.length; j++) {
                if (id === 'style' || (id === 'sentence' && j !== i))
                    info[j].active = false
            }
        }
    }

    function handleCheckBoxChange(id, index) {
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
        if (id === 'part_speech')
            setActiveTag('adjective')
    }

    function handleStart() {
        let option = ''
        let bool = false
        let sub = info.filter(elem => elem.selected === true)
        if (sub.length !== 0)
            option = sub[0].id
        //TODO: FIX IF WE ALLOW MORE THAN 1 
        if (activeLev === 'style') {
            bool = true
        }
        setStyle(bool)
        if (activeLev === '' || (sub.length === 0 && !bool)) {
            alert("Please select you options")
        }
        else {
            postData('/process_text', { level: activeLev, option: option, tag: activeTag })
                .then(data => {
                    sethtml(data.object)
                    if (option === 'intonation') {
                        setIntonation_dict(data.intonation_info)
                    }
                });
        }
    }

    function isSemanticsActive() {
        let i = info.indexOf(info.filter(elem => elem.id === 'semantics')[0])
        return (!info[i].selected)
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 px-16 font-light">
            <div className=" flex flex-col px-8 py-5 rounded-xl bg-gray-50 border border-gray-200 ">
                <label className="text-4xl  text-gray-900">Haptics level</label>
                <p className="text-lg leading-5 text-gray-500 mt-5">How do you prefer the haptics effect to be applied? </p>
                <fieldset className="mt-5">
                    <div className="space-y-7">
                        {levels.map((level, index) => (
                            <div key={level.id} className="flex items-center">
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="radio"
                                    selected={level.id === 'word'}
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer "
                                    onChange={() => handleSelectChange(level.id, index)}
                                />
                                <label htmlFor={level.id} className="ml-3 block text-3xl text-gray-700 cursor-pointer">
                                    {level.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div className=" flex flex-col px-8 py-5 rounded-xl mt-6 bg-gray-50 border border-gray-200">
                <label className="text-4xl  text-gray-900">Information represented</label>
                <p className="text-lg leading-5 text-gray-500 mt-5">What information do you wish to represent? </p>
                <fieldset className="mt-5">
                    <div className="space-y-7">
                        {info.map((level, index) => (
                            < div key={level.id} className="flex items-center" >
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer"
                                    disabled={(!level.selected && numSelected >= 2) || !level.active}
                                    onChange={() => handleCheckBoxChange(level.id, index)}
                                />
                                <label htmlFor={level.id} className="ml-3 block text-3xl text-gray-700 cursor-pointer">
                                    {level.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div className=" flex flex-col px-8 py-5 rounded-xl mt-6 bg-gray-50 border border-gray-200">
                <label className="text-4xl  text-gray-900">Semantics</label>
                <p className="text-lg leading-5 text-gray-500 mt-5">What type of word do you wish to represent? </p>
                <fieldset className="mt-5">
                    <div className="space-y-7">
                        {semantics.map((level, index) => (
                            < div key={level.id} className="flex items-center" >
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="radio"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer"
                                    disabled={isSemanticsActive()}
                                    onChange={() => setActiveTag(level.id)}
                                />
                                <label htmlFor={level.id} className="ml-3 block text-3xl text-gray-700 cursor-pointer">
                                    {level.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div
                onClick={handleStart}
                className="bg-gray-50 border border-gray-200 mt-6 rounded-xl p-10 text-5xl text-center font-semibold cursor-pointer">
                START
            </div>
        </div >
    )
}
