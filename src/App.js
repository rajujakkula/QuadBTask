import "./App.css";
import { Movies } from "./components/Movies";
import { MovieOverView } from "./components/MovieOverView";
import { useEffect, useState } from "react";
function App() {
  const [showMovie, setShowMovie] = useState(false);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState();

  useEffect(() => {
    fetch(" https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        setData(item);
      });
  }, []);

  const upDateData = (newData) => {
    setShowMovie(true);
    console.log(newData);
    setNewData(newData);
  };
  return (
    <div className="App">
      {showMovie || <Movies upDateData={upDateData} data={data} />}
      {showMovie && (
        <MovieOverView newData={newData} setShowMovie={setShowMovie} />
      )}
    </div>
  );
}

export default App;
