/* This example requires Tailwind CSS v2.0+ */
import { Switch } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({ enabled, setEnabled }) {

    return (
        <Switch.Group as="div" className="flex  px-8 py-5 rounded-xl mt-6 bg-gray-50 border border-gray-200 items-center justify-between">
            <span className="flex-grow flex flex-col">
                <Switch.Label as="span" className="text-4xl  text-gray-900" passive>
                    Style
            </Switch.Label>
            </span>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-10 w-20 border-0 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-indigo-500'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        enabled ? 'translate-x-10' : 'translate-x-0',
                        'pointer-events-none inline-block h-10 w-10 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 border-2'
                    )}
                />
            </Switch>
        </Switch.Group>
    )
}
