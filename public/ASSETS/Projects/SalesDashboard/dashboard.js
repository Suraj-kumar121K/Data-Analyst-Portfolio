const salesData=[
{date:"2025-01-05",order:"ORD-1001",customer:"Amit",product:"Laptop",category:"Technology",region:"North",sales:85000,profit:14500},
{date:"2025-01-12",order:"ORD-1002",customer:"Riya",product:"Monitor",category:"Technology",region:"West",sales:32000,profit:6200},
{date:"2025-01-18",order:"ORD-1003",customer:"Rahul",product:"Office Chair",category:"Furniture",region:"South",sales:18000,profit:3600},
{date:"2025-02-03",order:"ORD-1004",customer:"Priya",product:"Keyboard",category:"Technology",region:"East",sales:7500,profit:1500},
{date:"2025-02-10",order:"ORD-1005",customer:"Arjun",product:"Desk",category:"Furniture",region:"North",sales:24000,profit:4100},
{date:"2025-02-21",order:"ORD-1006",customer:"Neha",product:"Headphones",category:"Technology",region:"West",sales:12500,profit:2900},
{date:"2025-03-02",order:"ORD-1007",customer:"Vikas",product:"Printer",category:"Technology",region:"South",sales:28500,profit:5100},
{date:"2025-03-14",order:"ORD-1008",customer:"Anjali",product:"Notebook",category:"Office Supplies",region:"East",sales:4200,profit:900},
{date:"2025-03-25",order:"ORD-1009",customer:"Karan",product:"Desk",category:"Furniture",region:"North",sales:31000,profit:5600},
{date:"2025-04-06",order:"ORD-1010",customer:"Sneha",product:"Laptop",category:"Technology",region:"West",sales:92000,profit:15800},
{date:"2025-04-15",order:"ORD-1011",customer:"Rohit",product:"Office Chair",category:"Furniture",region:"South",sales:21000,profit:4300},
{date:"2025-04-26",order:"ORD-1012",customer:"Pooja",product:"Paper",category:"Office Supplies",region:"East",sales:6200,profit:1100},
{date:"2025-05-04",order:"ORD-1013",customer:"Manish",product:"Monitor",category:"Technology",region:"North",sales:45000,profit:8300},
{date:"2025-05-17",order:"ORD-1014",customer:"Kavita",product:"Printer",category:"Technology",region:"West",sales:36000,profit:6400},
{date:"2025-05-29",order:"ORD-1015",customer:"Sahil",product:"Desk",category:"Furniture",region:"South",sales:27000,profit:4900},
{date:"2025-06-08",order:"ORD-1016",customer:"Nisha",product:"Notebook",category:"Office Supplies",region:"East",sales:5100,profit:1050},
{date:"2025-06-19",order:"ORD-1017",customer:"Aditya",product:"Laptop",category:"Technology",region:"North",sales:78000,profit:13200},
{date:"2025-07-03",order:"ORD-1018",customer:"Meera",product:"Headphones",category:"Technology",region:"West",sales:14800,profit:3200},
{date:"2025-07-16",order:"ORD-1019",customer:"Deepak",product:"Office Chair",category:"Furniture",region:"South",sales:19500,profit:3800},
{date:"2025-08-02",order:"ORD-1020",customer:"Komal",product:"Paper",category:"Office Supplies",region:"East",sales:7300,profit:1350},
{date:"2025-08-18",order:"ORD-1021",customer:"Varun",product:"Monitor",category:"Technology",region:"North",sales:39000,profit:7200},
{date:"2025-09-05",order:"ORD-1022",customer:"Ishita",product:"Desk",category:"Furniture",region:"West",sales:28500,profit:5200},
{date:"2025-09-20",order:"ORD-1023",customer:"Rakesh",product:"Printer",category:"Technology",region:"South",sales:33000,profit:5900},
{date:"2025-10-07",order:"ORD-1024",customer:"Simran",product:"Notebook",category:"Office Supplies",region:"East",sales:4800,profit:980},
{date:"2025-10-23",order:"ORD-1025",customer:"Nitin",product:"Laptop",category:"Technology",region:"North",sales:88000,profit:15100},
{date:"2025-11-09",order:"ORD-1026",customer:"Swati",product:"Office Chair",category:"Furniture",region:"West",sales:22500,profit:4500},
{date:"2025-11-21",order:"ORD-1027",customer:"Yash",product:"Keyboard",category:"Technology",region:"South",sales:8900,profit:1800},
{date:"2025-12-06",order:"ORD-1028",customer:"Tanya",product:"Monitor",category:"Technology",region:"East",sales:41000,profit:7600},
{date:"2025-12-19",order:"ORD-1029",customer:"Mohit",product:"Desk",category:"Furniture",region:"North",sales:30000,profit:5500},
{date:"2025-12-28",order:"ORD-1030",customer:"Pallavi",product:"Paper",category:"Office Supplies",region:"West",sales:6800,profit:1250}
];

const $=id=>document.getElementById(id);
const money=v=>"₹"+Math.round(v).toLocaleString("en-IN");

function unique(key){return [...new Set(salesData.map(r=>r[key]))].sort();}
function fill(select,values){values.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;select.appendChild(o);});}
function filtered(){
    return salesData.filter(r=>
        ($("regionFilter").value==="All"||r.region===$("regionFilter").value)&&
        ($("categoryFilter").value==="All"||r.category===$("categoryFilter").value)&&
        ($("yearFilter").value==="All"||r.date.startsWith($("yearFilter").value))
    );
}
function aggregate(data,key,value){
    const out={};
    data.forEach(r=>out[r[key]]=(out[r[key]]||0)+r[value]);
    return out;
}
function kpis(data){
    $("totalSales").textContent=money(data.reduce((s,r)=>s+r.sales,0));
    $("totalProfit").textContent=money(data.reduce((s,r)=>s+r.profit,0));
    $("totalOrders").textContent=data.length.toLocaleString("en-IN");
    $("totalCustomers").textContent=new Set(data.map(r=>r.customer)).size.toLocaleString("en-IN");
}
function bars(id,obj){
    const box=$(id);box.innerHTML="";
    const entries=Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,5);
    if(!entries.length){box.innerHTML='<p style="color:#6d849b;font-size:12px">No data</p>';return;}
    const max=entries[0][1];
    entries.forEach(([name,value])=>{
        const p=Math.max(4,value/max*100);
        box.insertAdjacentHTML("beforeend",`<div class="bar-row"><div class="bar-top"><span>${name}</span><span class="bar-value">${money(value)}</span></div><div class="bar-track"><div class="bar-fill" style="width:${p}%"></div></div></div>`);
    });
}
function line(data){
    const monthly={};
    data.forEach(r=>{const m=r.date.slice(0,7);monthly[m]=(monthly[m]||0)+r.sales;});
    const e=Object.entries(monthly).sort();
    if(!e.length){$("salesLine").innerHTML="";$("xAxis").innerHTML="";return;}
    const vals=e.map(x=>x[1]),max=Math.max(...vals),min=Math.min(...vals),range=max-min||1;
    const pts=vals.map((v,i)=>`${e.length===1?450:i/(e.length-1)*900},${260-(v-min)/range*210}`);
    $("salesLine").innerHTML=`<defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00d9ff" stop-opacity=".25"/><stop offset="100%" stop-color="#00d9ff" stop-opacity="0"/></linearGradient></defs><polygon points="0,280 ${pts.join(" ")} 900,280" fill="url(#area)"></polygon><polyline points="${pts.join(" ")}"></polyline>${pts.map(p=>{const[x,y]=p.split(",");return `<circle cx="${x}" cy="${y}" r="5"></circle>`}).join("")}`;
    $("xAxis").innerHTML=e.map(x=>`<span>${x[0].slice(5)}/${x[0].slice(2,4)}</span>`).join("");
}
function table(data){
    $("salesTable").innerHTML=data.slice().sort((a,b)=>b.sales-a.sales).map(r=>`<tr><td>${r.date}</td><td>${r.order}</td><td>${r.customer}</td><td>${r.product}</td><td>${r.category}</td><td>${r.region}</td><td>${money(r.sales)}</td><td class="profit-positive">${money(r.profit)}</td></tr>`).join("");
    $("rowCount").textContent=`${data.length} row${data.length===1?"":"s"}`;
}
function render(){
    const d=filtered();
    kpis(d);line(d);
    bars("categoryChart",aggregate(d,"category","sales"));
    bars("regionChart",aggregate(d,"region","sales"));
    bars("productChart",aggregate(d,"product","sales"));
    bars("profitChart",aggregate(d,"category","profit"));
    table(d);
}

fill($("regionFilter"),unique("region"));
fill($("categoryFilter"),unique("category"));
fill($("yearFilter"),unique("date").map(x=>x.slice(0,4)));
["regionFilter","categoryFilter","yearFilter"].forEach(id=>$(id).addEventListener("change",render));
$("resetBtn").addEventListener("click",()=>{["regionFilter","categoryFilter","yearFilter"].forEach(id=>$(id).value="All");render();});
render();
