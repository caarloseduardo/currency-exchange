const App = {    
    init() {   
        const url = "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL";

        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();

        console.log(xhttp.responseText);
    }
}

App.init()