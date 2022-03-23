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
    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        fetch('/process_text').then(res => res.json()).then(data => {
            sethtml(data.object)
        });
        console.log("here")
    }, []);

    useEffect(() => {
        fetch('/start_tracking').then(res => res.json()).then(data => {
            sethtml(data.object)
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
            return (
                <b
                    onMouseOver={() => play_sound("1")}
                    onMouseLeave={() => stop_sound()}
                > {node.children[0].data}</b>)
        }
        if (node.type === "tag" && node.name === "i") {

            return (
                <i className="text-blue-800"
                    onMouseOver={() => play_sound("0")}
                    onMouseLeave={() => stop_sound()}
                > {node.children[0].data}</i>)
        }
        if (node.type === "tag" && node.attribs.class === "adj" && node.name === "span") {
            return (
                <span
                    className="text-red-600"
                    onMouseOver={() => play_sound(node.attribs.id)}
                    onMouseLeave={() => stop_sound()}
                > {node.children[0].data}</span>)
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

    /*
    function handleStart() {
        setStart(true)
        fetch('/start_tracking').then(res => res.json()).then(data => {
            console.log(data)
        });
    }*/
    function handleStop() {
        /* fetch('/stop_tracking').then(res => res.json()).then(data => {
             console.log(data)
         });*/
        navigate('/')
    }

    function play_sound(effect_number) {
        postData('/play', { value: parseInt(effect_number) })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    function stop_sound() {
        console.log("OUT")
        fetch('/stop_touching').then(res => res.json()).then(data => {
            console.log(data)
        });

    }

    return (
        <div className="w-2/4 h-96	mx-auto mt-24 ">
            <Stats />
            <div className="ml-10 mt-10 text-6xl tracking-wide leading-loose">
                <div >{ReactHtmlParser(html, options)}</div>
            </div >
        </div >
    )
}
