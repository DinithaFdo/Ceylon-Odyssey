import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../components/userContext";
import PaymentGateway from "../PaymentGateWay/PaymentGateWay";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

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
    const [errors, setErrors] = useState({});
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleCheckboxChange = () => {
        setIsAgreed((prev) => !prev);
        setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        
        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = "Phone number should start with 07 and must have 10 digits.";
        }

        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!isValidAmount(formData.amount)) newErrors.amount = "Amount should be greater than 100 and less than 10,000.";
        if (!isAgreed) newErrors.terms = "You must agree to the terms and conditions.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^07[0-9]{8}$/;
        return phonePattern.test(phone);
    };

    const isValidAmount = (amount) => {
        return amount >= 100 && amount <= 10000;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/payment/create-payment", formData);
            setAmount(response.data.amount);
            setPaymentInitiated(true);
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, server: err.response?.data?.message || "An error occurred" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center pt-32 pb-20">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full flex flex-col">
                    <form onSubmit={handleSubmit} className="bg-white p-4 w-full space-y-4">
                        <h3 className="text-xl font-semibold mb-4 text-center pb-4">Payment Details</h3>

                        {errors.server && <p className="text-red-600">{errors.server}</p>}

                        <div className="flex space-x-2">
                            <div className="w-full">
                                <input
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                                />
                                {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="w-full">
                                <input
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                                />
                                {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="07XXXXXXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                            />
                            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                        </div>

                        <div>
                            <input
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                            />
                            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
                        </div>

                        <div>
                            <input
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                            />
                            {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
                        </div>

                        <div>
                            <input
                                name="amount"
                                placeholder="Amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                className="p-3 border border-gray-300 rounded-md w-full cursor-text"
                            />
                            {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={handleCheckboxChange}
                                className="mr-2 cursor-pointer"
                            />
                            <label className="text-sm">I agree to the Terms and Conditions</label>
                        </div>
                        {errors.terms && <p className="text-red-600 text-sm">{errors.terms}</p>}

                        <button
                            type="submit"
                            className={`w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}

                        >
                            {loading ? "Processing..." : "Confirm Payment"}
                        </button>
                    </form>
                </div>

                {paymentInitiated && (
                    <PaymentGateway amount={amount} paymentInitiated={true}/>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PaymentForm;
