




            
            
            let coin = "nano";
            let currency = "cad";
            let days = "1";
            let interval = "hourly";
            let coingeckoapi = "https://api.coingecko.com/api/v3/coins/" + coin + "/market_chart?vs_currency=" + currency + "&days=" + "1" + "&interval=" + interval;
            let unixapi = "https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=" // no longer needed
            let coinlist ="https://api.coingecko.com/api/v3/coins/list";
            
            let coinIds = ["bitcoin", "ethereum", "nano"];
            let currencies = ["cad", "usd"];
            let intervals = ["hourly", "daily", "monthly", 'yearly'];
            let dayz = ["1", "7", "30", "365"];
            let graphTime = [];

            let timeView = "1"; //this is the setting for viewiing days, weeks, months
            
            let xtimeday = [];
            let yprice = [];
            let ymarket = [];
            let yvolume = [];
            let xtimeweek = [];
            let xtimemonth = [];

            const unixlink = []; // no longer needed
            const truetimearray = []; // no longer needed



            

           
            

// change the coingecko api link

            

// Set up for day,week,month buttons

const chartCoinId = document.getElementById('chartCoinid');


const dayButton = document.getElementById('daybtn');
const weekButton = document.getElementById('weekbtn');
const monthButton = document.getElementById('monthbtn');

            
    // This function grabs the Xvalues (Time) and converts it from UNIX into a readable timestamp 
    // and grabs the Y values (price, marketcap, volume ) to be used in the chartJS canvas

            async function graphdatafetch(){
                await changeApilink();
                const response = await fetch (coingeckoapi);
                const data = await response.json();
                const pricetable = data.prices;
                const markettable = data.market_caps;
                const volumetable = data.total_volumes;
                yprice = [];
                xtimeday = [];
                ymarket = [];
                yvolume = [];
                xtimeweek = []; 
                xtimemonth = [];               

                pricetable.forEach(tnp => {
                    const time = tnp[0];
                    const fullcode = new Date(time);
                    xtimeday.push(fullcode.toLocaleTimeString([], {
                        hour12: true,
                        hour: 'numeric',
                        minute: '2-digit'
                        
                    }));
                    xtimeweek.push(fullcode.toLocaleDateString([], {
                        hour: 'numeric',
                        hourCycle: 'h12',
                        weekday: 'short'
                    }));
                    xtimemonth.push(fullcode.toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric'
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
                    color: 'whitesmoke',

                    data: {
                        labels: xtimeday,
                        datasets: [{
                            
                            label: 'Prices',
                            yAxisID: 'Prices',
                            data: yprice,
                            borderWidth: 3,
                            borderColor: 'rgba(0, 238, 255, 0.712)',
                            pointRadius: 0,
                            pointHitRadius: 15,
                            lineTension: 0.5,
                            radius: 6,
                            borderCapStyle: 'round',
                            
                        }]
                    },

                    options: {
                        
                        plugins :{
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index'
                            }
                        }
                                                    
                    }                               
                });

                chartCoinId.addEventListener('change', () => {
                     getBTC();
                     reload();                  
                });

                dayButton.addEventListener('click', () => {
                    changeDay();
                    reload();
                });
                
                weekButton.addEventListener('click', () => {
                    changeWeek();
                    reload2();
                });
                
                monthButton.addEventListener('click', () => {
                    changeMonth();
                    reload3();
                });

                function changeDay(){
                    timeView = '1';
                    interval = 'hourly';
                    graphTime = xtimeday;
                    dayButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                    weekButton.style.background = 'rgba(128, 15, 15, 0)';
                    monthButton.style.background = 'rgba(128, 15, 15, 0)';
                };
                async function changeWeek(){
                    timeView= '7';
                    interval= 'daily';
                    graphTime = xtimeweek; 
                    dayButton.style.background = 'rgba(128, 15, 15, 0)';
                    weekButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                    monthButton.style.background = 'rgba(128, 15, 15, 0)';
                    
                };
                function changeMonth(){
                    timeView = '30';
                    interval = 'daily';
                    graphTime = xtimemonth;
                    dayButton.style.background = 'rgba(128, 15, 15, 0)';
                    weekButton.style.background = 'rgba(128, 15, 15, 0)';
                    monthButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                };

                async function destroy(){
                    myChart.destroy();   
                };

                async function reload(){
                    await destroy();
                    cryptochart();
                };

                async function reload2(){
                    await destroy();
                    cryptochart2();
                };
                async function reload3(){
                    await destroy();
                    cryptochart3();
                };
            };
            cryptochart();

            async function cryptochart2(){
                await graphdatafetch(); 
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx,  {
                    
                    type: 'line',

                    data: {
                        labels: xtimeweek,
                        datasets: [{
                            
                            label: 'Prices',
                            yAxisID: 'Prices',
                            data: yprice,
                            borderWidth: 3,
                            borderColor: 'rgba(0, 238, 255, 0.712)',
                            pointRadius: 0,
                            pointHitRadius: 15,
                            lineTension: 0.5,
                            radius: 6,
                            borderCapStyle: 'round',
                            color: 'whitesmoke'
                            
                        
                        }]
                    },

                    options: {
                        
                        plugins :{
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index'
                            }
                        }
                                                    
                    }                               
                });

                chartCoinId.addEventListener('change', () => {
                    getBTC();
                    reload();                  
                });

                dayButton.addEventListener('click', () => {
                    changeDay();
                    reload();
                });
                
                weekButton.addEventListener('click', () => {
                    changeWeek();
                    reload2();
                });
                
                monthButton.addEventListener('click', () => {
                    changeMonth();
                    reload3();
                });

                function changeDay(){
                    timeView = '1';
                    interval = 'hourly';
                    graphTime = xtimeday;
                    dayButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                    weekButton.style.background = 'rgba(128, 15, 15, 0)';
                    monthButton.style.background = 'rgba(128, 15, 15, 0)';
                };
                async function changeWeek(){
                    timeView= '7';
                    interval= 'daily';
                    graphTime = xtimeweek; 
                    dayButton.style.background = 'rgba(128, 15, 15, 0)';
                    weekButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                    monthButton.style.background = 'rgba(128, 15, 15, 0)';
                    
                };
                function changeMonth(){
                    timeView = '30';
                    interval = 'daily';
                    graphTime = xtimemonth;
                    dayButton.style.background = 'rgba(128, 15, 15, 0)';
                    weekButton.style.background = 'rgba(128, 15, 15, 0)';
                    monthButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                };

                async function destroy(){
                   myChart.destroy();   
                };

                async function reload(){
                    await destroy();
                    cryptochart();
                };

                async function reload2(){
                   await destroy();
                   cryptochart2();
                };

                async function reload3(){
                    await destroy();
                    cryptochart3();
                };
            };

            async function cryptochart3(){
                await graphdatafetch(); 
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx,  {
                    
                    type: 'line',

                    data: {
                        labels: xtimemonth,
                        datasets: [{
                            
                            label: 'Prices',
                            yAxisID: 'Prices',
                            data: yprice,
                            borderWidth: 3,
                            borderColor: 'rgba(0, 238, 255, 0.712)',
                            pointRadius: 0,
                            pointHitRadius: 15,
                            lineTension: 0.5,
                            radius: 6,
                            borderCapStyle: 'round',
                            color: 'whitesmoke'
                            
                        
                        }]
                    },

                    options: {
                        
                        plugins :{
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index'
                            }
                        }
                                                    
                    }                               
                });

                chartCoinId.addEventListener('change', () => {
                    getBTC();
                    reload();                  
                });

                dayButton.addEventListener('click', () => {
                   changeDay();
                   reload();
                });
               
                weekButton.addEventListener('click', () => {
                   changeWeek();
                   reload2();
                });
               
                monthButton.addEventListener('click', () => {
                   changeMonth();
                   reload3();
                });
                chartCoinId.addEventListener('change', () => {
                    getBTC();
                    reload();                  
                });

                dayButton.addEventListener('click', () => {
                    changeDay();
                    reload();
                });
                
                weekButton.addEventListener('click', () => {
                    changeWeek();
                    reload2();
                });
                
                monthButton.addEventListener('click', () => {
                    changeMonth();
                    reload3();
                });

                function changeDay(){
                    timeView = '1';
                    interval = 'hourly';
                    graphTime = xtimeday;
                    dayButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                    weekButton.style.background = 'rgba(128, 15, 15, 0)';
                    monthButton.style.background = 'rgba(128, 15, 15, 0)';
                };
                async function changeWeek(){
                    timeView= '7';
                    interval= 'daily';
                    graphTime = xtimeweek; 
                    dayButton.style.background = 'rgba(128, 15, 15, 0)';
                    weekButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                    monthButton.style.background = 'rgba(128, 15, 15, 0)';
                    
                };
                function changeMonth(){
                    timeView = '30';
                    interval = 'daily';
                    graphTime = xtimemonth;
                    dayButton.style.background = 'rgba(128, 15, 15, 0)';
                    weekButton.style.background = 'rgba(128, 15, 15, 0)';
                    monthButton.style.background = 'linear-gradient(to bottom right, rgba(80, 0, 80,0.5), rgba(59, 1, 136,0.5))';
                };

                async function destroy(){
                   myChart.destroy();   
                };

                async function reload(){
                    await destroy();
                    cryptochart();
                };

                async function reload2(){
                   await destroy();
                   cryptochart2();
                };

                async function reload3(){
                    await destroy();
                    cryptochart3();
                };
            };
            

            
     // this function changes the api link for the graphfetchdata function so it will get the correct information from the coingecko api for chart js to draw        
            async function changeApilink(){
                coingeckoapi = "https://api.coingecko.com/api/v3/coins/" + document.getElementById('chartCoinid').value + 
                "/market_chart?vs_currency=" + currency + "&days=" + timeView + "&interval=" + interval;
                console.log(coingeckoapi);
            };
            
            
            
                


    // these functions grab the current price of each currency and send assign it an elementID to be used in the html        
            async function getBTC(){
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + document.getElementById('chartCoinid').value
                + "&vs_currencies=cad");
                const data = await response.json();
                const cad = Object.values(data);
                const final = cad[0];

                document.getElementById('bitcoinCurrentprice').textContent = "$" + Object.values(final);
                  
            };
            getBTC();
            
           
/*
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
*/
            
// for grabbing coin ids -- future upgrade
    /* 
            async function listcoins(){
                const response = await fetch (coinlist);
                const data = await response.json();
                console.log(data);
            };
            listcoins();
    */

            

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

            
            
            






