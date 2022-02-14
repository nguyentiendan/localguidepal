import * as API from "../apis"

export async function GetAllGuide() {
  const res = await API.getAllTourGuides();
  console.log(res)
}

export async function ABC() {

}
