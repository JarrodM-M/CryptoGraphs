            
            
            let coin = "nano";
            let currency = "cad";
            let days = "&days=1";
            let interval = "&interval=hourly";
            let coingeckoapi = "https://api.coingecko.com/api/v3/coins/" + coin + "/market_chart?vs_currency=" + currency + days + interval;
            let unixapi = "https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp="
            
            let coins = ["bitcoin", "ethereum", "nano"];
            let currencies = ["cad", "usd"];
            let intervals = ["hourly", "daily", "monthly", 'yearly'];
            
            const xtime = [];
            const unixlink = [];

            const truetimearray = [];
            const yprice = [];
            const ymarket = [];
            const yvolume = [];
            

            

            
    // This function grabs the X (Time) and Y (price, marketcap, volume ) to be used in the chartJS canvas
            async function graphdatafetch(){
                const response = await fetch (coingeckoapi);
                const data = await response.json();
                const pricetable = data.prices;
                const markettable = data.market_caps;
                const volumetable = data.total_volumes;
                                

                pricetable.forEach(tnp => {
                    const time = tnp[0];
                    xtime.push(time); 
                    const price = tnp[1];
                    yprice.push(price);

                });

                markettable.forEach(tnp1 => {
                    const market = tnp1[1];
                    ymarket.push(market);

                });
                
                volumetable.forEach(tnp2 => {
                    const volume = tnp2[1];
                    yvolume.push(volume);

                });
            
            };
            

    // This Function finshes the UNIX time converter API link with each UNIX code that is fetched by the coingecko api in function graphdatafetch. 
    // The code gets shortened by 3 digits because the unix api will only read milliseconds and coingecko api generates in nanoseconds         
            async function converttime(){
                await graphdatafetch();

                xtime.forEach(unixcode => {
                    const fulllink = unixapi + unixcode;
                    unixlink.push(fulllink.substring(0,fulllink.length-3));
                });
            };
            
            
    // This function tells the function callunixapi to repeat itself for every UNIX api link that is generated by convertime()      
            async function gettruetime(){
                await converttime();
                
                unixlink.forEach(eachlink => {
                    callunixapi(eachlink);
                });

                /*for(let x=0; x<unixlink.length; x++){
                    callunixapi(unixlink[x]);
                }*/
                
            };
            

    // this function fetches the timestamp data from the UNIX api in order to be usable as the x axis in the chartJS 
            async function callunixapi(currentLink){
                const response = await fetch (currentLink);
                const data = await response.json();
                truetimearray.push(data.substring(11,data.length-3));
            };
            
    // this is the chartjs function
             async function cryptochart(){
                await gettruetime();
                const ctx = document.getElementById('myChart');
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: truetimearray,
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
/*
                const ctx1 = document.getElementById('myChart1');
                const myChart1 = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: truetimearray,
                        datasets: [{
                            label: 'Market Cap',
                            data: ymarket,
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

                const ctx2 = document.getElementById('myChart2');
                const myChart2 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: truetimearray,
                        datasets: [{
                            label: 'Volume',
                            data: yvolume,
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
                */
            }
            cryptochart();
            

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
            

    // these functions grab the current price of each currency and send assign it an elementID to be used in the html        
          /*  async function getBTC(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.bitcoin;

                document.getElementById('btc').textContent = cad;
                console.log(cad);
            }
            getBTC();
            */

            async function getNANO(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.nano;
               
                document.getElementById("nano").textContent = cad;
                console.log(cad);
            }
            getNANO();

            /*
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
            */

            
            
            






