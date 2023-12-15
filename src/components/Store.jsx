import React, { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SALES_API, PRODUCTS_API } from '../config';

const Store = () => {
	// productos
	const [products, setProducts] = useState([]);

	// busqueda
	const [search, setSearch] = useState('');
	const inputSearch = useRef(null);

	// obtener READALL
	useEffect(() => {
		fetch(PRODUCTS_API)
			.then((response) => response.json())
			.then((data) => setProducts(data.products))
			.catch((error) => console.log(error));
	}, []);

	const handleSaveSearch = () => {
		setSearch(inputSearch.current.value);
	};

	// enviar ID  y obtener READ
	const handleSearch = (e) => {
		e.preventDefault();
		fetch(`${PRODUCTS_API}/${search}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.products);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// const handleSell = (product) => {
	// 	fetch(`${SALES_API}`, {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			id_sales: 0,
	// 			ruc: '123456789',
	// 			name: 'John Doe',
	// 			cost_total: product.price,
	// 			detalle_venta: [
	// 				{
	// 					id_prod: product.id,
	// 					name_prod: product.name,
	// 					amount: 1,
	// 					total: product.price,
	// 					cost: product.price,
	// 				},
	// 			],
	// 		}),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	});
	// };

	return (
		<section className="flex flex-col gap-8 items-center justify-center">
			<header className="w-full max-w-screen-lg p-4 rounded-md shadow-md bg-white">
				<form className="flex gap-4 w-full">
					<input
						type="text"
						ref={inputSearch}
						onChange={handleSaveSearch}
						className="flex-1 rounded-md p-2 border border-gray-300 focus:outline-2 focus:outline-purple-500"
						placeholder="search product..."
					/>
					<button
						className="flex gap-2 items-center px-4 py-2 rounded-md text-white bg-purple-500"
						onClick={(e) => handleSearch(e)}>
						<FaSearch size={20} />
						Search
					</button>
				</form>
			</header>
			<section className="max-w-screen-lg w-full ">
				<ul className="grid grid-cols-3 gap-4 ">
					{products.length > 0 &&
						products.map((product) => (
							<li key={product.id} className="flex flex-col gap-4 p-4 rounded-md shadow-md bg-white">
								<img src={product.img} alt={product.name} className="h-64 w-auto object-contain" />
								<div className="flex flex-col gap-2">
									<h1 className="text-xl font-bold text-center line-clamp-1">{product.name}</h1>
									<p className="text-sm line-clamp-2">{product.desc}</p>
									<p className="text-xl font-bold text-center text-slate-800">${product.price}</p>
									<button className="px-4 py-2 rounded-md text-white bg-purple-500">
										Add to Cart
									</button>
								</div>
							</li>
						))}
				</ul>
			</section>
		</section>
	);
};

export default Store;
