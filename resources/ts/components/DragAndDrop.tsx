import React, {useRef, useEffect, useState, MutableRefObject} from 'react'

export const DragAndDrop = (props: { handleDrop: any, className?: string, file: any }) => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const [file, setFile] = useState<any>(null);

    useEffect(() => {
        if (file) {
            props.handleDrop(file);
        }
    }, [file]);

    useEffect(() => {
        setFile(props.file);
    }, [props.file]);


    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData()
        }
    }

    const handleClickButton = () => {
        inputRef.current.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            e.target.value = '';
        }
    }

    return (
        <div className={"inline-block relative w-full border-2 border-dashed border-gray-400 rounded py-4" + (props.className ? " " + props.className : "")}
             onDrop={handleDrop}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDragEnter={handleDragEnter}>
            <p className="text-center mt-4 text-gray-400 font-bold">ここにファイルをドロップ</p>
            <p className="text-center mt-2 text-gray-400 font-bold">または</p>
            <div className="flex justify-center mt-2">
                <button className="bg-white border px-6 py-2 rounded text-gray-400 font-bold focus:outline-none" onClick={handleClickButton}>
                    ファイルを選択
                </button>
                <input type="file" className="hidden" ref={inputRef} onChange={handleInputChange} />
            </div>
            { file  && <p className="text-center mt-4">{file.name}</p> }
        </div>
    )
}
