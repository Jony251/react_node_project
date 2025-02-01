import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/MyRoutes/MyRoutes";
import "./App.css";

/**
 * Главный компонент приложения App
 * Этот компонент является корневым и отвечает за:
 * 1. Инициализацию маршрутизации через BrowserRouter
 * 2. Подключение системы маршрутов (MyRoutes)
 * 3. Обеспечение базовой структуры приложения
 * 
 * @returns {React.ReactElement} Возвращает JSX элемент, который содержит структуру приложения
 */
function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
       
        <MyRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
