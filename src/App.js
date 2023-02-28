import money from './img/money.png'
import Currency from './components/Currency';
import { useEffect, useState } from 'react';


function App() {
  
  const [currencyChoice,setcurrencyChoise] = useState([])
  const [fromcurrency,setFromCurrency] = useState('USD')
  const [tocurrency,setToCurrency] = useState('THB')

  const [amount,setAmount] = useState(1)
  const [exChangeRate,setExChangeRate] = useState(0)

  const [checkFormCurrency,setCheckFormCurrency] = useState(true)

  let fromAmount,toAmount

  if(checkFormCurrency){
    fromAmount = amount
    toAmount = (amount*exChangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount/exChangeRate).toFixed(2)
  }
  
  useEffect (() =>{
    const url = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
    fetch(url)
    .then(res => res.json())
    // .then(result => console.log(result.rates[tocurrency]))
    .then (result => {
      setcurrencyChoise(Object.keys(result.rates))
      setExChangeRate(result.rates[tocurrency])
    })
  },[fromcurrency,tocurrency])

  const amountFromCurrency=(e)=> {
    setAmount(e.target.value)
    setCheckFormCurrency(true)
  }
  const amountToCurrency=(e)=> {
    setAmount(e.target.value)
    setCheckFormCurrency(false)
  }



  return (
    <div>
      <img src={money} alt="logo" className='money-img'/>
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <div className='container'>
        <Currency 
        currencyChoice={currencyChoice} 
        selectCurrency={fromcurrency}
        changeCurrency={(e) => setFromCurrency(e.target.value)}
        amount = {fromAmount}
        onChangeAmount = {amountFromCurrency}
        />
        <div className='equal'>=</div>
        <Currency currencyChoice={currencyChoice} 
        selectCurrency={tocurrency}
        changeCurrency={(e) => setToCurrency(e.target.value)}
        amount = {toAmount}
        onChangeAmount = {amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
