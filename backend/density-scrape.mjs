import puppeteer from "puppeteer";

async function scrape(food) {
  while (food.indexOf(" ") != -1) {
    food = food.replace(" ", "-");
  }
  console.log("food is now " + food);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.aqua-calc.com/page/density-table/substance/" + food
  );

  const [el] = await page.$x('//*[@id="form_id_density-table"]/ul[1]/li[1]');
  const text = await el.getProperty("textContent");
  const name = await text.jsonValue();
  console.log(name);

  const end = name.indexOf("ounces");
  console.log("here is my best shot at answer:");
  const ozPerCup = name.substring(end - 5, end - 1).trim();
  console.log(ozPerCup);

  browser.close();
  return ozPerCup;
}

export default scrape;
