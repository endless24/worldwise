import { useSearchParams } from "react-router-dom";

//getting position from the url when the map is clicked on
export function useURLPosition() {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");

  const lng = searchParams.get("lng");

  return [lat, lng];
}
