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
                const BRL_EUR = data.EUR['bid'];
                const USD_EUR = data.USD['bid'];
                Exchange.calculate(BRL_USD, BRL_EUR, USD_EUR);
            })
        })
    },

    calculate(BRL_USD, BRL_EUR, USD_EUR) {
        const slcCurrency1 = document.querySelector('#slcCurrency1').value;
        const slcCurrency2 = document.querySelector('#slcCurrency2').value;
        const exchangeValue = document.querySelector('#exchangeValue').value;
        const result = 0;

        if(exchangeValue === '' && slcCurrency1 === slcCurrency2) {
            alert('Valores inválidos. Tente novamente')
        } else {
            if(slcCurrency1 === 'BRL' && slcCurrency1 === 'USD') {
                result = BRL_USD*exchangeValue;
            }
        }
    }
}