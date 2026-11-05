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

    const errors = [];
    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && callbacks.has(msg.id)) {
            const cb = callbacks.get(msg.id);
            callbacks.delete(msg.id);
            cb(msg.result);
        }
        if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
            console.error(`[CONSOLE ERROR]:`, ...msg.params.args.map(a => a.value || a.description));
            errors.push(msg.params);
        } else if (msg.method === "Runtime.exceptionThrown") {
            console.error("[RUNTIME EXCEPTION]:", JSON.stringify(msg.params.exceptionDetails));
            errors.push(msg.params.exceptionDetails);
        }
    };

    await send("Runtime.enable");
    await send("Log.enable");
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
    });

    console.log("Waiting 3.5s for loading screen & image preloading...");
    await new Promise(r => setTimeout(r, 3500));

    // Check images in document
    const imgCheck = await send("Runtime.evaluate", {
        expression: `(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return {
                totalImgs: imgs.length,
                loadedImgs: imgs.filter(i => i.complete && i.naturalWidth > 0).length,
                shimmers: document.querySelectorAll('.image-shimmer').length,
                allSrcs: imgs.map(i => i.src)
            };
        })()`,
        returnByValue: true
    });
    console.log("Image status on page:", imgCheck?.result?.value);

    // Scroll to About section and click first role card
    console.log("Scrolling to About...");
    await send("Runtime.evaluate", {
        expression: `window.scrollTo(0, 1000)`
    });
    await new Promise(r => setTimeout(r, 800));

    console.log("Clicking role card to test window images...");
    const clickRole = await send("Runtime.evaluate", {
        expression: `(() => {
            const card = document.querySelector('.tilted-card');
            if (card) {
                card.click();
                return true;
            }
            return false;
        })()`,
        returnByValue: true
    });
    console.log("Clicked card:", clickRole?.result?.value);

    await new Promise(r => setTimeout(r, 1200));

    const windowImgCheck = await send("Runtime.evaluate", {
        expression: `(() => {
            const overlayImgs = Array.from(document.querySelectorAll('.overlay-active img, [data-overlay-open] img, .fixed img'));
            return {
                windowImgsCount: overlayImgs.length,
                loadedCount: overlayImgs.filter(i => i.complete && i.naturalWidth > 0).length,
                srcs: overlayImgs.map(i => i.src)
            };
        })()`,
        returnByValue: true
    });
    console.log("Overlay window images status:", windowImgCheck?.result?.value);

    console.log("Total errors captured:", errors.length);

    ws.close();
} catch (e) {
    console.error("Error:", e);
} finally {
    chromeProcess.kill();
}
