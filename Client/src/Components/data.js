

// [
  // {
  //   css: "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg",
  //   height: 500,
  // },
//   {
//     css: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
//     height: 500,
//   },
//   {
//     css: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg",
//     height: 500,
//   },
//   {
//     css: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg",
//     height: 500,
//   },
//   {
//     css: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg",
//     height: 500,
//   },
//   {
//     css: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg",
//     height: 500,
//   },
//   {
//     css: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg",
//     height: 500,
//   },
// ];

// const fetchImages = async () => {
//   const response = await axios.get("https://ph-assignment12-server.vercel.app/images");
//   return response.data;
// };
// const dataImg = () => {
//   const { data } = useQuery({ queryKey: [], queryFn: fetchImages });
//   console.log(data);
// }

// fetchImages();
let a = [];
let b = [];

// Function to fetch data and return a promise
const fetchData = async () => {
  const response = await fetch("https://ph-assignment12-server.vercel.app/images");
  const data = await response.json();
  return data;
}

// Function to get random elements from an array
function rand(arr, c) {
  let len = arr.length;
  let result = [];
  for (let i = 0; i < c; i++) {
    let randomIndex = Math.floor(Math.random() * len);
    result.push(arr[randomIndex]);
  }
  return result;
}

function convertToObjects(arr, height) {
  return arr.map(url => ({ css: url, height: height }));
}

export const getRandomImages = async () => {
  b = await fetchData();
  a = rand(b, 6);
  const convertedImages = convertToObjects(a, 500);
  return convertedImages;
}
export default getRandomImages;