import React, { useEffect, useState } from 'react'
import CustomerService from '../../services/CustomerService';
import { useSelector } from 'react-redux';
const History = () => {

    const { userDetails, accessToken, operatorName } = useSelector(state => state.global);

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;

    const fetchPayment = async () => {
        try {
            const res = await CustomerService.getPayments(userDetails.userName, accessToken);
            const payment = res.data;
            console.log(payment);
            setData(payment)
        } catch (error) {
            console.error("Error fetching recharges:", error);
        }
    };
    useEffect(() => {
        fetchPayment();
    }, [currentPage]);


    // Calculate indexes for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPayment = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        fetchPayment();
    }, []);


    return (
        <>
            {
                currentPayment.length === 0 ? <div className='h-screen'><h1 className='m-10 text-2xl text-center pt-52'>No Payment records Found ! Go and recharge</h1></div> : (<section className="container px-4 mx-auto h-screen">
                    <div className="flex flex-col mt-[100px]">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                    <button className="flex items-center gap-x-3 focus:outline-none">
                                                        <span>Mode Of Payment</span>
                                                    </button>
                                                </th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                                    Data
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Status</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Operator</th>
                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Details</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                            {currentPayment.map((payment) => {
                                                return (<tr key={payment.rechargeId}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-gray-800">{payment.modeOfPayment}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-100 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                            ₹{payment.totalAmount}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div>
                                                            <h2 className="">{payment.paymentDate}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <h2 className="flex items-center justify-center -mx-1  text-blue-600 bg-blue-100 border-2 border-white rounded-full text-md">{payment.status}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-sm whitespace-nowrap">
                                                        <h2 className="flex items-center justify-center rounded-full">{operatorName}</h2>
                                                    </td>
                                                </tr>);
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                            <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>
                                    previous
                                </span>
                            </a>
                            <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                <span>
                                    Next
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>)
            }
        </>
    )
}

export default History
