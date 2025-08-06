// App.jsx
import { useEffect, useState } from "react";
import Book from "./components/Book";
import { EarProvider } from "./components/EarContext";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Simulate loading
  }, []);

  return (

    <>
      <EarProvider>
        <Book />
      </EarProvider>
      {loading ? <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gradient-to-br from-pink-200 via-white to-pink-100 absolute z-10 top-0" > <Loader /> </div>
        : <></>}

    </>

  );
}

export default App;