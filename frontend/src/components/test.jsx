import Payment from '../PaymentGateWay/PaymentGateWay'
const PaymentGateway = () => {


    return (
        <button onClick={Payment} className="btn btn-primary">
            Top Up Wallet
        </button>
    );
};

export default PaymentGateway;
