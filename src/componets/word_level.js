import React from 'react';
import { useEffect, useState } from 'react'
import ReactHtmlParser, {
    processNodes
} from "react-html-parser";
import { useNavigate } from 'react-router-dom'
import Stats from './stats'

export default function Example() {
    const navigate = useNavigate();

    const [html, sethtml] = useState('')
    const [start, setStart] = useState(false)
    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        fetch('/process_text').then(res => res.json()).then(data => {
            sethtml(data.object)
            console.log(data)
        });
        console.log("here")
    }, []);

    function transform(node, index) {
        if (node.type === "tag" && node.name === "h1") {
            return (
                <button className="text-7xl">
                    {processNodes(node.children, transform)}
                </button>
            )
        }
        if (node.type === "tag" && node.name === "b") {
            let length = (node.children[0].data.length)
            let p_type = node.parent.name === "p"
            return (
                <b
                    onMouseOver={() => play_sound("1", length, p_type)}
                    onMouseLeave={() => stop_sound()}
                > {node.children[0].data}</b>)
        }
        if (node.type === "tag" && node.name === "i") {
            let length = (node.children[0].data.length)
            let p_type = node.parent.name === "p"

            return (
                <i className="text-blue-800"
                    onMouseOver={() => play_sound("2", length, p_type)}
                    onMouseLeave={() => stop_sound()}
                > {node.children[0].data}</i>)
        }
    }


    async function postData(url = '', data = {}) {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    function handleStart() {
        setStart(true)
        fetch('/start_tracking').then(res => res.json()).then(data => {
            console.log(data)
        });
    }
    function handleStop() {
        fetch('/stop_tracking').then(res => res.json()).then(data => {
            console.log(data)
        });
        navigate('/')
    }

    function play_sound(effect_number, num_char, p_type) {
        if (start) {
            postData('/play', { value: parseInt(effect_number), num_char: num_char, p_type: p_type })
                .then(data => {
                    console.log(data); // JSON data parsed by `data.json()` call
                });
        }
        else alert("Please click start")
    }

    function stop_sound() {
        console.log("OUT")
        fetch('/stop_touching').then(res => res.json()).then(data => {
            console.log(data)
        });

    }

    return (
        <div className="w-2/4 h-96	mx-auto mt-24 ">
            <Stats start={start} />
            <div className="mt-10">
                <button className="  items-center px-10 py-5 border border-transparent text-lg font-medium rounded-md shadow-sm text-black bg-gray-200 cursor-pointer"
                    onClick={() => handleStop()}>BACK</button>
                <button className="float-right	 items-center px-10 py-5 border border-transparent text-lg font-medium rounded-md shadow-sm text-black bg-gray-200 cursor-pointer"
                    onClick={() => handleStart()}>START</button>
            </div>
            <div className="ml-10 mt-10 text-5xl tracking-wide leading-loose">
                <div >{ReactHtmlParser(html, options)}</div>
            </div >
        </div >
    )
}
