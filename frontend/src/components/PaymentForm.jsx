import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../components/userContext";
import PaymentGateway from "../PaymentGateWay/PaymentGateWay";

const PaymentForm = () => {
    const { user } = useContext(UserContext);

    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: "",
        address: "",
        city: "",
        amount: "",
        currency: "LKR",
        userId: user.userId,
    });

    const [isAgreed, setIsAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        // Clear error message for the specific field being changed
        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleCheckboxChange = () => {
        setIsAgreed((prev) => !prev);
    };

    

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = "First Name is required.";
        if (!formData.lastName) errors.lastName = "Last Name is required.";
        if (!formData.email) errors.email = "Email is required.";
        if (!isValidPhone(formData.phone)) 
            errors.phone = "Phone must start with '07' and be 10 digits long.";
        if (!formData.address) errors.address = "Address is required.";
        if (!formData.city) errors.city = "City is required.";
        if (!isValidAmount(formData.amount)) 
            errors.amount = "Amount must be greater than 100 and less than 10,000.";

        if (!isAgreed) errors.agreed = "You must agree to the terms and conditions.";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^07[0-9]{8}$/; // Must start with 07 and have 10 digits
        return phonePattern.test(phone);
    };

    const isValidAmount = (amount) => {
        return amount > 100 && amount <= 10000; // Amount must be greater than 100 and less than or equal to 10,000
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setValidationErrors({}); // Reset errors on submit

        try {
            const response = await axios.post("http://localhost:5000/api/payment/create-payment", formData);
            setAmount(response.data.amount);
            setPaymentConfirmed(true);
        } catch (err) {
            // Handle any additional errors from the server
            setValidationErrors({ server: err.response?.data?.message || "An error occurred" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full flex flex-col">
                <form onSubmit={handleSubmit} className="bg-white p-4 w-full space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Payment Details</h3>

                    {validationErrors.server && <p className="text-red-600">{validationErrors.server}</p>}

                    <div className="flex space-x-2">
                        <div className="w-full">
                            <input
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`p-3 border ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                            />
                            {validationErrors.firstName && <p className="text-red-600">{validationErrors.firstName}</p>}
                        </div>
                        <div className="w-full">
                            <input
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`p-3 border ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                            />
                            {validationErrors.lastName && <p className="text-red-600">{validationErrors.lastName}</p>}
                        </div>
                    </div>

                    <div className="w-full">
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`p-3 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                        />
                        {validationErrors.email && <p className="text-red-600">{validationErrors.email}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`p-3 border ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                        />
                        {validationErrors.phone && <p className="text-red-600">{validationErrors.phone}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`p-3 border ${validationErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                        />
                        {validationErrors.address && <p className="text-red-600">{validationErrors.address}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className={`p-3 border ${validationErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                        />
                        {validationErrors.city && <p className="text-red-600">{validationErrors.city}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            name="amount"
                            placeholder="Amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`p-3 border ${validationErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md w-full`}
                        />
                        {validationErrors.amount && <p className="text-red-600">{validationErrors.amount}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label className="text-sm">I agree to the Terms and Conditions</label>
                    </div>
                    {validationErrors.agreed && <p className="text-red-600">{validationErrors.agreed}</p>}

                    <button
                        type="submit"
                        className={`w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Confirm Payment"}
                    </button>
                </form>
            </div>

            {paymentConfirmed && (
                <PaymentGateway
                    amount={amount}
                />
            )}
        </div>
    );
};

export default PaymentForm;
