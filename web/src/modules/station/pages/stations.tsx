import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Table } from 'react-bootstrap';
import { GET_STATIONS } from '../queries';
import { Loader } from '../../../shared/components/loader';
import { StationItem } from '../types/stationItem';
import { Error } from '../../../shared/components/error';
import { useNavigate } from 'react-router-dom';
import { Order, Sort } from '../types';
import { getSortByTitle } from '../utils';
import { TitleWithSorting } from '../components/titleWithSorting';

export function StationsPage() {
  const { loading, error, data } = useQuery<{ stations: StationItem[] }>(GET_STATIONS);
  const navigate = useNavigate()
  const [ [sort, order], setSort ] = useState(['', 1] as [Sort, Order])
  const handleSortClick = useCallback((title: string) => {
    const newSort = getSortByTitle(title)
    const newOrder = (newSort === sort ? order * -1 : 1) as Order
    setSort([newSort, newOrder])
  }, [sort, order, setSort])
  const sortedStations = useMemo(() => {
    const stations = [...data?.stations || []]
    if (stations.length > 0 && sort) {
      stations.sort((e1, e2) => {
        const v1 = sort === 'name' ? e1.name : e1.metrics[sort]
        const v2 = sort === 'name' ? e2.name : e2.metrics[sort]
        return order * (v2>v1 ? 1 : v1>v2 ? -1 : 0)
      })
    }
    return stations
  }, [data, sort, order])

  if (loading) return <Loader expand />
  if (error) return <Error message={error.message} />

  return <Container>
    <Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <TitleWithSorting title='Name' sort={sort} order={order} onClick={handleSortClick}/>
            <TitleWithSorting title='Margin' sort={sort} order={order} onClick={handleSortClick}/>
            <TitleWithSorting title='Volume' sort={sort} order={order} onClick={handleSortClick}/>
            <TitleWithSorting title='Profit' sort={sort} order={order} onClick={handleSortClick}/>
          </tr>
        </thead>
        <tbody>
          {sortedStations.map(s =>
            <tr
              key={s.id}
              onClick={() => navigate(`/station/${s.id}`)}
              className='clickable'
            >
              <td>{s.name}</td>
              <td>{s.metrics.margin}</td>
              <td>{s.metrics.volume}</td>
              <td>{s.metrics.profit}</td>
            </tr>)}
        </tbody>
      </Table>
    </Row>
  </Container>
}
