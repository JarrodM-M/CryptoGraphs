            
            
            let coin = "bitcoin";
            let currency = "cad";
            let days = "&days=1";
            let interval = "&interval=hourly";
            let link = "https://api.coingecko.com/api/v3/coins/" + coin + "/market_chart?vs_currency=" + currency + days + interval;
            
            console.log(link);
            
            let coins = ["bitcoin", "ethereum", "nano"];
            let currencies = ["cad", "usd"];
            let intervals = ["hourly", "daily", "monthly", 'yearly'];
            
            const xtime = [];
            const yprice = [];

            
 

            coins.forEach(coinlist => {
                console.log("https://api.coingecko.com/api/v3/coins/" + coinlist + "/market_chart?vs_currency=" + currency + days + interval)
            });
            for(let i=0; i<coins.length; i++){
                console.log("https://api.coingecko.com/api/v3/coins/" + coins[i] + "/market_chart?vs_currency=" + currency + days + interval);
            }

            async function getBTC(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.bitcoin;

                document.getElementById('btc').textContent = cad;
                console.log(cad);
            }
            getBTC();

            async function getNANO(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.nano;
               
                document.getElementById("nano").textContent = cad;
                console.log(cad);
            }
            getNANO();

            async function getETH(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.ethereum;

                document.getElementById("eth").textContent = cad;
                console.log(cad);
            }
            getETH();

            async function getSOL(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.solana;
                
                document.getElementById("sol").textContent = cad;
                console.log(cad);
            }
            getSOL();
            
            
            async function graphdatamarketprice(){
                const response = await fetch (link);
                const data = await response.json();
                const table = data.prices;
                table.forEach(tnp => {
                   const time = tnp[0];
                   xtime.push(time); 
                   const price = tnp[1];
                   yprice.push(price);
                   console.log(time, price)
                });
             };
            

             async function cryptochart(){
                await graphdatamarketprice();
                const ctx = document.getElementById('myChart');
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: xtime,
                        datasets: [{
                            label: 'Prices',
                            data: yprice,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },    
                });
            }
            cryptochart();
            
            






