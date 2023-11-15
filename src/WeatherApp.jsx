import { Header } from "./components/Header";
import { Map } from "./components/Map";
import { Search } from "./components/Search";
import "./index.css";

export const WeatherApp = () => {
  return (
    // <div id="app" className="relative h-screen overflow-hidden">
    //   <header className="[grid-area:header] flex">
    //     <Header />
    //   </header>
    //   <div className="[grid-area:map] flex flex-col">
    //     <Map />
    //   </div>
    //   <div className="[grid-area:form] flex">
    //     <Search />
    //   </div>
    // </div>

    <div className="grid grid-cols-1 md:grid-cols-3 relative h-screen md:overflow-hidden">
      <header className="col-span-1 md:col-span-3 row-auto flex">
        <Header />
      </header>
      <div className="col-span-1 md:col-span-1 row-span-2 flex">
        <Search />
      </div>
      <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-2 flex flex-col">
        <Map />
      </div>
    </div>
  );
};
