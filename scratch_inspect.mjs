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
    const ws = new WebSocket(targets[0].webSocketDebuggerUrl);

    await new Promise((resolve) => {
        ws.onopen = resolve;
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
    await send("Page.navigate", { url: "http://localhost:5173" });

    console.log("Navigated, waiting 4.5s for loading screen...");
    await new Promise(r => setTimeout(r, 4500));

    const rootHtml = await send("Runtime.evaluate", {
        expression: "document.getElementById('root')?.innerHTML || ''",
        returnByValue: true
    });
    console.log("Root HTML length:", rootHtml?.value?.length);
    console.log("Root HTML snippet:", rootHtml?.value?.substring(0, 400));

    const checkIds = await send("Runtime.evaluate", {
        expression: "Array.from(document.querySelectorAll('[id]')).map(el => el.id)",
        returnByValue: true
    });
    console.log("IDs found in document:", checkIds?.value);

    ws.close();
} catch (e) {
    console.error("Error:", e);
} finally {
    chromeProcess.kill();
}
