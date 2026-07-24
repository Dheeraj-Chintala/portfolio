import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const DEFAULT_IMAGES = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    { src: "/riverpod.png" },
];

const M = Matter;

function makeWalls(bounding, world, opts) {
    const { width: w, height: h } = bounding;
    const t = 200;
    const walls = [];
    if (opts.top) walls.push(M.Bodies.rectangle(w / 2, -t / 2, w + 2 * t, t, { isStatic: true }));
    if (opts.bottom) walls.push(M.Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, { isStatic: true }));
    if (opts.left) walls.push(M.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true }));
    if (opts.right) walls.push(M.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, { isStatic: true }));
    M.Composite.add(world, walls);
    return walls;
}

export default function Physics(props) {
    props = { ...COMPONENT_DEFAULTS, ...props };
    const {
        images = DEFAULT_IMAGES,
        count = DEFAULT_IMAGES.length,
        size = 126,
        shape = "circle",
        color = "transparent",
        friction = 1,
        mouseEnable = true,
        mouseStiffness = 0.991,
        mouseAngularStiffness = 0,
        gravX = 0,
        gravY = 1,
        wallOptions = { top: true, bottom: true, right: true, left: true },
        style,
    } = props;

    const n = Math.max(1, Math.min(20, Math.round(count)));
    const containerRef = useRef(null);
    const rafRef = useRef(0);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const depKey = JSON.stringify({
        n,
        size,
        shape,
        gravX,
        gravY,
        wallOptions,
        friction,
        mouseEnable,
        mouseStiffness,
        mouseAngularStiffness,
    });

    useEffect(() => {
        if (!inView) return;
        const container = containerRef.current;
        if (!container) return;

        const engine = M.Engine.create({
            enableSleeping: false,
            gravity: { x: gravX, y: gravY },
        });

        const bounding = container.getBoundingClientRect();
        makeWalls(bounding, engine.world, wallOptions);

        let mouseConstraint = null;
        const onLeave = () => mouseConstraint?.mouse?.mouseup(new Event("mouseup"));
        if (mouseEnable) {
            const mouse = M.Mouse.create(container);
            mouseConstraint = M.MouseConstraint.create(engine, {
                mouse,
                constraint: {
                    angularStiffness: mouseAngularStiffness,
                    stiffness: mouseStiffness,
                },
            });
            M.Composite.add(engine.world, mouseConstraint);
            const el = mouseConstraint.mouse.element;
            el.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
            el.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
            container.addEventListener("mouseleave", onLeave);
        }

        const bodyOpts = {
            friction: Math.max(1, Math.min(10, friction)) / 10,
            frictionAir: 0.02,
        };
        const made = [];
        for (let i = 0; i < n; i++) {
            const x = ((i + 0.5) / n) * bounding.width;
            const y = size / 2 + i * (size * 0.15 + 10);
            const body =
                shape === "square"
                    ? M.Bodies.rectangle(x, y, size, size, bodyOpts)
                    : M.Bodies.circle(x, y, size / 2, bodyOpts);
            made.push(body);
        }
        M.Composite.add(engine.world, made);

        const els = Array.from(container.querySelectorAll("[data-physics-body]"));

        const update = () => {
            rafRef.current = requestAnimationFrame(update);
            for (let i = 0; i < made.length; i++) {
                const el = els[i];
                if (!el) continue;
                const { position, angle } = made[i];
                el.style.visibility = "visible";
                el.style.left = `${position.x}px`;
                el.style.top = `${position.y}px`;
                el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
            }
            M.Engine.update(engine);
        };
        update();

        return () => {
            cancelAnimationFrame(rafRef.current);
            if (mouseEnable) container.removeEventListener("mouseleave", onLeave);
            M.World.clear(engine.world, false);
            M.Engine.clear(engine);
        };
    }, [depKey, inView]);

    const imgFor = (i) => {
        const imgs = Array.isArray(images) && images.length > 0 ? images : DEFAULT_IMAGES;
        if (!imgs.length) return undefined;
        return imgs[i % imgs.length]?.src;
    };

    return (
        <div
            ref={containerRef}
            style={{
                ...style,
                position: "relative",
                height: "100%",
                width: "100%",
                overflow: "hidden",
                minHeight: "400px",
            }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
        >
            {Array.from({ length: n }).map((_, i) => {
                const src = imgFor(i);
                return (
                    <div
                        key={i}
                        data-physics-body=""
                        style={{
                            position: "absolute",
                            visibility: "hidden",
                            width: size,
                            height: size,
                            borderRadius: shape === "circle" ? "50%" : 0,
                            overflow: "hidden",
                            background: color,
                            backgroundImage: src ? `url(${src})` : undefined,
                            backgroundSize: "60%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            cursor: "grab",
                        }}
                        draggable={false}
                    />
                );
            })}
        </div>
    );
}

const COMPONENT_DEFAULTS = {
    images: DEFAULT_IMAGES,
    count: DEFAULT_IMAGES.length,
    size: 100,
    shape: "circle",
    color: "transparent",
    gravY: 1,
    gravX: 0,
    wallOptions: { top: true, bottom: true, left: true, right: true },
    friction: 1,
    mouseEnable: true,
    mouseStiffness: 0.991,
    mouseAngularStiffness: 0,
};

Physics.displayName = "Physics";
