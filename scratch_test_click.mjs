import { spawn } from "child_process";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const chromeProcess = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "http://localhost:5173"
]);

await new Promise(r => setTimeout(r, 2000));

try {
    const res = await fetch("http://127.0.0.1:9222/json");
    const targets = await res.json();
    const pageTarget = targets.find(t => t.type === "page");
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
    });

    let msgId = 1;
    const callbacks = new Map();
    function send(method, params = {}) {
        return new Promise((resolve) => {
            const id = msgId++;
            callbacks.set(id, resolve);
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && callbacks.has(msg.id)) {
            const cb = callbacks.get(msg.id);
            callbacks.delete(msg.id);
            cb(msg.result);
        }
    };

    await send("Runtime.enable");
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
    });

    await new Promise(r => setTimeout(r, 4000));

    // Scroll to about section
    await send("Runtime.evaluate", {
        expression: `document.getElementById('about')?.scrollIntoView()`
    });
    await new Promise(r => setTimeout(r, 1000));

    // Find and click the first figure element or role card
    const clickRes = await send("Runtime.evaluate", {
        expression: `(() => {
            const cards = document.querySelectorAll('figure.tilted-card, .tilted-card');
            console.log('Cards found:', cards.length);
            if (cards.length > 0) {
                cards[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                return { success: true, count: cards.length };
            }
            return { success: false, count: 0 };
        })()`,
        returnByValue: true
    });
    console.log("Click result:", clickRes?.result?.value);

    await new Promise(r => setTimeout(r, 1500));

    // Check window elements and images inside windows
    const winCheck = await send("Runtime.evaluate", {
        expression: `(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            const progressiveImgs = Array.from(document.querySelectorAll('.image-shimmer'));
            return {
                totalImgsOnPage: imgs.length,
                loadedImgs: imgs.filter(i => i.complete && i.naturalWidth > 0).length,
                shimmersActive: progressiveImgs.length,
                imgUrls: imgs.map(i => i.src)
            };
        })()`,
        returnByValue: true
    });
    console.log("Window check result:", winCheck?.result?.value);

    ws.close();
} catch (e) {
    console.error("Error:", e);
} finally {
    chromeProcess.kill();
}
