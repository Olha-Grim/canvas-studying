import ErrorBoundary from "./components/ErrorBoundary";
import { Canvas } from "./modules/canvas";

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Canvas />
      </div>
    </ErrorBoundary>
  );
}

export default App;
