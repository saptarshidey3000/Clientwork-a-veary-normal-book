// App.jsx
import Book from "./components/Book";
import { EarProvider } from "./components/EarContext";

function App() {
  return (
    <EarProvider>
      <Book />
    </EarProvider>
  );
}

export default App;