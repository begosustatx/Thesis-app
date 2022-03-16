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
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                    onClick={() => navigate('/word')}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    Word level
                </button>
                <button
                    onClick={() => navigate('/sentence')}
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    Sentence level
             </button>
            </span>

        </div >
    )
}
