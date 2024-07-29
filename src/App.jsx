import { useState } from 'react';
import useCurrencyInfo from './hooks/useCurrencyinfo.js';
import { InputBox } from './components';

function App() {
  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div>
   
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat p-5"
        style={{
          backgroundImage:`url('https://images.pexels.com/photos/6837852/pexels-photo-6837852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      >  
        <div className="w-full  ">
        <h1 className=' flex justify-center text-2xl text-white 
   py-5'>Currency Convertor</h1>
          <div className="w-full bg-white max-w-md mx-auto p-10 py-10 text-lg shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1 p-2">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => { 
                    setFrom(currency);
                  }}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/4 top-2/4  translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-500 text-white px-2 py-0.5 hover:bg-blue-600"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => {
                    setTo(currency);
                  }}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
