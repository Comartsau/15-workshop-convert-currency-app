

import "./Currency.css"

function Currency(props) {
  console.log(props)
  const {currencyChoice, selectCurrency, changeCurrency,amount,onChangeAmount} = props

  return (
    <div className='currency'>
        <select value={selectCurrency} onChange={changeCurrency}>
          {currencyChoice.map((choise,key) => 
            <option key={key} value={choise} >{choise}</option>
            )}
        </select>
        <input type='number' value={amount} 
        onChange={onChangeAmount}/>
    </div>
  )
}

export default Currency