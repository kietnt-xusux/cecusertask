import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {DocumentTextIcon} from "@/components";


export const PopoverBox = (props: {title?: string, classPanel?: string, classButton?: string, type: any, children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return (
      <div className=" top-16 w-full max-w-sm px-4">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open ? '' : 'text-opacity-90'}`}
              >
                { props.type == 'document-text-icon' && 
                <div>
                  <DocumentTextIcon className={props.classButton}></DocumentTextIcon>
                </div>
                }

              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className={`absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl` + (props.classPanel ? 'lg:max-w-3xl': '')}>
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                      {props.title}
                    </div>
                    <div className="bg-gray-50 p-4">
                      {props.children}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    )
  }