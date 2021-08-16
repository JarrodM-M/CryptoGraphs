




            
            
            let coin = "nano";
            let currency = "cad";
            let days = "1";
            let interval = "hourly";
            let coingeckoapi = "https://api.coingecko.com/api/v3/coins/" + coin + "/market_chart?vs_currency=" + currency + "&days=" + days + "&interval=" + interval;
            let unixapi = "https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=" // no longer needed
            let coinlist ="https://api.coingecko.com/api/v3/coins/list";
            
            let coinIds = ["bitcoin", "ethereum", "nano"];
            let currencies = ["cad", "usd"];
            let intervals = ["hourly", "daily", "monthly", 'yearly'];
            let dayz = ["1", "7", "30", "365"]
            
            
            const xtime = [];
            const yprice = [];
            const ymarket = [];
            const yvolume = [];

            const unixlink = []; // no longer needed
            const truetimearray = []; // no longer needed

// change the coingecko api link

            function changeApilink(){
                coingeckoapi = "https://api.coingecko.com/api/v3/coins/" + document.getElementById('chartCoinid').value + 
                "/market_chart?vs_currency=" + currency + "&days=" + days + "&interval=" + interval;
            };


        

         
    // for grabbing coin ids -- future upgrade
    /* 
            async function listcoins(){
                const response = await fetch (coinlist);
                const data = await response.json();
                console.log(data);
            };
            listcoins();
    */

            
            
    // This function grabs the Xvalues (Time) and converts it from UNIX into a readable timestamp 
    // and grabs the Y values (price, marketcap, volume ) to be used in the chartJS canvas

            async function graphdatafetch(){
                await changeApilink();
                const response = await fetch (coingeckoapi);
                const data = await response.json();
                const pricetable = data.prices;
                const markettable = data.market_caps;
                const volumetable = data.total_volumes;
                                

                pricetable.forEach(tnp => {
                    const time = tnp[0];
                    const fullcode = new Date(time);
                    xtime.push(fullcode.toLocaleTimeString([], {
                        hour12: true,
                        hour: 'numeric',
                        minute: '2-digit'
                        
                    })); 
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
        
        
            

            
            
    // this is the chartjs function
             async function cryptochart(){
                await graphdatafetch(); 
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx,  {
                    
                    type: 'line',

                    data: {
                        labels: xtime,
                        datasets: [{
                            
                            label: 'Prices',
                            yAxisID: 'Prices',
                            data: yprice,
                            borderWidth: 10,
                            borderJoinStyle: 'round',
                            borderCapStyle: 'round',
                            pointRadius: 0,
                            pointHitRadius: 10,
                            linetension: 0.2
                        }]
                    },

                    options: {
                        plugins :{
                            legend: {
                                display: false
                            },
                            tooltip: {
                                
                            }
                        }
                                                    
                    }                               
                    
                });
            };
            cryptochart();
            
            
            
            
                


    // these functions grab the current price of each currency and send assign it an elementID to be used in the html        
            async function getBTC(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + document.getElementById('chartCoinid').value
                + "&vs_currencies=cad");
                const data = await response.json();
                const cad = data;

                document.getElementById('bitcoinCurrentprice').textContent = cad;
                console.log(data);  
            };
            getBTC();
            
           

            async function getNANO(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.nano;
               
                document.getElementById("nanoCurrentprice").textContent = "$" + cad;
                console.log(cad);
            };
            
            

            
            async function getETH(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=cad");
                const data = await response.json();
                const { cad } = data.ethereum;

                document.getElementById("ethereumCurrentprice").textContent = cad;
                console.log(cad);
            };
            

            

            /*
    // This Function finshes the UNIX time converter API link with each UNIX code that is fetched by the coingecko api in function graphdatafetch. 
    // The code gets shortened by 3 digits because the unix api will only read milliseconds and coingecko api generates in nanoseconds
    // no longer needed         
            async function converttime(){
                await graphdatafetch();

                xtime.forEach(unixcode => {
                    const fulllink = unixapi + unixcode;
                    unixlink.push(fulllink.substring(0,fulllink.length-3));
                });
            };
            
            
    // This function tells the function callunixapi to repeat itself for every UNIX api link that is generated by convertime() 
    // no longer needed becuase of new Date() function     
            async function gettruetime(){
                await converttime();
                
                for(let x=0; x<unixlink.length; x++){
                    await callunixapi(unixlink[x]);
                };

                unixlink.forEach(eachlink => {
                    callunixapi(eachlink));
                }
                
            };
            

    // this function fetches the timestamp data from the UNIX api in order to be usable as the x axis in the chartJS
    // no longer needed
            async function callunixapi(currentLink){
                const response = await fetch (currentLink);
                const data = await response.json();
        
                truetimearray.push(data.substring(11,data.length-3));
            };

            */

            
            
            






