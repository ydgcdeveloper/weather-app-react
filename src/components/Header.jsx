import '../styles/header.css';
const appName = 'Weather App';

export const Header = () => {
  return (
    <header className="header">
      <h1 className="font-sans m-auto text-3xl">{appName}</h1>
    </header>
  );
};
