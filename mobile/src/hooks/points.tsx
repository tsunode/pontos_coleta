import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

export interface Point {
  id: string;
  name: string;
  address: {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    latitude: string;
    longitude: string;
    complement: string;
  };
}

interface PointContext {
  points: Point[];
  pointsFavorite: Point[];
  addPoint(point: Point): void;
  addPointToFavorite(point: Point): void;
  addAnyPoints(points: Point[]): void;
  removePointToFavorite(points: Point): void;
}

const PointContext = createContext<PointContext | null>(null);

const PointsProvider: React.FC = ({ children }) => {
  const [pointsFavorite, setPointsFavorite] = useState<Point[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    async function loadPoints(): Promise<void> {
      const pointsFavoriteLoaded = await AsyncStorage.getItem(
        '@PontoColeta:pointsFavorite',
      );

      if (pointsFavoriteLoaded) {
        setPointsFavorite(JSON.parse(pointsFavoriteLoaded));
      }
    }

    loadPoints();
  }, []);

  const removePointToFavorite = useCallback(
    async pointFavorite => {
      const updatedPoint = pointsFavorite.filter(
        searchPoint => searchPoint.id !== pointFavorite.id,
      );

      const newPointsFavorite = [...updatedPoint];

      await AsyncStorage.setItem(
        '@PontoColeta:pointsFavorite',
        JSON.stringify(newPointsFavorite),
      );

      setPointsFavorite(newPointsFavorite);
    },
    [pointsFavorite],
  );

  const addPointToFavorite = useCallback(
    async pointFavorite => {
      const updatedPoint = pointsFavorite.filter(
        searchPoint => searchPoint.id !== pointFavorite.id,
      );

      const newPointsFavorite = [...updatedPoint, pointFavorite];

      await AsyncStorage.setItem(
        '@PontoColeta:pointsFavorite',
        JSON.stringify(newPointsFavorite),
      );

      setPointsFavorite(newPointsFavorite);
    },
    [pointsFavorite],
  );

  const addPoint = useCallback(
    async point => {
      const updatedPoint = points.filter(
        searchPoint => searchPoint.id !== point.id,
      );

      setPoints([...updatedPoint, point]);

      const pointFound = pointsFavorite.find(
        pointFind => pointFind.id === point.id,
      );

      if (pointFound) {
        addPointToFavorite(point);
      }
    },
    [points, pointsFavorite, addPointToFavorite],
  );

  const addAnyPoints = useCallback(anyPoints => {
    setPoints([...anyPoints]);
  }, []);

  const value = React.useMemo(
    () => ({
      points,
      pointsFavorite,
      addPoint,
      addPointToFavorite,
      addAnyPoints,
      removePointToFavorite,
    }),
    [
      points,
      pointsFavorite,
      addPoint,
      addPointToFavorite,
      addAnyPoints,
      removePointToFavorite,
    ],
  );

  return (
    <PointContext.Provider value={value}>{children}</PointContext.Provider>
  );
};

function usePoint(): PointContext {
  const context = useContext(PointContext);

  if (!context) {
    throw new Error(`usePoint must be used within a PointsProvider`);
  }

  return context;
}

export { PointsProvider, usePoint };
