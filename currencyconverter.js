const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const btn = document.querySelector("button")
const fromCurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

const dropdowns  = document.querySelectorAll(".dropdown select")

for(let select of dropdowns){
  for (Code in countryList) {
      let newoption = document.createElement("option") 
      newoption.innerText = Code
       newoption.value = Code
       if(select.name === "from" && Code === "USD"){
        newoption.selected = "selected";
       }
       else if (select.name === "to" && Code === "INR") {
        newoption.selected = "selected";
       }
      select.append(newoption)
    }
    select.addEventListener("change",(evt)=> {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
   let Code = element.value;
   let countrycode = countryList[Code];
   let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newsrc;
   
}

btn.addEventListener("click", async (evt)=> {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtval = amount.value
    // console.log(amtval)
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
   
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    let finalamount = Math.round(amtval * rate);
    msg.innerText = `${amtval} ${fromCurr.value} - ${finalamount} ${tocurr.value}`
})