import React from 'react';
import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import ReactHtmlParser, {
    convertNodeToElement,
    processNodes
} from "react-html-parser";
export default function Example({ object }) {

    const type = "word"
    const [words, setWords] = useState([])
    const [indexes, setIndexeses] = useState([])
    const [effects, setEffects] = useState([])
    const [objects, setObject] = useState([])
    const [index, setIndex] = useState(0)
    const [displayed, setdisplayed] = useState([])
    const [html, sethtml] = useState('')
    const [level, setLevel] = useState('')

    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        fetch('/process_text').then(res => res.json()).then(data => {
            console.log(data)
            sethtml(data.object)
            //setWords(data.words.slice(0, 530))
            //setIndexeses(data.indexes)
            //setEffects(data.effects);
        });
    }, []);
    /*
    
        function cutObject(data) {
            let index = 0
            let count = 0
            let object_array = []
            let temp_array = []
            for (var i = 0; i < data.length; i++) {
                console.log("here")
                count = count + data[i].words.length
                if (count <= 200) {
                    temp_array = ([...temp_array, data[i]])
                }
                else {
                    object_array = ([...object_array, temp_array])
                    console.log("object_array", object_array)
                    temp_array = []
                    count = data[i].words.length
                    temp_array = ([...temp_array, data[i]])
                    index = index + 1
                }
                console.log(temp_array)
    
            }
            setdisplayed(object_array[0])
            setObject(object_array)
        }*/

    function transform(node, index) {
        // return null to block certain elements
        // don't allow <span> elements
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

    function onClickNext() {
        setdisplayed(objects[index + 1])
        setIndex(index + 1)
    }

    function onClickPrevious() {
        setdisplayed(objects[index - 1])
        setIndex(index - 1)
    }
    return (
        <div className="ml-10 text-4xl tracking-wide leading-relaxed">
            <div >{ReactHtmlParser(html, options)}</div>
        </div >

    )
}
