import axios from "../api/axios";
import { Direction } from "../models/direction.model";

export async function updateDirections(
  directionId: string,
  direction: Direction
) {
  try {
    let raw = await axios.put(`/directions/${directionId}`, direction);
    let data = raw.data;
    if (data.length == 0) return [];
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteDirections(directionId: string) {
  try {
    let raw = await axios.delete(`/directions/${directionId}`);
    let data = raw.data;
    directionId;
    console.log(directionId + " +++++++ +++++ ++++++ ++++ +++++++");
    console.log(data);

    return data;
  } catch (error) {
    return error;
  }
}
