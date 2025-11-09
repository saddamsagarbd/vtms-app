"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";
import CompanyFormModal from "./CompanyFormModal"

export default function CompanyTable() {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchCompanies = async () => {
        try {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/companies`,
                { headers: { "Content-Type": "application/json" } }
            );
            setCompanies(result.data); // ✅ set only data
        } catch (err) {
            console.error("Error fetching companies:", err);
            toast.error("Failed to load companies");
        } finally {
            setLoading(false);
        }
    };

    const fetchCompany = async (id) => {
        try{
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/companies/getCompanyById/${id}`,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(result.data.data);

            if(result.data.success){
                setModalOpen(result.data.data)
            }

        }catch(err){
            console.error("Error fetching companies:", err);
            toast.error("Failed to load companies");
        }finally{
            setLoading(false);
        }

    };

    const handleDelete = async (companyId, fetchCompanies) => {
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
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/companies/delete/${companyId}`);
                Swal.fire(
                    'Deleted!',
                    'The company has been deleted.',
                    'success'
                );
                if (fetchCompanies) fetchCompanies(); // callback to refresh table
            } catch (err) {
                console.error(err);
                Swal.fire(
                    'Error!',
                    'Failed to delete the company.',
                    'error'
                );
            }
        }

    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Columns for DataTable
    const columns = [
        { name: "SL#", selector: (_, index) => index + 1, sortable: true },
        { name: "Company Name", selector: row => row.name, sortable: true },
        { name: "Email", selector: row => row.email, sortable: false },
        { name: "Phone", selector: row => row.phone, sortable: false },
        { name: "Address", selector: row => row.address1, sortable: false },
        {
            name: "Action",
            cell: row => (
                <div className="flex items-center justify-between">
                    <FaEdit className="w-4 h-4 text-blue-600" onClick={() => fetchCompany(row.id)} />
                    <FaTrash className="w-4 h-4 text-red-600" onClick={() => handleDelete(row.id, fetchCompanies)} />
                </div>
            ),
        },
    ];

    return (
        <div className="table-wrapper">
            <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-semibold">Companies</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setModalOpen({})} // empty object for new plan
                >
                Add Company
                </button>
            </div>
            <DataTable
                columns={columns}
                data={companies}
                progressPending={loading}
                pagination
                highlightOnHover
                defaultSortFieldId={1}
            />
            {/* Modal */}
            {modalOpen && (
                <CompanyFormModal
                    company={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={fetchCompanies} // refresh table after save
                />
            )}
        </div>
    );
}