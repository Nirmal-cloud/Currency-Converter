
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdown) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if(select.name === "from" && currcode === "USD"){
      newoption.selected = "selected";
    } else if(select.name === "to" && currcode === "INR"){
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateexchangerate = async () => {
   let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
      amtval = 1;
      amount.value = "1";
    }
    
    let pointfrom = fromcurr.value.toLowerCase();
    let pointto = tocurr.value.toLowerCase();
    let url = `https://latest.currency-api.pages.dev/v1/currencies/${pointfrom}.json`;
    let responce = await fetch(url);
    let data = await responce.json();
    let rate = data[pointfrom][pointto];
    

    let finalamount = amtval * rate;
    msg.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateexchangerate();
   
})

window.addEventListener("load" , () => {
  updateexchangerate();
})




 
