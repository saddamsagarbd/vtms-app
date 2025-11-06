"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";
import PlanFormModal from "./PlanFormModal"

export default function Table() {

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchPlans = async () => {
        try {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/plans/getPlans`,
                { headers: { "Content-Type": "application/json" } }
            );
            setPlans(result.data); // ✅ set only data
        } catch (err) {
            console.error("Error fetching plans:", err);
            toast.error("Failed to load plans");
        } finally {
            setLoading(false);
        }
    };

    const fetchPlan = async (id) => {
        try{
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/plans/getPlanById/${id}`,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(result.data.data);

            if(result.data.success){
                setModalOpen(result.data.data)
            }

        }catch(err){
            console.error("Error fetching plans:", err);
            toast.error("Failed to load plans");
        }finally{
            setLoading(false);
        }

    };

    const handleDelete = async (planId, fetchPlans) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/plans/delete/${planId}`);
                Swal.fire(
                    'Deleted!',
                    'The plan has been deleted.',
                    'success'
                );
                if (fetchPlans) fetchPlans(); // callback to refresh table
            } catch (err) {
                console.error(err);
                Swal.fire(
                    'Error!',
                    'Failed to delete the plan.',
                    'error'
                );
            }
        }

    }

    useEffect(() => {
        fetchPlans();
    }, []);

    // Columns for DataTable
    const columns = [
        { name: "SL#", selector: (_, index) => index + 1, sortable: true },
        { name: "Title", selector: row => row.name, sortable: true },
        { name: "Details", selector: row => row.details, sortable: false },
        { name: "Price (BDT)", selector: row => (row.price === 0 ? "Free" : row.price), sortable: true },
        {
        name: "Action",
        cell: row => (
            <div className="flex items-center justify-between">
                <FaEdit className="w-4 h-4 text-blue-600" onClick={() => fetchPlan(row.id)} />
                <FaTrash className="w-4 h-4 text-red-600" onClick={() => handleDelete(row.id, fetchPlans)} />
            </div>
        ),
        },
    ];

    return (
        <div className="table-wrapper">
            <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-semibold">Plans</h2>
                <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen({})} // empty object for new plan
                >
                Add Plan
                </button>
            </div>
            <DataTable
                columns={columns}
                data={plans}
                progressPending={loading}
                pagination
                highlightOnHover
                defaultSortFieldId={1}
            />
            {/* <table className="w-full table-auto">
                <thead className="bg-gray-400 text-left">
                    <tr>
                        <th className="px-2 py-2 text-white">SL#</th>
                        <th className="px-2 py-2 text-white">Title</th>
                        <th className="px-2 py-2 text-white">Details</th>
                        <th className="px-2 py-2 text-white">Price (BDT)</th>
                        <th className="px-2 py-2 text-white">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { loading && <tr className="text-red-500">
                            <td className="px-2 py-2 text-[#484A4F] col-span-5"><p>Loading plans...</p></td>
                        </tr>}
                    { error && <tr className="text-red-500">
                            <td className="px-2 py-2 text-[#484A4F] col-span-5">{error}</td>
                        </tr> }
                    {
                        plans.map((plan, index) => {
                            return (
                                <tr key={plan.id} className="border-b-1 border-[#eee]">
                                    <td className="px-2 py-2 text-[#484A4F]" data-label="SL#">{++index}</td>
                                    <td className="px-2 py-2 text-[#484A4F]" data-label="Title">{plan.name}</td>
                                    <td className="px-2 py-2 text-[#484A4F]" data-label="Details">{plan.details}</td>
                                    <td className="px-2 py-2 text-[#484A4F]" data-label="Price (BDT)">{plan.price == 0 ?"Free":plan.price}</td>
                                    <td className="px-2 py-2 text-[#484A4F]" data-label="Action">
                                        <div className="flex">
                                            <FaEdit className="w-4 h-4 text-blue-400" />
                                            <FaTrash className="w-4 h-4 text-red-500"/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */}
            {/* Modal */}
            {modalOpen && (
                <PlanFormModal
                    plan={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={fetchPlans} // refresh table after save
                />
            )}
        </div>
    );
}