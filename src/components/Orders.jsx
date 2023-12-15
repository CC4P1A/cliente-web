import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { SALES_API } from '../config';
import mock from '../mocks/sales.json';
import Modal from './Modal';

const Orders = () => {
	const [sales, setSales] = useState([]);
    const [details, setDetails] = useState([]);
	const [search, setSearch] = useState('');
	const inputSearch = useRef(null);

	const [show, setShow] = useState(false);
	const handleOpen = (e, sale) => {
		e.preventDefault();
        setDetails(sale);
		setShow(true);
	};
	const handleClose = () => setShow(false);

	useEffect(() => {
		setSales(mock.readAll.ventas);
	}, []);

	const handleSaveSearch = () => {
		setSearch(inputSearch.current.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		fetch(`${SALES_API}/${search}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
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
				</form>
			</header>
			<section className="w-full max-w-screen-lg rounded-md shadow-md p-4 bg-white">
				<table className="table-auto w-full">
					<thead className="bg-slate-100">
						<tr className="text-center rounded-md">
							<th>ID</th>
							<th>RUC</th>
							<th>NAME</th>
							<th>TOTAL</th>
							<th>DETALLES</th>
						</tr>
					</thead>
					<tbody>
						{sales &&
							sales.map((sale, index) => (
								<tr key={index} className="text-center border-b-1 border-gray-200">
									<td className='py-1.5 text-sm'>{sale.id_sales}</td>
									<td className='py-1.5 text-sm'>{sale.ruc}</td>
									<td className='py-1.5 text-sm'>{sale.name}</td>
									<td className='py-1.5 text-sm'>{sale.cost_total}</td>
									<td className="flex items-center justify-center p-2 w-100">
										<FaPlus size={24} className="rounded-md p-1 bg-blue-500 text-white" onClick={(e)=>handleOpen(e, sale.detalle_venta)} />
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<Modal isOpen={show} onClose={handleClose}>
					<table className="table-auto w-full">
						<thead className="bg-slate-100">
							<tr className="text-center rounded-md">
								<th>ID PRODUCT</th>
								<th>NAME PRODUCT</th>
								<th>AMOUNT</th>
                                <th>COST PER UNIT</th>
								<th>TOTAL</th>
								
							</tr>
						</thead>
						<tbody>
                            {details.length > 0 &&
                                details.map((detail, index) => (
                                    <tr key={index} className="text-center border-b-1 border-gray-200">
                                        <td className='py-1.5 text-sm'>{detail.id_prod}</td>
                                        <td className='py-1.5 text-sm'>{detail.name_prod}</td>
                                        <td className='py-1.5 text-sm'>{detail.amount}</td>
                                        <td className='py-1.5 text-sm'>{detail.cost}</td>
                                        <td className='py-1.5 text-sm'>{detail.total}</td>
                                    </tr>
                                ))}
                        </tbody>
					</table>
				</Modal>
			</section>
		</section>
	);
};

export default Orders;
