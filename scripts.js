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

        if(exchangeValue === '' && slcCurrency1 === slcCurrency2) {
            alert('Valores inválidos. Tente novamente')
        } else {
            if(slcCurrency1 === 'BRL' && slcCurrency2 === 'USD') {
                result = exchangeValue * BRL_USD;
            } else if(slcCurrency1 === 'USD' && slcCurrency2 === 'BRL') {
                result = exchangeValue / BRL_USD;
            } else if(slcCurrency1 === 'BRL' && slcCurrency2 === 'EUR') {
                result = exchangeValue * EUR_BRL;
            } else if(slcCurrency1 === 'EUR' && slcCurrency2 === 'BRL') {
                result = exchangeValue / EUR_BRL;
            } else if(slcCurrency1 === 'EUR' && slcCurrency2 === 'USD') {
                result = exchangeValue * USD_EUR;
            } else if(slcCurrency1 === 'USD' && slcCurrency2 === 'EUR') {
                result = exchangeValue / USD_EUR;
            }
            DOM.innerHTMLResult(result.toFixed(2));
        }
    }
}

const DOM = {
    innerHTMLResult(result) {
        const resultContainer = document.querySelector('.result-container');

        const layout = `
            <h2>${result}</h2>
        `

        resultContainer.innerHTML = layout;
    }
}
