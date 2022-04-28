/* This example requires Tailwind CSS v2.0+ */
import Toggle from './toggle'
import { useState } from "react";

export default function Example({ sethtml, setIntonation_dict, postData, enabled, setEnabled }) {

    const [info, setInfo] = useState([
        { id: 'intonation', title: 'Intonation', selected: false },
        { id: 'sentiment', title: '(neg/pos) Sentiment', selected: false },
    ])

    const [semantics, setSem] = useState([
        { id: 'verb', title: 'Verb', selected: false },
        { id: 'adjective', title: 'Adjective', selected: false },
        { id: 'noun', title: 'Noun', selected: false },
    ])


    const [texts, setTexts] = useState([
        { id: 'text1', title: 'Text example 1', selected: false },
        { id: 'text2', title: 'Text example 2', selected: false },
    ])

    function handleRadioChangeInfo(index) {
        let i = info.findIndex(elem => elem.selected === true)
        if (i !== -1) {
            info[i].selected = false
        }
        info[index].selected = true
    }

    function handleRadioChangeText(index) {
        let i = texts.findIndex(elem => elem.selected === true)
        if (i !== -1) {
            texts[i].selected = false
        }
        texts[index].selected = true
    }


    function handleStart() {
        let infoSel = []
        let semSel = []
        let textOpt = []
        if (!enabled) {
            info.filter(elem => elem.selected === true).map(selected => (
                infoSel = ([...infoSel, selected.id])
            ))
            semantics.filter(elem => elem.selected === true).map(selected => (
                semSel = ([...semSel, selected.id])
            ))
        }
        texts.filter(elem => elem.selected === true).map(selected => (
            textOpt = ([...textOpt, selected.id])
        ))
        //Make sure that if style is not selected at least one of each options is selected
        if (((infoSel.length === 0 || semSel.length === 0) && !enabled) || (enabled && textOpt.length === 0)) {
            alert("Please select you options")
        }
        else {
            postData('/process_text', { option: infoSel, part_of: semSel, text_opt: textOpt[0] })
                .then(data => {
                    sethtml(data.object)
                    if (infoSel.length !== 0 && infoSel[0] === 'intonation') {
                        setIntonation_dict(data.intonation_info)
                    }
                });
        }
    }


    return (
        <div className="flex-1 flex flex-col min-h-0 px-16 font-light">
            <Toggle enabled={enabled} setEnabled={setEnabled} />
            <div className=" flex flex-col px-8 py-5 rounded-xl mt-6 bg-gray-50 border border-gray-200">
                <label className="text-4xl  text-gray-900">Part of the speech</label>
                <p className="text-lg leading-5 text-gray-500 mt-5">What type of word do you wish to feel? </p>
                <fieldset className="mt-5">
                    <div className="space-y-7">
                        {semantics.map((level, index) => (
                            < div key={level.id} className="flex items-center" >
                                <input
                                    id={level.id}
                                    name="semmantics"
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer"
                                    disabled={enabled}
                                    onChange={() => semantics[index].selected = !semantics[index].selected}
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
                                    name="info"
                                    type="radio"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer"
                                    disabled={enabled}
                                    onChange={() => handleRadioChangeInfo(index)}
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
                <label className="text-4xl  text-gray-900">Text examples</label>
                <p className="text-lg leading-5 text-gray-500 mt-5">Choose between two different texts </p>
                <fieldset className="mt-5">
                    <div className="space-y-7">
                        {texts.map((level, index) => (
                            < div key={level.id} className="flex items-center" >
                                <input
                                    id={level.id}
                                    name="semmantics"
                                    type="radio"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 cursor-pointer"
                                    onChange={() => handleRadioChangeText(index)}
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
