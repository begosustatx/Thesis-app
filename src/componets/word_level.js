import React from 'react';
import { useEffect, useState } from 'react'

export default function Example({ object }) {

    const type = "word"
    const [words, setWords] = useState([])
    const [indexes, setIndexeses] = useState([])
    const [effects, setEffects] = useState([])
    const [objects, setObject] = useState([])

    useEffect(() => {
        postData('/word', { value: object })
            .then(data => {
                setObject(data.html_object)
            });
    }, []);

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


    function play_sound(i, index) {
        console.log(i)
        let index_effect = objects[i].indexes.findIndex(item => item === index)
        let effect = objects[i].effects[index_effect]
        postData('/play', { value: effect })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    return (
        <div className="ml-10">
            {<div className="text-4xl tracking-wide leading-relaxed">
                {objects.map((object, i) =>
                    object.type === "title" ?
                        <div key={i.toString()} className="text-7xl">
                            {object.words.map((word, index) =>
                                object.indexes.some(item => index === item) ?
                                    <span key={i.toString() + index.toString()}
                                        className="text-red-600"
                                        onMouseEnter={() => play_sound(i, index)}
                                        onMouseLeave={() => console.log("out")}
                                    > {word + ' '}</span>
                                    :
                                    <span key={i.toString() + index.toString()}
                                    > {word + ' '}</span>
                            )}
                        </div>
                        :
                        <div key={i.toString()}>
                            {object.words.map((word, index) =>
                                object.indexes.some(item => index === item) ?
                                    <span key={i.toString() + index.toString()}
                                        className="text-red-600 my-3.5	 "
                                        onMouseEnter={() => play_sound(i, index)}
                                        onMouseLeave={() => console.log("out")}
                                    > {word + ' '}</span>
                                    :
                                    <span key={i.toString() + index.toString()}
                                        className=" py-11	"
                                    > {word + ' '}</span>
                            )}
                        </div>
                )
                }
            </div>}
        </div >
    )
}
