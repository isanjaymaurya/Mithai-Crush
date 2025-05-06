import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">Mithai Crush</h1>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
      </nav>
    </header>
  );
};

export default Header;
