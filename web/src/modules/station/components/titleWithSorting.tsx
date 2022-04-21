import React from 'react'
import { Order, Sort } from '../types'
import { getSortByTitle } from '../utils'

type TitleWithSortingProps = {
  title: string
  sort: Sort
  order: Order
  onClick: (title: string) => void
}
export function TitleWithSorting({
  title,
  sort,
  order,
  onClick,
}: TitleWithSortingProps) {
  let text = title
  const columnSort = getSortByTitle(title)
  if (sort && columnSort === sort) {
    if (order === 1) {
      text += ' ▼'
    } else if (order === -1) {
      text += ' ▲'
    }
  }
  return <th
    onClick={() => onClick(title)}
    className='clickable'
  >{text}</th>
}
