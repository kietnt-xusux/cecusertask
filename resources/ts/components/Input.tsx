import React, {useEffect, useState} from "react"
import {Field} from "@/helper/type";
import {ListBox} from "@/components/ListBox";
import {processDecimalNumber, currencyNumberV1, textNumber} from "@/helper/utils";
import {DatePicker} from "@/components/DatePicker";

export const Input = (props: { register: any, field: Field, errors: any, setValue: any, getValues: any }) => {
    if (props.field.type === 'select') {
        return <InputSelect register={props.register} field={props.field} errors={props.errors} setValue={props.setValue} getValues={props.getValues} />
    }

    if (props.field.type === 'radio') {
        return <InputRadio register={props.register} field={props.field} errors={props.errors} setValue={props.setValue} />
    }

    if (props.field.type === 'textarea') {
        return <InputTextarea register={props.register} field={props.field} errors={props.errors} />
    }

    if (props.field.type === 'number') {
        return <InputNumber register={props.register} field={props.field} errors={props.errors} setValue={props.setValue} />
    }

    if (props.field.type === 'decimal') {
        return <InputDecimal register={props.register} field={props.field} errors={props.errors} setValue={props.setValue} />
    }

    return <InputText register={props.register} field={props.field} errors={props.errors} />
}

export const InputText = (props: { register: any, field: Field, errors: any }) => (
    <>
        <label htmlFor={props.field.name} className="block text-sm font-medium text-gray-700 mt-4">
            {props.field.label}
        </label>
        <input
            {...props.register(props.field.name, props.field.validateOptions)}
            placeholder={props.field.placeholder ?? props.field.label}
            defaultValue={props.field.defaultValue}
            type={props.field.type ?? 'text'}
            className={(props.errors[props.field.name] ? 'border-red-300' : 'border-gray-300') +
                ` border mt-1 px-2 py-2 block w-full` + (props.field.full ? '' : ' max-w-xs') +
                ` shadow-sm sm:text-sm rounded-md focus:outline-none`}
        />
        {props.errors[props.field.name] && <p className="text-red-500 mt-1">{props.errors[props.field.name].message}</p>}
    </>
)

export const InputSelect = (props: { register: any, field: Field, errors: any, setValue: any, getValues: any }) => {
    props.register(props.field.name, props.field.validateOptions);
    const handleChange = (option: string | number) => {
        props.setValue(props.field.name, option, { shouldValidate: true });
    }
    const getValueUpdate = () => {
        return props.getValues(props.field.name) ?? props.field.defaultValue;
    }

    return <>
        <label htmlFor={props.field.name} className="block text-sm font-medium text-gray-700 mt-4">
            {props.field.label}
        </label>
        <ListBox options={props.field.options!} value={getValueUpdate()} handleOnchange={handleChange} className="max-w-xs mt-1" />
        {props.errors[props.field.name] && <p className="text-red-500 mt-1">{props.errors[props.field.name].message}</p>}
    </>
}

export const InputRadio = (props: { register: any, field: Field, errors: any, setValue: any }) => {
    const [value, setValue] = useState<string | number>(props.field.defaultValue ?? '');

    useEffect(() => {
        setValue(props.field.defaultValue ?? '');
    }, [props.field.defaultValue])

    return <>
        <div className="text-sm font-medium text-gray-900 mt-4">
            {props.field.label}
        </div>
        <div className="mt-1 space-y-2">
            { props.field.options!.map(option =>
                <div className="flex items-center" key={option.id}>
                    <input
                        {...props.register(props.field.name, props.field.validateOptions)}
                        type="radio"
                        value={option.value}
                        id={props.field.name + '_' + option.id}
                        className="ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        defaultChecked={value === option.value}
                        onChange={() => setValue(option.value)}
                    />
                    <label
                        htmlFor={props.field.name + '_' + option.id}
                        className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        {option.name}
                    </label>
                </div>
            )}
        </div>
    </>
}

export const InputTextarea = (props: { register: any, field: Field, errors: any, full?: boolean }) => (
    <>
        <label htmlFor={props.field.name} className="block text-sm font-medium text-gray-700 mt-4">
            {props.field.label}
        </label>
        <textarea
            {...props.register(props.field.name, props.field.validateOptions)}
            placeholder={props.field.placeholder ?? props.field.label}
            defaultValue={props.field.defaultValue}
            className={ (props.errors[props.field.name] ? 'border-red-300' : 'border-gray-300') +
                ` border mt-1 px-2 py-2 block w-full shadow-sm sm:text-sm rounded-md focus:outline-none` +
                (props.field.full ? '' : ' max-w-xs')}
            rows={2}
        />
        {props.errors[props.field.name] && <p className="text-red-500 mt-1">{props.errors[props.field.name].message}</p>}
    </>
)

export const InputNumber = (props: { register: any, field: Field, errors: any, setValue: any }) => {
    return <>
        <label htmlFor={props.field.name} className="block text-sm font-medium text-gray-700 mt-4">
            {props.field.label}
        </label>
        <input
            {...props.register(props.field.name, {
                ...props.field.validateOptions,
                setValueAs: (v: string) => {
                    return v && parseInt(v.toString().replaceAll(',', ''))
                },
                onChange: (e: any) => {
                    let string = e.target.value.trim() === '' ? '' :
                        new Intl.NumberFormat().format(parseInt(e.target.value.replaceAll(',', '')))
                    props.setValue(props.field.name, string);
                },
                onBlur: (e: any) => {
                    if (e.target.value.trim() === '') {
                        props.setValue(props.field.name, '0');
                    }
                }
            })}
            placeholder={props.field.placeholder ?? props.field.label}
            defaultValue={props.field.defaultValue && props.field.defaultValue.toString() !== '' ?
                new Intl.NumberFormat().format(parseInt(props.field.defaultValue.toString())) : ''}
            type="text"
            className={(props.errors[props.field.name] ? 'border-red-300' : 'border-gray-300') +
                ` border mt-1 px-2 py-2 block w-full` + (props.field.full ? '' : ' max-w-xs') +
                ` shadow-sm sm:text-sm rounded-md focus:outline-none`}
        />
        {props.errors[props.field.name] &&
            <p className="text-red-500 mt-1">{props.errors[props.field.name].message}</p>}
    </>
}

export const InputDecimal = (props: { register: any, field: Field, errors: any, setValue: any }) => {
    return <>
        <label htmlFor={props.field.name} className="block text-sm font-medium text-gray-700 mt-4">
            {props.field.label}
        </label>
        <input
            {...props.register(props.field.name, {
                ...props.field.validateOptions,
                setValueAs: (v: string) => {
                    return v && parseFloat(v.toString().replaceAll(',', ''))
                },
                onChange: (e: any) => {
                    let string = processDecimalNumber(e.target.value);
                    props.setValue(props.field.name, string);
                },
                onBlur: (e: any) => {
                    if (e.target.value.trim() === '') {
                        props.setValue(props.field.name, '0');
                    }
                }
            })}
            placeholder={props.field.placeholder ?? props.field.label}
            defaultValue={props.field.defaultValue && props.field.defaultValue.toString() !== '' ?
                new Intl.NumberFormat().format(parseFloat(props.field.defaultValue.toString())) : ''}
            type="text"
            className={(props.errors[props.field.name] ? 'border-red-300' : 'border-gray-300') +
                ` border mt-1 px-2 py-2 block w-full` + (props.field.full ? '' : ' max-w-xs') +
                ` shadow-sm sm:text-sm rounded-md focus:outline-none`}
        />
        {props.errors[props.field.name] &&
            <p className="text-red-500 mt-1">{props.errors[props.field.name].message}</p>}
    </>
}

export const InputDate = ({register, field, errors, setValue, getValues}: { register: any, field: Field, errors: any, setValue: any, getValues: any }) => {
    const [date, setDate] = useState(getValues(field.name) ?? '');
    register(field.name, field.validateOptions);
    const handleChange = (value: string) => {
        setDate(value);
        setValue(field.name, value);
    }
    useEffect(() => {
        getValues(field.name) && getValues(field.name) !== '' && setDate(getValues(field.name))
    }, [getValues(field.name)]);

    return <>
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mt-4">
            {field.label}
        </label>
        <div className="max-w-xs mt-1">
            <DatePicker date={date} setDate={handleChange} />
        </div>
        {errors[field.name] &&
            <p className="text-red-500 mt-1">{errors[field.name].message}</p>}
    </>
}

interface InputPriceProps {
    setValue: (value: any) => void;
    value: any;
    className?: string;
}

export const InputPrice = ({ setValue, value, className}: InputPriceProps) => {
    const [isInputNumberJP, setIsInputNumberJP] = useState(false);
    const [cacheText, setCacheText] = useState('');

    return <>
        <input
            type="text"
            className={
                "border rounded focus:outline-none " +
                (className ? className : '')
            }
            value={isInputNumberJP ? cacheText : currencyNumberV1(value) }
            onChange={(e: any) => {
                if (e.nativeEvent.inputType == 'insertCompositionText') setIsInputNumberJP(true)
                let valueInput = e.target.value;
                
                if (!valueInput.match(/[０-９]+/g) && !isInputNumberJP) {
                    setValue(valueInput)
                    setCacheText('')
                } else {
                    setCacheText(valueInput)
                    setIsInputNumberJP(true)
                }
            }}

            onBlur={(e) => {
                let value = e.target.value
                if (value.match(/[０-９]+/g)) {
                    setValue(textNumber(value))
                } else {
                    setValue(value)
                }

                setIsInputNumberJP(false)
            }}
        />
    </>
}
