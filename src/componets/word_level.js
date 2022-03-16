import React from 'react';
import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Example({ object }) {

    const type = "word"
    const [words, setWords] = useState([])
    const [indexes, setIndexeses] = useState([])
    const [effects, setEffects] = useState([])
    const [objects, setObject] = useState([])
    const [index, setIndex] = useState(0)
    const [displayed, setdisplayed] = useState([])


    useEffect(() => {
        postData('/word', { value: object })
            .then(data => {
                console.log(data.html_object)
                cutObject(data.html_object)
            });

    }, []);


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


    function play_sound(i, index) {
        console.log(objects)
        let index_effect = objects[i].indexes.findIndex(item => item === index)
        let effect = objects[i].effects[index_effect]
        postData('/play', { value: effect })
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
        <div className="ml-10">
            {<div className="text-4xl tracking-wide leading-relaxed">
                {console.log("on html ", objects[index])}
                {displayed.map((object, i) =>
                    object.type === "title" ?
                        <div key={i.toString()} className="text-7xl">
                            {object.words.map((word, index) =>
                                object.indexes.some(item => index === item) ?
                                    <span key={i.toString() + index.toString()}
                                        className="text-red-600"
                                        onMouseOver={() => play_sound(i, index)}
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
                                        className="text-red-600"
                                        onMouseOver={() => play_sound(i, index)}
                                        onMouseLeave={() => console.log("out")}
                                    > {word + ' '}</span>
                                    :
                                    <span key={i.toString() + index.toString()}
                                        className=" "
                                    > {word + ' '}</span>
                            )}
                        </div>
                )
                }
            </div>}
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                    type="button"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    onClick={() => onClickPrevious()}

                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    onClick={() => onClickNext()}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </span>

        </div >

    )
}
