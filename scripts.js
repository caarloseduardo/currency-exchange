const Form = {
    submit(event) {
        event.preventDefault();

        try {
            Exchange.getValues();
        } catch (error) {
            alert(error.message);
        }
    }
}

const Exchange = {
    getValues() {
        fetch('https://economia.awesomeapi.com.br/all/BRL-USD,EUR-BRL,USD-EUR')
        .then(response => { response.json()    
            .then(data => {
                const BRL_USD = data.BRL['bid'];
                const EUR_BRL = data.EUR['bid'];
                const USD_EUR = data.USD['bid'];

                Exchange.calculate(BRL_USD, EUR_BRL, USD_EUR);
            }) 
        })
    },

    calculate(BRL_USD, EUR_BRL, USD_EUR) {
        const slcCurrency1 = document.querySelector('#slcCurrency1').value;
        const slcCurrency2 = document.querySelector('#slcCurrency2').value;
        const exchangeValue = document.querySelector('#exchangeValue').value;
        let result = 0;

        if(exchangeValue === '' || slcCurrency1 === slcCurrency2) {
            alert('Valores inválidos. Tente novamente')
        } else {
            if(slcCurrency1 === 'BRL' && slcCurrency2 === 'USD') {
                result = '$' + (exchangeValue * BRL_USD).toFixed(2);
            } else if(slcCurrency1 === 'USD' && slcCurrency2 === 'BRL') {
                result = 'R$' + (exchangeValue / BRL_USD).toFixed(2);
            } else if(slcCurrency1 === 'BRL' && slcCurrency2 === 'EUR') {
                result = '€' + (exchangeValue / EUR_BRL).toFixed(2);
            } else if(slcCurrency1 === 'EUR' && slcCurrency2 === 'BRL') {
                result = 'R$' + (exchangeValue * EUR_BRL).toFixed(2);
            } else if(slcCurrency1 === 'EUR' && slcCurrency2 === 'USD') {
                result = '$' + (exchangeValue / USD_EUR).toFixed(2);
            } else if(slcCurrency1 === 'USD' && slcCurrency2 === 'EUR') {
                result = '€' + (exchangeValue * USD_EUR).toFixed(2);
            }
            DOM.innerHTMLResult(result);
        }
    }
}

const DOM = {
    innerHTMLResult(result) {
        const resultArea = document.querySelector('.result-area');

        const layout = `
        <div class="result-container">
            <img src="assets/currency-exchange.svg" class="exchange-image" alt="Conversão de Moedas">
            <h2>${result}</h2>
        </div>
        `

        resultArea.innerHTML = layout;
    }
}
