import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Card, Container, Row } from 'react-bootstrap';
import { GET_STATION } from '../queries';
import { StationItem } from '../types/stationItem';
import { Loader } from '../../../shared/components/loader';
import { Error } from '../../../shared/components/error';

export function StationPage() {
  const { id = '0' } = useParams();
  const { loading, error, data } = useQuery<{ station: StationItem }>(
    GET_STATION,
    { variables: { id: +id } },
  );
  if (loading) return <Loader expand />;
  if (error) {
    let { message } = error;
    if (error.graphQLErrors[0]?.extensions?.code === '404') {
      message = 'Station not found. Try another one.';
    }
    return (
      <Error message={message}>
        <Link to="/">Back to stations list</Link>
      </Error>
    );
  }
  const station = data?.station;
  if (!station) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>{station.name}</Card.Title>
            <div>
              Margin:
              {station.metrics.margin}
            </div>
            <div>
              Volume:
              {station.metrics.volume}
            </div>
            <div>
              Profit:
              {station.metrics.profit}
            </div>
          </Card.Body>
        </Card>

        <Link to="/">Back to stations list</Link>
      </Row>
    </Container>
  );
}
