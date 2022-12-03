const puppeteer = require("puppeteer");

async function scrape(food) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.aqua-calc.com/page/density-table/substance/" + food,
  );

  const [el] = await page.$x('//*[@id="form_id_density-table"]/ul[1]/li[1]');
  const text = await el.getProperty("textContent");
  const name = await text.jsonValue();

  const end = name.indexOf("ounces");

  const ozPerCup = name.substring(end - 5, end - 1).trim();

  browser.close();
  return ozPerCup;
}

module.exports = { scrape };
