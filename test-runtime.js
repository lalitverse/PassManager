import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const routes = [
    '/',
    '/dashboard',
    '/vault',
    '/generator',
    '/security',
    '/activity',
    '/settings',
    '/profile'
  ];

  let hasErrors = false;

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[Browser Console Error]: ${msg.text()}`);
      hasErrors = true;
    }
  });

  page.on('pageerror', err => {
    console.log(`[Browser Page Error]: ${err.toString()}`);
    hasErrors = true;
  });

  for (const route of routes) {
    const url = `http://localhost:5173${route}`;
    console.log(`Checking ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Check if body is empty (blank screen)
    const bodyText = await page.evaluate(() => document.body.innerText.trim());
    if (bodyText.length === 0) {
      console.log(`[Blank Screen Error]: The route ${route} resulted in a blank screen.`);
      hasErrors = true;
    }
  }

  await browser.close();

  if (hasErrors) {
    console.log('Finished with errors.');
    process.exit(1);
  } else {
    console.log('All routes loaded successfully without errors or blank screens.');
    process.exit(0);
  }
})();
