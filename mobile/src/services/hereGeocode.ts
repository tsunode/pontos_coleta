import axios, { AxiosResponse } from 'axios';

import { API_HERE_KEY } from 'react-native-dotenv';
import { Address } from '../components/PointItem/styles';

interface Address {
  street: string;
  number: string;
  city: string;
}

interface Geocode {
  Response: {
    View: {
      Result: {
        MatchLevel: string;
        Location: {
          MapView: {
            TopLeft: {
              Latitude: string;
              Longitude: string;
            };
          };
          Address: {
            State: string;
            PostalCode: string;
          };
        };
      }[];
    }[];
  };
}

export async function getGeocode(
  address: Address,
): Promise<AxiosResponse<Geocode>> {
  const response = await axios.get<Geocode>(
    'https://geocoder.ls.hereapi.com/6.2/geocode.json',
    {
      params: {
        apiKey: API_HERE_KEY,
        housenumber: address.number,
        street: address.street,
        city: address.city,
        country: 'brasil',
        gen: 9,
      },
    },
  );

  return response;
}
