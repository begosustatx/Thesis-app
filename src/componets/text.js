import React from 'react';
import { useEffect, useState } from 'react'

export default function Example() {

    const [words, setWords] = useState([])
    const [indexes, setIndexeses] = useState([])
    const [effects, setEffects] = useState([])

    useEffect(() => {
        fetch('/word').then(res => res.json()).then(data => {
            console.log(data)
            setWords(data.words)
            setIndexeses(data.indexes)
            setEffects(data.effects);
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


    function play_sound(index) {
        let index_effect = indexes.findIndex(item => item === index)
        let effect = effects[index_effect]
        postData('/play', { value: effect })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    return (
        <div>
            {<div>
                {words.map((word, index) =>
                    indexes.some(item => index === item) ?
                        <span className="text-red-600"
                            onMouseEnter={() => play_sound(index)}
                            onMouseLeave={() => console.log("out")}
                        > {word + ' '}</span>
                        :
                        word + ' '
                )
                }
            </div>}
        </div >
    )
}
