import { Fragment, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog, Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon
} from '@heroicons/react/outline'
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon
} from '@heroicons/react/solid'

import { siteName, logo } from '../../../app.config'
import { useAppContext } from '../../contexts/AppContext'

import UserDropdown from './UserDropdown'

const Sidebar = () => {
  const router = useRouter()
  const { mainNavItems } = useAppContext()

  const isActive = href => href === location.pathname

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
      <div className="flex items-center flex-shrink-0 px-6">
        <img className="h-8 w-auto" src={logo} alt={siteName} />
      </div>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
        {/* User account dropdown */}
        <UserDropdown />
        {/* Sidebar Search */}
        <div className="px-3 mt-5">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <SearchIcon
                className="mr-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Navigation */}
        <nav className="px-3 mt-6">
          <div className="space-y-1">
            {mainNavItems.map(item => (
              <Link key={item.name} href={item.href} passHref>
                <a
                  className={classNames(
                    isActive(item.href)
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      isActive(item.href)
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          {/* Secondary navigation */}
          {/* <div className="mt-8">
            <h3
              className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              id="desktop-teams-headline"
            >
              Teams
            </h3>
            <div
              className="mt-1 space-y-1"
              role="group"
              aria-labelledby="desktop-teams-headline"
            >
              {teams.map(team => (
                <a
                  key={team.name}
                  href={team.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  <span
                    className={classNames(
                      team.bgColorClass,
                      'w-2.5 h-2.5 mr-4 rounded-full'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{team.name}</span>
                </a>
              ))}
            </div>
          </div> */}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
