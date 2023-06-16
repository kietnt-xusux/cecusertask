import React from "react"

interface Errors {
    [key : string]: [] ;
}

export const Label = ({ errors, attribute, label }: { errors: Errors, attribute: string, label: string }) => (
    <label htmlFor="name" className={`block text-sm font-medium text-gray-700`
        + (errors[attribute] && errors[attribute].length > 0 ? ' text-red-600' : '')}>
            {label}
    </label>
)
