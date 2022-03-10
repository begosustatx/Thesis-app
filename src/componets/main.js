/* This example requires Tailwind CSS v2.0+ */
import Buttons from './buttons'
import Text from './text'
export default function Example() {
    /*TODO HERE: INSERT THE HTML FILE? */

    const handleClick = () => {
        console.log("here")
        fetch('./short.txt')
            .then((r) => r.text())
            .then(text => {
                console.log(text);
            })
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">
                Content goes here
                <Text />
                <button onClick={() => handleClick()}>add file</button>
                <Buttons />
            </div>
        </div >
    )
}
