import { useNavigate } from "react-router-dom";

const callouts = [
    {
        name: 'HAPTIC TRAINING',
        href: '/haptic-test',
    },
    {
        name: 'READING TRAINING',
        href: '/read-test',
    },
    {
        name: 'READING + HAPTICS',
        href: '/toolkit',
    },
]

export default function Example() {
    let navigate = useNavigate();

    function handleClick(path) {
        console.log(path)
        navigate(path);
    }

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center">WELCOME TO THE USER STUDY</h2>
                    <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                        {callouts.map((callout) => (
                            <button
                                onClick={() => handleClick(callout.href)}
                                key={callout.name} className="group relative  cursor-pointer bg-gray-100 p-7">
                                <h3 className=" text-xl text-gray-500">
                                    {callout.name}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
