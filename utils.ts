import * as Location from "expo-location";
import { GameStateStorage, GPSLocation } from "./types";

export function getInitialGameInfo(): GameStateStorage {
  return {
    resources: {
      food: 1000,
      gold: 1000,
      stone: 1000,
      wood: 1000,
    },
    buildings: {
      barracks: 0,
      farm: 0,
      goldMine: 0,
      lumberMill: 0,
      quarry: 0,
      siege: 0,
      stable: 0,
    },
    military: {
      archer: 0,
      catapult: 0,
      cavalry: 0,
      swordsman: 0,
    },
  };
}

export async function getLocation(): Promise<Location.LocationObjectCoords | undefined> {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("Location permission denied");
    return undefined;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const { latitude, longitude } = location.coords;

  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  return location.coords;
}

export function distanceBetween(
  a: GPSLocation,
  b: GPSLocation
): number {
  const R = 6371; // Earth radius in km

  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;

  const deltaLat =
    ((b.latitude - a.latitude) * Math.PI) / 180;

  const deltaLon =
    ((b.longitude - a.longitude) * Math.PI) / 180;

  const x =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
    Math.cos(lat2) *
    Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

  return R * c;
}