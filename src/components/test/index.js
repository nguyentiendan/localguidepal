import axios from "axios";
import useSWR from "swr";

export default function Test()  {
  const api = "http://localhost:8080/api/v1/interest/getInterest";
  const fetcher = async(url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(api, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  console.log(data)
  return (
    <>
      {data?.map((item) => (
        <div>
          {item}
        </div>
      ))}
    </>
  )
}
