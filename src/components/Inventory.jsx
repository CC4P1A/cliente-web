import React, { useEffect, useState, useRef } from 'react';
import Modal from './Modal';
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { PRODUCTS_API } from '../config';

const Inventory = () => {
	const [products, setProducts] = useState([]);

	const [search, setSearch] = useState('');
	const inputSearch = useRef(null);

	const [show, setShow] = useState(false);
	const handleOpen = (e) => {
		e.preventDefault();
		setShow(true);
	};
	const handleClose = () => setShow(false);

    // obtener READALL
	useEffect(() => {
		fetch(PRODUCTS_API)
			.then((response) => response.json())
			.then((data) => setProducts(data.products))
			.catch((error) => console.log(error));
	}, []);


    // enviar UPDATE
	const handleUpdate = (product) => {
		// TODO - implement update
        console.log(product);
	};

    // enviar DELETE
	const handleRemove = (id) => {
		fetch(`${PRODUCTS_API}/${id}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
	};

    // enviar CREATE
	const handleCreate = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const desc = e.target.desc.value;
		const price = e.target.price.value;
		const quant = e.target.quant.value;
		const img = e.target.img.value;
		fetch(PRODUCTS_API, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				desc: desc,
				price: price,
				quant: quant,
				img: img,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
		setShow(false);
	};

	const handleSaveSearch = () => {
		setSearch(inputSearch.current.value);
	};

    // enviar ID obtener READ
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
					<button
						onClick={(e) => handleOpen(e)}
						className="flex gap-2 items-center px-4 py-2 rounded-md text-white bg-purple-500">
						<FaPlus size={20} />
						New
					</button>
				</form>
			</header>
			<section className="w-full max-w-screen-lg rounded-md shadow-md bg-white">
				<ul className="w-full p-4">
					{products.length > 0 &&
						products.map((product) => (
							<li key={product.id} className="w-full">
								<div className="flex items-center gap-4 p-2 rounded-md cursor-pointer select-none hover:bg-gray-100">
									<div className='text-sm font-bold' >{product.id}</div>
									<img
										src={product.img}
										alt={product.name}
										className="rounded-md w-16 h-16 object-contain"
									/>
									<div className="grow w-full max-w-[500px]">
										<h1 className="font-bold">{product.name}</h1>
										<p className="text-sm">{product.desc}</p>
									</div>
									<p className="text-base text-center w-12">{product.quant} u.</p>
									<p className="text-base text-center w-16">S/.{product.price}</p>
									<div className="grow flex justify-end w-16 gap-2 items-center">
										<button
											className="p-2 rounded-md bg-blue-500 text-white"
											onClick={() => handleUpdate(product)}>
											<BsPencilFill size={16} />
										</button>
										<button
											className="p-2 rounded-md bg-red-500 text-white"
											onClick={() => handleRemove(product.id)}>
											<BsFillTrashFill size={16} />
										</button>
									</div>
								</div>
								<div className="w-full h-0.5 my-1 bg-gray-200"></div>
							</li>
						))}
				</ul>
			</section>
			<Modal isOpen={show} onClose={handleClose}>
				<form className="flex flex-wrap gap-x-0 gap-y-4" onSubmit={(e) => handleCreate(e)}>
					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="name" className="text-sm">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="rounded-md p-2 border border-gray-300 focus:outline-2 focus:outline-purple-500"
							placeholder="name"
						/>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="desc" className="text-sm">
							Description
						</label>
						<textarea
							id="desc"
							className="resize-none h-32 rounded-md p-2 border border-gray-300 focus:outline-2 focus:outline-purple-500"
							placeholder="description"
						/>
					</div>
					<div className="flex flex-col gap-2 w-1/2 pr-2">
						<label htmlFor="price" className="text-sm">
							Price
						</label>
						<input
							type="number"
							id="price"
							className="rounded-md p-2 border border-gray-300 focus:outline-2 focus:outline-purple-500"
							placeholder="price"
						/>
					</div>
					<div className="flex flex-col gap-2 w-1/2 pl-2">
						<label htmlFor="quant" className="text-sm">
							Quantity
						</label>
						<input
							type="number"
							id="quant"
							className="rounded-md p-2 border border-gray-300 focus:outline-2 focus:outline-purple-500"
							placeholder="quantity"
						/>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="img" className="text-sm">
							Image
						</label>
						<input
							type="text"
							id="img"
							className="rounded-md p-2 border border-gray-300 focus:outline-2 focus:outline-purple-500"
							placeholder="https://image.com/..."
						/>
					</div>
					<button className="px-4 py-2 rounded-md w-full text-white bg-purple-500">Create New Product</button>
				</form>
			</Modal>
		</section>
	);
};

export default Inventory;

// useEffect(() => {
// 	fetch('https://fakestoreapi.com/products')
// 		.then((res) => res.json())
// 		.then((data) => {
// 			const products = data
// 				.map((product) => ({
// 					id: product.id,
// 					name: product.title,
// 					desc: product.description,
// 					price: product.price,
// 					quant: 2,
// 					img: product.image,
// 				}))
// 				.slice(0, 9);
// 			setProducts(products);
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 		});
// }, []);
