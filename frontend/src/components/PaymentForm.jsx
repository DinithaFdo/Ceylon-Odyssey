import { useState, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../components/userContext";
import PaymentGateway from "../PaymentGateWay/PaymentGateWay";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Lottie from "lottie-react";
import Payment from "../assets/dinitha/secure-payment.json"; // Your animation JSON file

const PaymentForm = () => {
    const { user } = useContext(UserContext);
    const paymentGatewayRef = useRef(null);

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
            
            if (paymentGatewayRef.current) {
                await paymentGatewayRef.current.initiatePayment();
            } else {
                console.error("Payment gateway is not available.");
            }

        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, server: err.response?.data?.message || "An error occurred" }));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center pt-32 pb-20">
                <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex">
                    <div className="w-1/2 p-6">
                        <form onSubmit={handleSubmit} className="bg-white space-y-4">
                            <h3 className="text-xl font-semibold mb-4 text-center pb-4">Payment Details</h3>

                            {errors.server && <p className="text-red-600">{errors.server}</p>}

                            <div className="flex space-x-2">
                                <div className="w-full">
                                    <input
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="p-3 border border-gray-300 rounded-md w-full"
                                    />
                                    {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
                                </div>
                                <div className="w-full">
                                    <input
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="p-3 border border-gray-300 rounded-md w-full"
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
                                    className="p-3 border border-gray-300 rounded-md w-full"
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
                                    className="p-3 border border-gray-300 rounded-md w-full"
                                />
                                {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                            </div>

                            <div>
                                <input
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 rounded-md w-full"
                                />
                                {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
                            </div>

                            <div>
                                <input
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 rounded-md w-full"
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
                                    className="p-3 border border-gray-300 rounded-md w-full"
                                />
                                {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isAgreed}
                                    onChange={handleCheckboxChange}
                                    className="peer hidden"
                                />
                                <label
                                    htmlFor="terms"
                                    className="flex items-center cursor-pointer text-sm"
                                >
                                    <div className={`w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center mr-2 ${isAgreed ? 'bg-blue-600' : ''}`}>
                                        {isAgreed && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M7 10l3 3 7-7-1.4-1.4L10 11.6 8.4 10 7 10z" />
                                            </svg>
                                        )}
                                    </div>
                                    I agree to the Terms and Conditions
                                </label>
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

                    
                    <Lottie animationData={Payment} loop={true} className="w-1/2 bg-gray-100"/>
                    
                </div>
                
                {paymentInitiated && (
                    <PaymentGateway ref={paymentGatewayRef} amount={amount} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PaymentForm;
