import { useEffect, useState } from 'react';
import '../styles/components/coin.sass'

const Coin = () => {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,ILS-BRL");

                if(!response.ok){
                    throw new Error("Erro ao buscar os dados.");
                }
                const data = await response.json();
                console.log(data);
                setCoins(Object.values(data));
            } catch (error) {
                console.log("Ocorreu um erro", error)
            }
        }
        getData();
    },[])

  return (
    <section id='coin'>
        {coins.map((coin) => (
            <div key={coin.code} className="item-coin">
                <p>{coin.code}</p>
                <h3>R$ {parseFloat(coin.ask).toFixed(2)}</h3>
                <h4>{coin.pctChange}%</h4>
                <div className="low-high">
                    <p>-{parseFloat(coin.low).toFixed(2)}</p>
                    <p>+{parseFloat(coin.high).toFixed(2)}</p>
                </div>
            </div>
        ))}       
    </section>
  )
}

export default Coin
