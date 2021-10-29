import './App.scss';

import Navbar from './components/Navbar';
import RoomsList from './components/RoomsList';
import Room from './components/Room/index';

function App() {
  return (
    <div className="App">
      <Navbar/>
			<main>
				<RoomsList />
				<Room />
			</main>
    </div>
  );
}

export default App;
