import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {ListBoxOption} from "@/helper/type";
import {CheckIcon, SelectorIcon} from "@/components/Icon";

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

export const ComboBox = (props: {
    options: ListBoxOption[],
    value: string | number,
    handleOnchange: any,
    disabled?: boolean,
    className?: string
}) => {
    const [query, setQuery] = useState('');
    const ref = useRef<HTMLInputElement>(null);

    const filtered = query === '' ? props.options :
        props.options.filter((option) => {
            return option.name.toLowerCase().includes(query.toLowerCase())
        })

    useEffect(() => {
        const option: ListBoxOption | undefined = props.options.find((item) => item.value === props.value)
        option && ref.current && (ref.current.value = option?.name);
    }, [props.options, props.value]);

    return (
        <Combobox value={props.value} onChange={props.handleOnchange}>
            <div className={"relative " + ( props.className ?? '')}>
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md
                focus:outline-none sm:text-sm">
                    <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(item) => '選択'}
                        ref={ref}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1
                    text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {filtered.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                データが見つかりません。
                            </div>
                        ) : (
                            filtered.map((option) => (
                                <Combobox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-blue-400 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={option.value}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                              {option.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active ? 'text-white' : 'text-blue-400'
                                                    }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}
