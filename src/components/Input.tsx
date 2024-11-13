'use client';
import React, { useEffect, useState } from 'react';
import { Field } from '@/helper/type';
import { ListBox } from '@/components/ListBox';
import { DatePicker } from '@/components';

export const Input = (props: { register: any; field: Field; errors: any; setValue: any; getValues: any }) => {
    if (props.field.type === 'select') {
        return (
            <InputSelect
                register={props.register}
                field={props.field}
                errors={props.errors}
                setValue={props.setValue}
                getValues={props.getValues}
            />
        );
    }

    if (props.field.type === 'radio') {
        return (
            <InputRadio register={props.register} field={props.field} errors={props.errors} setValue={props.setValue} />
        );
    }

    if (props.field.type === 'textarea') {
        return <InputTextarea register={props.register} field={props.field} errors={props.errors} />;
    }

    if (props.field.type === 'date') {
        return (
            <InputDate
                register={props.register}
                field={props.field}
                errors={props.errors}
                setValue={props.setValue}
                getValues={props.getValues}
            />
        );
    }

    return <InputText register={props.register} field={props.field} errors={props.errors} />;
};

export const InputText = ({register, field, errors}: { register: any; field: Field; errors: any }) => (
    <>
        <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mt-4'>
            {field.label}
        </label>
        <input
            {...register(field.name, field.validateOptions)}
            placeholder={field.placeholder ?? field.label}
            defaultValue={field.defaultValue}
            type={field.type ?? 'text'}
            id={field.name}
            className={
                (errors[field.name] ? 'border-red-300' : 'border-gray-300') +
                ` border mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm rounded-md focus:outline-none
                disabled:bg-gray-300`
            }
            disabled={field.disabled}
        />
        {errors[field.name] && (
            <p className='text-red-500 mt-1'>{errors[field.name].message}</p>
        )}
    </>
);

interface InputSelectProps {
    register: any;
    field: Field;
    errors: any;
    setValue: any;
    getValues: any;
}

export const InputSelect = ({register, field, setValue, errors, getValues}: InputSelectProps) => {
    register(field.name, field.validateOptions);
    const handleChange = (option: string | number) => {
        setValue(field.name, option, { shouldValidate: true });
    };
    const getValueUpdate = () => {
        return getValues(field.name) ?? field.defaultValue;
    };

    return (
        <>
            <label className='block text-sm font-medium text-gray-700 mt-4'>
                {field.label}
            </label>
            <ListBox
                options={field.options!}
                value={getValueUpdate()}
                handleOnChange={handleChange}
                className='max-w-xs mt-2'
            />
            {errors[field.name] && (
                <p className='text-red-500 mt-1'>{errors[field.name].message}</p>
            )}
        </>
    );
};

export const InputRadio = (props: { register: any; field: Field; errors: any; setValue: any }) => {
    const [value, setValue] = useState<string | number>(props.field.defaultValue);

    useEffect(() => {
        setValue(props.field.defaultValue);
    }, [props.field.defaultValue]);

    return (
        <>
            <div className='text-sm font-medium text-gray-900 mt-4'>{props.field.label}</div>
            <div className='mt-1 space-y-2'>
                {props.field.options!.map(option => (
                    <div className='flex items-center' key={option.id}>
                        <input
                            {...props.register(props.field.name, props.field.validateOptions)}
                            type='radio'
                            value={option.value}
                            id={props.field.name + '_' + option.id}
                            className='ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                            defaultChecked={value === option.value}
                            onChange={() => setValue(option.value)}
                        />
                        <label
                            htmlFor={props.field.name + '_' + option.id}
                            className='ml-3 block text-sm font-medium text-gray-700 cursor-pointer'>
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
};

export const InputTextarea = (props: { register: any; field: Field; errors: any }) => (
    <>
        <label htmlFor={props.field.name} className='block text-sm font-medium text-gray-700 mt-4'>
            {props.field.label}
        </label>
        <textarea
            {...props.register(props.field.name, props.field.validateOptions)}
            placeholder={props.field.placeholder ?? props.field.label}
            defaultValue={props.field.defaultValue}
            className={
                (props.errors[props.field.name] ? 'border-red-300' : 'border-gray-300') +
                ` border mt-1 px-2 py-2 block w-full shadow-sm sm:text-sm rounded-md focus:outline-none`
            }
            rows={5}
        />
        {props.errors[props.field.name] && (
            <p className='text-red-500 mt-1'>{props.errors[props.field.name].message}</p>
        )}
    </>
);

export const InputDate = ({
    register,
    field,
    errors,
    setValue,
    getValues
}: {
    register: any;
    field: Field;
    errors: any;
    setValue: any;
    getValues: any;
}) => {
    const [date, setDate] = useState(getValues(field.name) ?? '');
    register(field.name, field.validateOptions);
    const handleChange = (value: string) => {
        setDate(value);
        setValue(field.name, value);
    };
    useEffect(() => {
        getValues(field.name) && getValues(field.name) !== '' && setDate(getValues(field.name));
    }, [getValues(field.name)]);

    return (
        <>
            <label htmlFor={field.name} className='block text-sm font-medium text-gray-700 mt-4'>
                {field.label}
            </label>
            <div className='max-w-full mt-1'>
                <DatePicker date={date} setDate={handleChange} />
            </div>
            {errors[field.name] && <p className='text-red-500 mt-1'>{errors[field.name].message}</p>}
        </>
    );
};
