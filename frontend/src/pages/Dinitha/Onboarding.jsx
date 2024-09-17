import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [tripPreference, setTripPreference] = useState('');
  const [days, setDays] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !tripPreference) {
      Swal.fire('Please select a trip preference!');
      return;
    }
    if (step === 2 && !days) {
      Swal.fire('Please select the number of days!');
      return;
    }
    if (step === 3) {
      // Fetch and display tour packages based on user preferences
      // This is where you would integrate with your backend or API
      Swal.fire({
        title: 'Success!',
        text: 'You will now see tour packages based on your preferences.',
        icon: 'success',
      }).then(() => {
        navigate('/tour-packages');
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Onboarding</h2>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-center">Where is the most suitable category for you?</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <img 
                  src="https://www.thetimes.com/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fcff61a7f-8683-41ed-b19a-5539a8914edd.jpg?crop=2560%2C1706%2C0%2C0" 
                  alt="Beach" 
                  className={`w-full h-60 object-cover rounded-lg ${tripPreference === 'beach' ? 'border-2 border-blue-600' : ''}`}
                  onClick={() => setTripPreference('beach')}
                />
                {tripPreference === 'beach' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <span className="text-white text-xl">Adventure</span>
                  </div>
                )}
                <p className="mt-2 text-center">Adventure</p>
              </div>
              <div className="relative">
                <img 
                  src="https://www.lovesrilanka.org/wp-content/uploads/2020/06/LSL_B2_Sinharaja-Rainforest_800x520.jpg" 
                  alt="Forest" 
                  className={`w-full h-60 object-cover rounded-lg ${tripPreference === 'forest' ? 'border-2 border-blue-600' : ''}`}
                  onClick={() => setTripPreference('forest')}
                />
                {tripPreference === 'forest' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <span className="text-white text-xl">Wild Life and Nature</span>
                  </div>
                )}
                <p className="mt-2 text-center">Wild Life and Nature</p>
              </div>
              <div className="relative">
                <img 
                  src="https://cdn.i.haymarketmedia.asia/?n=campaign-asia%2Fcontent%2Fshutterstock_691606891.jpg&h=570&w=855&q=100&v=20170226&c=1" 
                  alt="Town" 
                  className={`w-full h-60 object-cover rounded-lg ${tripPreference === 'town' ? 'border-2 border-blue-600' : ''}`}
                  onClick={() => setTripPreference('town')}
                />
                {tripPreference === 'town' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <span className="text-white text-xl">Cultural</span>
                  </div>
                )}
                <p className="mt-2 text-center">Cultural</p>
              </div>
              <div className="relative">
                <img 
                  src="https://www.introtravel.com/media/images/DRG_0971-min.width-800.jpg" 
                  alt="Waterfall" 
                  className={`w-full h-60 object-cover rounded-lg ${tripPreference === 'waterfall' ? 'border-2 border-blue-600' : ''}`}
                  onClick={() => setTripPreference('waterfall')}
                />
                {tripPreference === 'waterfall' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <span className="text-white text-xl">Iconic</span>
                  </div>
                )}
                <p className="mt-2 text-center">Iconic</p>
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-center">How many days do you want to trip?</h3>
            <div className="flex flex-col items-center">
              <label className="flex items-center mb-2">
                <input 
                  type="radio" 
                  name="days" 
                  value="1-3" 
                  checked={days === '1-3'}
                  onChange={(e) => setDays(e.target.value)}
                  className="mr-2"
                />
                1-3 days
              </label>
              <label className="flex items-center mb-2">
                <input 
                  type="radio" 
                  name="days" 
                  value="4-7" 
                  checked={days === '4-7'}
                  onChange={(e) => setDays(e.target.value)}
                  className="mr-2"
                />
                4-7 days
              </label>
              <label className="flex items-center mb-2">
                <input 
                  type="radio" 
                  name="days" 
                  value="8+" 
                  checked={days === '8+'}
                  onChange={(e) => setDays(e.target.value)}
                  className="mr-2"
                />
                8+ days
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-center">Your Preferences:</h3>
            <p className="mb-4 text-center">Trip Preference: {tripPreference}</p>
            <p className="mb-4 text-center">Number of Days: {days}</p>
            <p className="text-gray-500 text-center">Loading tour packages based on your preferences...</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button 
              onClick={handleBack} 
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {step === 3 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
