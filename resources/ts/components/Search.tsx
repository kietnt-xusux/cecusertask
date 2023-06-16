import React, {Dispatch, SetStateAction, useState} from "react";
import {PlusIcon, SearchIcon, XIcon} from "@/components";

export const Search = (props: {
    conditions: string[],
    setConditions: Dispatch<SetStateAction<string[]>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    placeholder: string
}) => {
    const [searchText, setSearchText] = useState('');
    const [conditions, setConditions] = useState<string[]>([]);

    const addCondition = () => {
        if (searchText.trim() === '') return;
        setConditions([searchText]);
        props.setConditions([searchText]);
        props.setCurrentPage(1);
        setSearchText('');
    }

    const removeCondition = (index: number) => {
        let tmp = [...conditions];
        tmp.splice(index, 1);
        setConditions(tmp);
        props.setConditions(tmp);
        props.setCurrentPage(1);
    }

    return (<>
        <div className="flex flex-col md:flex-row mt-4 md:justify-between">
            <div className="mt-1 flex px-2 md:px-0">
                <input
                    type="text"
                    name="searchText"
                    id="searchText"
                    value={searchText}
                    className="border w-96 max-w-lg px-4 py-2 rounded-l-md focus:outline-none"
                    placeholder={props.placeholder}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e)=> {if (e.key === 'Enter') addCondition()}}
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm cursor-pointer"
                      onClick={() => addCondition()}>
                            <SearchIcon className="w-5 h-5" />
                        </span>
            </div>
        </div>

        { conditions.length > 0 &&
            <div className="px-4 py-4 bg-gray-200 mt-2 rounded max-w-lg">
                <p>検索条件</p>
                <div className="mt-2">
                    { conditions.map((item, index) => (
                        <span key={index} className="relative border pl-2 pr-6 py-2 bg-white rounded leading-3 inline-block cursor-pointer hover:bg-gray-100 mr-1"
                              onClick={() => removeCondition(index)}>
                                        { item }
                            <XIcon className="w-5 h-5 text-gray-400 absolute right-0 top-1.5 px-1 py-1" />
                        </span>
                    )) }
                </div>
            </div>
        }
    </>);
}
