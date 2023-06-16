import React from 'react';
import { ChevronUpIcon } from "@/components";

const ButtonScrollTop =  () => {

    const handlerScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
    }

    return <>
        <button className="fixed right-4 bottom-12 bg-slate-200 hover:bg-gray-300 text-white font-bold w-10 h-10 rounded" onClick={handlerScrollTop}>
            <ChevronUpIcon className="h-5 w-5 mx-auto text-black" />
        </button>
    </>
}

export default ButtonScrollTop;