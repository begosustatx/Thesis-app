/* This example requires Tailwind CSS v2.0+ */

const levels = [
    { id: 'sentence', title: 'Sentence' },
    { id: 'word', title: 'Word' },
]

const info = [
    { id: 'intonation', title: 'Intonation' },
    { id: 'style', title: 'Style' },
    { id: 'part_speech', title: 'Part of the speech' },
    { id: 'semmantics', title: 'Semmantics' },
]

export default function Example() {
    return (
        <div className="flex-1 flex flex-col min-h-0 px-16 mt-5 font-light">
            <div className=" flex flex-col p-10 rounded-xl bg-gray-50 border border-gray-200 ">
                <label className="text-4xl  text-gray-900">Haptics level</label>
                <p className="text-xl leading-5 text-gray-500 mt-5">How do you prefer the haptics effect to be applied? </p>
                <fieldset className="mt-10">
                    <div className="space-y-10">
                        {levels.map((level) => (
                            <div key={level.id} className="flex items-center">
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="radio"
                                    defaultChecked={level.id === 'word'}
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={level.id} className="ml-3 block text-4xl text-gray-700">
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
                        {info.map((level) => (
                            <div key={level.id} className="flex items-center">
                                <input
                                    id={level.id}
                                    name="level-method"
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={level.id} className="ml-3 block text-4xl text-gray-700">
                                    {level.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        </div>
    )
}
