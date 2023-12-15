import React from 'react';
import Sidebar from './components/Sidebar';
import Store from './components/Store';
import Inventory from './components/Inventory';
import Orders from './components/Orders';


const App = () => {

    const [selected, setSelected] = React.useState(0);

    const handleSelect = (index) => {
        setSelected(index);
    }

    const RenderComponent = ({ index }) => {
        switch (index) {
            case 0:
                return <Store />;
            case 1:
                return <Inventory />;
            case 2:
                return <Orders />
                ;
            default:
                return <h1>Home</h1>;
        }
    }

	return (
    <main className='flex min-h-screen bg-gray-100'>
        <Sidebar onClick={handleSelect} />
        <main className='ml-72 p-8 w-full'>
            <RenderComponent index={selected} />
        </main>
    </main>
    );
};

export default App;