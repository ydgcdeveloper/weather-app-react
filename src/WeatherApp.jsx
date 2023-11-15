import { Header } from "./components/Header";
import { Map } from "./components/Map";
import { Search } from "./components/Search";
import "./index.css";

export const WeatherApp = () => {
  return (
    <div id="app" className="relative h-screen overflow-hidden">
      <header className="[grid-area:header] flex">
        <Header />
      </header>
      <div className="[grid-area:map] flex flex-col">
        <Map />
      </div>
      <div className="[grid-area:form] flex">
        <Search />
      </div>
    </div>
  );
};
