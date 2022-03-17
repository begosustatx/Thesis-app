/* This example requires Tailwind CSS v2.0+ */
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import { useHistory } from "react-router-dom";

import Sentence from './sentence_level'
import Word from './word_level'
import { useEffect, useState } from 'react'

export default function Example() {
    const navigate = useNavigate();

    return (
        <div className="w-2/4 h-96		mx-auto mt-56 ">
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
                    <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
                        Select the test you want ot conduct
        </p>
                    <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:mt-8 tracking-wider text-3xl ">
                        <div
                            onClick={() => navigate('/word')}
                            className="col-span-1 flex justify-center py-8 px-8 bg-gray-50 cursor-pointer rounded-md">
                            WORD LEVEL
                        </div>
                        <div onClick={() => navigate('/sentence')}
                            className="col-span-1 flex justify-center py-8 px-8 bg-gray-50 cursor-pointer rounded-md">
                            SENTENCE LEVEL
                        </div>
                        <div onClick={() => navigate('/test')}
                            className="col-span-1 flex justify-center py-8 px-8 bg-gray-50 cursor-pointer rounded-md">
                            TEST
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
