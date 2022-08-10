import { Fragment, useState } from 'react'

import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { SelectorIcon } from '@heroicons/react/solid'

import { useSessionContext } from '../../contexts/SessionContext'

const UserDropdown = () => {
  const { user } = useSessionContext()

  return (
    <Menu as="div" className="px-3 relative inline-block text-left">
      <div>
        <Menu.Button className="group w-full bg-slate-800 rounded-md px-3.5 py-2 text-sm text-left font-medium text-slate-400 hover:bg-slate-700 focus:outline-none dark:highlight-white/5">
          <span className="flex w-full justify-between items-center">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              <img
                className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                src={
                  user.avatarUrl ||
                  `https://avatars.dicebear.com/api/adventurer/${user.email}.svg`
                }
                alt=""
              />
              <span className="flex-1 flex flex-col min-w-0">
                <span className="ttext-slate-400 text-sm font-medium truncate">
                  {user.name}
                </span>
                <span className="text-slate-500 text-sm truncate">
                  {user.email}
                </span>
              </span>
            </span>
            <SelectorIcon
              className="flex-shrink-0 h-5 w-5 text-slate-400 group-hover:text-slate-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 divide-y divide-slate-700 focus:outline-none dark:highlight-white/5">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'text-slate-200' : 'text-slate-300',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  View profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'text-slate-200' : 'text-slate-300',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'text-slate-200' : 'text-slate-300',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Notifications
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'text-slate-200' : 'text-slate-300',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Get desktop app
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'text-slate-200' : 'text-slate-300',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="/sair" passHref>
                  <a
                    className={classNames(
                      active ? 'text-slate-200' : 'text-slate-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Logout
                  </a>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserDropdown
