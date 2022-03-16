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
            return (
                <span
                    className="text-red-600"
                    onMouseOver={() => play_sound(node.attribs.id)}
                    onMouseLeave={() => console.log("out")}
                > {node.children[0].data}</span>)
        }
        if (node.type === "tag" && node.name === "h1") {
            return (
                <button className="bg-red-600 text-7xl">
                    {processNodes(node.children, transform)}
                </button>
            )
        }
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


    function play_sound(effect_number) {
        console.log("at play sound:", effect_number)

        postData('/play', { value: parseInt(effect_number) })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    return (
        <div className="w-2/4 h-96	mx-auto mt-56 ">
            <div className="ml-10 text-4xl tracking-wide leading-relaxed">
                <div >{ReactHtmlParser(html, options)}</div>
            </div >
        </div >
    )
}
