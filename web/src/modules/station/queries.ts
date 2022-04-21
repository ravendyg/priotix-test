import { gql } from "@apollo/client";

export const GET_STATIONS = gql`
query Stations {
  stations {
      id
      name
      metrics {
        volume
        margin
        profit
      }
    }
}`;

export const GET_STATION = gql`
query Station($id: Float!) {
  station(id: $id) {
      id
      name
      metrics {
        volume
        margin
        profit
      }
    }
}`;
