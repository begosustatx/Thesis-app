import React from 'react';
import { useEffect, useState } from 'react'
import ReactHtmlParser, {
    processNodes
} from "react-html-parser";
export default function Example() {

    const [html, sethtml] = useState('')

    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        fetch('/process_text').then(res => res.json()).then(data => {
            console.log(data)
            sethtml(data.object)
        });
    }, []);

    function transform(node, index) {
        //TODO: maybe add more css to other elements?
        if (node.type === "tag" && node.attribs.class === "adj" && node.name === "span") {
            //SAYS THAT IS BIGGER THAN IT IS 
            let length = (node.children[0].data.length)
            let p_type = true
            if (node.parent.name === "h1") p_type = false
            return (
                <span
                    className="text-red-600"
                    onMouseOver={() => play_sound(node.attribs.id, length, p_type)}
                    onMouseLeave={() => console.log("out")}
                > {node.children[0].data}</span>)
        }
        if (node.type === "tag" && node.name === "h1") {
            return (
                <button className="text-7xl">
                    {processNodes(node.children, transform)}
                </button>
            )
        }
        //TODO: ADD THIS TO THE BACKEND 
        if (node.type === "tag" && node.name === "b") {
            return (
                <b
                    onMouseOver={() => play_sound("1")}
                    onMouseLeave={() => console.log("out")}
                > {node.children[0].data}</b>)
        }
        if (node.type === "tag" && node.name === "i") {
            return (
                <i
                    onMouseOver={() => play_sound("1")}
                    onMouseLeave={() => console.log("out")}
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
        fetch('/start_tracking').then(res => res.json()).then(data => {
            console.log(data)
        });
    }

    function play_sound(effect_number, num_char, p_type) {
        postData('/play', { value: parseInt(effect_number), num_char: num_char, p_type: p_type })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    return (
        <div className="w-2/4 h-96	mx-auto mt-52 ">
            <div className="grid">
                <button className=" mx-auto  inline-flex items-center px-10 py-5 border border-transparent text-lg font-medium rounded-md shadow-sm text-black bg-gray-200 cursor-pointer"
                    onClick={() => handleStart()}>START</button>
            </div>
            <div className="ml-10 mt-10 text-4xl tracking-wide leading-relaxed">
                <div >{ReactHtmlParser(html, options)}</div>
            </div >
        </div >
    )
}
