            
            
            let coin = "bitcoin";
            let currency = "cad";
            let days = "&days=1";
            let interval = "&interval=hourly";
            let coingeckolink = "https://api.coingecko.com/api/v3/coins/" + coin + "/market_chart?vs_currency=" + currency + days + interval;
            
            
            let coins = ["bitcoin", "ethereum", "nano"];
            let currencies = ["cad", "usd"];
            let intervals = ["hourly", "daily", "monthly", 'yearly'];
            
            const xtime = [];
            const yprice = [];
            const unixlink = [];
            
            

// maybe foreachloop to get xtime into the timestamp of unixapi link
            let unixapi = "https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp="

            
            async function realtime(){
                await graphdatamarketprice();
                xtime.forEach(unixcode => {
                    const fulllink = unixapi + unixcode;
                    unixlink.push(fulllink);
                    
                });
            };
            
            
            

            async function test(){
                await realtime();
                unixlink.forEach(timefetch => {
                    const truetime = timefetch.length-3
                    console.log(truetime)
                    

                });
            
            };
            test();
            


            async function graphdatamarketprice(){
                const response = await fetch (coingeckolink);
                const data = await response.json();
                const table = data.prices;
                table.forEach(tnp => {
                   const time = tnp[0];
                   xtime.push(time); 
                   const price = tnp[1];
                   yprice.push(price);
                });
             };
            

             async function cryptochart(){
                await graphdatamarketprice();
                const ctx = document.getElementById('myChart');
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: truetime,
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
            

            // --------------------------------------------------------------------------------------------

// Figure out what makes most sense. For loops or foreach being pushed then grabbed and inserted into masterlink object to use in generating graph data.   
// Foreach "tunnel" works but it doesn't seem to make sense to use,even though it will generate all possibilities. 
// 

coins.forEach(coinlist => {
    currencies.forEach(currencylist => {
        console.log("https://api.coingecko.com/api/v3/coins/" + coinlist + "/market_chart?vs_currency=" + currencylist + days + interval)
        });
});


for(let i=0; i<coins.length; i++){
    console.log("https://api.coingecko.com/api/v3/coins/" + coins[i] + "/market_chart?vs_currency=" + currency + days + interval);
}




            // -----------------------------------------------------------------------------------------------------------------------------------
            

            
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

            
            
            






