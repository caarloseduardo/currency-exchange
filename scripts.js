let result = 0;

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
        const slcCurrency1 = document.querySelector('#slcCurrency1').value;
        const slcCurrency2 = document.querySelector('#slcCurrency2').value;
        const exchangeValue = document.querySelector('#exchangeValue').value;

        if(exchangeValue === '' || slcCurrency1 === slcCurrency2) {
            alert('Valores inválidos. Tente novamente');
        } else {
            fetch(`https://economia.awesomeapi.com.br/all/${slcCurrency2}-${slcCurrency1}`)
            .then(response => { response.json()    
                .then(data => {
                    const bid = data[slcCurrency2]['bid'];

                    Exchange.calculate(bid, slcCurrency1, slcCurrency2, exchangeValue);
                }) 
            })
        }
    },

    calculate(bid, slcCurrency1, slcCurrency2, exchangeValue) {
        result = (exchangeValue * bid).toFixed(2);
        
        Exchange.getSignal(slcCurrency2);
    },

    getSignal(slcCurrency2) {
        const signal = slcCurrency2 === 'BRL' ? 'R$' : slcCurrency2 === 'USD' ? '$' : slcCurrency2 === 'EUR' ? '€' : '';

        DOM.innerHTMLResult(signal);
    }
}

const DOM = {
    innerHTMLResult(signal) {
        const resultArea = document.querySelector('.result-area');

        const layout = `
        <div class="result-container">
            <img src="assets/currency-exchange.svg" class="exchange-image" alt="Conversão de Moedas">
            <h2>${signal} ${result}</h2>
        </div>
        `

        resultArea.innerHTML = layout;
    }
}
