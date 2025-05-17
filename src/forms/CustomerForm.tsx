import {type ChangeEvent, type FormEvent, useState} from "react";
import type {Customer} from "../types/Customer";

export interface CustomerFormData {
    name: string;
    address: string;
    dateOfBirth: string;
}

const initialForm: CustomerFormData = {
    name: "",
    address: "",
    dateOfBirth: "",
};

interface CustomerFormProps {
    onSubmit: (customer: Customer) => void
    onCancel: ()=> void
    initialValues?: Customer
}

const CustomerForm = ({onSubmit, onCancel, initialValues}: CustomerFormProps) => {
    const initialFormData: CustomerFormData = initialValues ? {
        name: initialValues.name,
        dateOfBirth: initialValues.dateOfBirth,
        address: initialValues.address
    } : initialForm;

    const [form, setForm] = useState<CustomerFormData>(initialFormData);

    const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});

    // Basic validation
    const validate = (): Partial<Record<keyof CustomerFormData, string>> => {
        const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.dateOfBirth.trim()) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dateOfBirth)) {
            newErrors.dateOfBirth = "Use format YYYY-MM-DD";
        }
        return newErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onSubmit({
                name: form.name,
                dateOfBirth: form.dateOfBirth,
                address: form.address,
                id: initialValues ? initialValues.id : Date.now()
            })
            setForm(initialForm);
            setErrors({});
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-lg shadow p-6 max-w-lg mx-auto"
            >
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter customer name"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none ${
                            errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter address"
                    />
                    {errors.address && (
                        <div className="text-red-500 text-sm mt-1">{errors.address}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">
                        Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="dateOfBirth"
                        type="date"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded focus:outline-none ${
                            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="YYYY-MM-DD"
                    />
                    {errors.dateOfBirth && (
                        <div className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
                >
                    {initialValues ? "Edit Customer" : "Add Customer"}
                </button>

            </form>
            <button
                onClick={onCancel}
                className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
            >
                Cancel
            </button>
        </div>
    );
};

export default CustomerForm;
