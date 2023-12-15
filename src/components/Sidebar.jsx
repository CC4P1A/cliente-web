import React from 'react';
import { FaShoppingBag, FaBox, FaClipboardList, FaCog } from 'react-icons/fa';

const Sidebar = ({ onClick: event }) => {
	return (
		<aside className="fixed flex flex-col gap-8 py-8 w-72 h-screen bg-slate-800 text-white">
			<div className="flex flex-col items-center gap-2 w-full">
				<img src="./logo.png" alt="logo" className="w-28 h-28 rounded-full bg-white" />
				<h1 className="font-bold text-4xl">Store Shop</h1>
			</div>
			<ul className="flex flex-col mx-4">
				<li
					onClick={() => event(0)}
					className="flex items-center gap-2 p-2 rounded-md text-xl font-bold cursor-pointer select-none hover:bg-slate-600">
					<FaShoppingBag size={20} />
					Store
				</li>
				<li
					onClick={() => event(1)}
					className="flex items-center gap-2 p-2 rounded-md text-xl font-bold cursor-pointer select-none hover:bg-slate-600">
					<FaBox size={20} />
					Inventory
				</li>
				<li
					onClick={() => event(2)}
					className="flex items-center gap-2 p-2 rounded-md text-xl font-bold cursor-pointer select-none hover:bg-slate-600">
					<FaClipboardList size={20} />
					Orders
				</li>
				<li
					onClick={() => event(4)}
					className="flex items-center gap-2 p-2 rounded-md text-xl font-bold cursor-pointer select-none hover:bg-slate-600">
					<FaCog size={20} />
					Settings
				</li>
			</ul>
		</aside>
	);
};

export default Sidebar;
