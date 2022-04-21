import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  MemoryRouter,
  Route,
  Routes
} from "react-router-dom";
import { StationPage } from './station';
import { StationItem } from '../types/stationItem';
import { GET_STATION } from '../queries';
import { wait } from '@testing-library/user-event/dist/utils';

const mocks: MockedResponse<{ station: StationItem }>[] = [
  {
    request: {
      query: GET_STATION,
      variables: { id: 1 },
    },
    result: {
      data: {
        station: {
          id: 1,
          name: 'station name',
          metrics: {
            volume: 1,
            margin: 1,
            profit: 1,
          },
        },
      },
    },
  }
];

test('displays loader while fetching data', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <StationPage />
    </MockedProvider>
  );
  const linkElement = screen.getByTestId('spinner');
  expect(linkElement).toBeInTheDocument();
});

test('displays station information', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/station/1']}>
        <Routes>
          <Route path='/station/:id' element={<StationPage />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => new Promise(resolve => setTimeout(resolve, 50)));

  const linkElement = screen.getByText(/Margin: 1/);
  expect(linkElement).toBeInTheDocument();
});

test('displays error message when station is not found', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/station/10']}>
        <Routes>
          <Route path='/station/:id' element={<StationPage />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => new Promise(resolve => setTimeout(resolve, 50)));

  const linkElement = screen.getByText(/No more mocked responses for the query/);
  expect(linkElement).toBeInTheDocument();
});
