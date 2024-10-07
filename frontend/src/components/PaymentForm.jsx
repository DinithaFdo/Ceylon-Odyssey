import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../components/userContext";
import toast from "react-hot-toast";
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
    const [error, setError] = useState("");
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setIsAgreed((prev) => !prev);
    };

    const isFormValid = () => {
        return (
            formData.firstName &&
            formData.lastName &&
            formData.email &&
            isValidPhone(formData.phone) &&
            formData.address &&
            formData.city &&
            isValidAmount(formData.amount) &&
            isAgreed
        );
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^[0-9]{10,}$/;
        return phonePattern.test(phone);
    };

    const isValidAmount = (amount) => {
        return amount >= 100 && amount <= 10000;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            showErrorMessages();
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/payment/create-payment", formData);
            setAmount(response.data.amount); 
            setPaymentConfirmed(true);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            toast.error(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const showErrorMessages = () => {
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields.");
        }
        if (!isValidPhone(formData.phone)) {
            toast.error("Please enter a valid phone number.");
        }
        if (!formData.address || !formData.city) {
            toast.error("Address and City are required.");
        }
        if (!isValidAmount(formData.amount)) {
            toast.error("Amount must be greater than 100 and less than 10,000.");
        }
        if (!isAgreed) {
            toast.error("You must agree to the terms and conditions.");
        }
    };

    return (
        <div>
            <Navbar />
        <div className="flex flex-col items-center justify-center pt-32 pb-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full flex flex-col">
                <form onSubmit={handleSubmit} className="bg-white p-4 w-full space-y-4">
                    <h3 className="text-xl font-semibold mb-4 text-center pb-4">Payment Details</h3>
                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex space-x-2">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md w-full"
                            required
                        />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        required
                    />

                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        required
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        required
                    />
                    <input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        required
                    />
                    <input
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md w-full"
                        required
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={handleCheckboxChange}
                            required
                            className="mr-2"
                        />
                        <label className="text-sm">I agree to the Terms and Conditions</label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!isFormValid() || loading}
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
        <Footer />
        </div>
    );
};

export default PaymentForm;