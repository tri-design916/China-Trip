import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    console.log("Navigating to URL...");
    await page.goto('https://prdt.ybtour.co.kr/product/schedule/event?evCd=CTP1029-260610SC00', { waitUntil: 'networkidle' });
    
    await page.waitForTimeout(3000);
    
    console.log("Extracting text...");
    const text = await page.evaluate(() => {
      return document.body.innerText;
    });
    
    fs.writeFileSync('schedule_raw.txt', text);
    console.log("Saved to schedule_raw.txt");
    
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
