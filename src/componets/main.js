import React from 'react';
import { useEffect, useState } from 'react'
import ReactHtmlParser from "react-html-parser";
import Stats from './stats'
import SideMenu from './side_bar'
import Scroll from './scroll_btn'

export default function Example() {

    const [style, setStyle] = useState(false)
    const [html, sethtml] = useState('')
    const [intonation_dict, setIntonation_dict] = useState([])

    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        fetch('/start_tracking').then(res => res.json()).then(data => {
            console.log("wtf")
        });
    }, []);

    function transform(node) {
        if (style) {
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
        }
        else {
            if (node.type === "tag" && node.attribs.class === "adjective" && node.name === "span") {
                return (
                    <span
                        className="text-red-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "noun" && node.name === "span") {
                return (
                    <span
                        className="text-pink-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "verb" && node.name === "span") {
                return (
                    <span
                        className="text-green-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "adverb" && node.name === "span") {
                return (
                    <span
                        className="text-blue-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "pronoun" && node.name === "span") {
                return (
                    <span
                        className="text-orange-300"
                        onMouseOver={() => play_sound(node.attribs.id)}
                        onMouseLeave={() => stop_sound()}
                    > {node.children[0].data}</span>)
            }
            if (node.type === "tag" && node.attribs.class === "intonation" && node.name === "span") {
                let object = setIntonation(node.children[0].data)
                if (object !== undefined)
                    return (
                        <span>
                            {object.array.map((syl, index) =>
                                index === object.index ?
                                    <span
                                        className="text-green-600"
                                        onMouseOver={() => play_sound(1)}
                                        onMouseLeave={() => stop_sound()}
                                    >{syl}</span>
                                    :
                                    <span
                                        className="text-red-600"
                                    >{syl}</span>
                            )}
                        </span>)
            }
        }

    }

    function setIntonation(word) {
        word = word.replace(/ /g, '')
        return (intonation_dict.find(element => element.word === word.toLowerCase()));
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
        <div className="grid grid-cols-4  mt-24 ">
            <SideMenu sethtml={sethtml} setIntonation_dict={setIntonation_dict} postData={postData} setStyle={setStyle} />
            <div className="h-96	mx-auto col-span-2">
                <Stats />
                <div className="ml-20 mt-10 text-6xl tracking-wide leading-loose h-196 overflow-scroll">
                    <div >{ReactHtmlParser(html, options)}</div>
                </div >
            </div >
            <Scroll />
        </div>
    )
}
