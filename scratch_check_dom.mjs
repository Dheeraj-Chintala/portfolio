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

    console.log("Waiting 4s for loading screen to lift...");
    await new Promise(r => setTimeout(r, 4000));

    const checkDom = await send("Runtime.evaluate", {
        expression: `({
            hasHome: !!document.getElementById('home'),
            hasAbout: !!document.getElementById('about'),
            tiltedCards: document.querySelectorAll('.tilted-card').length,
            figures: document.querySelectorAll('figure').length,
            totalImgs: document.querySelectorAll('img').length,
            imgSrcs: Array.from(document.querySelectorAll('img')).map(i => i.src)
        })`,
        returnByValue: true
    });
    console.log("DOM State:", checkDom?.result?.value);

    ws.close();
} catch (e) {
    console.error("Error:", e);
} finally {
    chromeProcess.kill();
}
