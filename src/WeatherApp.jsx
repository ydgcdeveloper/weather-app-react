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

    <div className="grid md:grid-cols-3 relative h-screen md:overflow-hidden">
      <header className="col-span-1 md:col-span-3 flex md:h-[7vh]">
        <Header />
      </header>
      <div className="col-span-1 md:col-span-1 row-span-6 flex md:h-[93vh]">
        <Search />
      </div>
      <div className="col-span-1 md:col-span-2 row-span-6 flex flex-col md:h-[93vh]">
        <Map />
      </div>
    </div>
  );
};
