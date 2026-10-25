"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import * as THREE from "three"

const MAX_CARDS = 420

const DEFAULTS = {
    images: [
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/5f084e5a-2e3f-4239-be1a-5084a6dcef00/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/3b42034b-897e-456d-cb00-1f2cf0aa4700/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c84f3e45-635f-4eaa-4e24-730098b55500/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/9652cf81-4644-4471-1122-4e40ef6e2600/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/1640f8fe-2cb1-4026-88e3-10dd0019f400/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/20fd03c3-49d6-408c-3ac9-8c5a6ed2b500/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/4b1ec233-9a09-4483-1adb-404a93094100/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/8fd4d2a3-a363-4658-d6ee-84790bc8f300/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/3ad8e2bd-dc38-49ba-d186-1a5ab1428d00/w=800",
        },
        {
            src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/93ba867c-59af-4b58-8021-c0c0fbce8300/w=800",
        },
    ],
    cell: 72,
    cardSize: 40,
    magnify: 8,
    radius: 240,
    drain: 10,
    assemble: true,
}

export type ImageValue = string | { src?: string; name?: string; title?: string } | null | undefined

function nameOf(img: ImageValue): string {
    if (!img || typeof img === "string") return ""
    return img.name || img.title || ""
}

type Config = {
    images: ImageValue[]
    cell: number
    cardSize: number
    magnify: number
    radius: number
    drain: number
    assemble: boolean
}

function clamp(v: number, lo: number, hi: number, fallback: number): number {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

const PLATEAU = 0.55

function falloffAt(reach: number): number {
    if (reach <= PLATEAU) return 1
    if (reach >= 1) return 0
    const t = (reach - PLATEAU) / (1 - PLATEAU)
    return 1 - t * t * (3 - 2 * t)
}

function settingsFor(cfg: Config) {
    return {
        cell: clamp(cfg.cell, 40, 400, DEFAULTS.cell),

        fill: clamp(cfg.cardSize, 5, 100, DEFAULTS.cardSize) / 100,

        magnify: 1 + clamp(cfg.magnify, 1, 20, DEFAULTS.magnify) * 0.3,

        radius: clamp(cfg.radius, 40, 400, DEFAULTS.radius),
        drain: clamp(cfg.drain, 0, 20, DEFAULTS.drain) / 10,
    }
}

function srcOf(img: ImageValue): string {
    if (typeof img === "string") return img
    return img?.src ?? ""
}

function sourcesOf(cfg: Config): string[] {
    const list = Array.isArray(cfg.images) ? cfg.images : []
    return list.map(srcOf).filter(Boolean)
}

const textureCache = new Map<string, THREE.Texture>()
const texturePending = new Map<string, Promise<THREE.Texture | null>>()

function loadTexture(url: string): Promise<THREE.Texture | null> {
    const cached = textureCache.get(url)
    if (cached) return Promise.resolve(cached)
    const pending = texturePending.get(url)
    if (pending) return pending
    const p = new Promise<THREE.Texture | null>((resolve) => {
        if (url.endsWith('.svg') || url.includes('.svg') || url.endsWith('.png')) {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
                try {
                    const size = 512
                    const canvas = document.createElement("canvas")
                    canvas.width = size
                    canvas.height = size
                    const ctx = canvas.getContext("2d")
                    if (ctx) {
                        ctx.fillStyle = "#ffffff"
                        ctx.fillRect(0, 0, size, size)
                        const pad = size * 0.18
                        ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2)
                        const texture = new THREE.CanvasTexture(canvas)
                        texture.minFilter = THREE.LinearMipmapLinearFilter
                        texture.generateMipmaps = true
                        textureCache.set(url, texture)
                        resolve(texture)
                        return
                    }
                } catch {
                    // fallback
                }
                const loader = new THREE.TextureLoader()
                loader.setCrossOrigin("anonymous")
                loader.load(
                    url,
                    (texture) => {
                        texture.minFilter = THREE.LinearMipmapLinearFilter
                        textureCache.set(url, texture)
                        resolve(texture)
                    },
                    undefined,
                    () => resolve(null)
                )
            }
            img.onerror = () => {
                const loader = new THREE.TextureLoader()
                loader.setCrossOrigin("anonymous")
                loader.load(
                    url,
                    (texture) => {
                        texture.minFilter = THREE.LinearMipmapLinearFilter
                        textureCache.set(url, texture)
                        resolve(texture)
                    },
                    undefined,
                    () => resolve(null)
                )
            }
            img.src = url
            return
        }

        const loader = new THREE.TextureLoader()
        loader.setCrossOrigin("anonymous")
        loader.load(
            url,
            (texture) => {
                texture.minFilter = THREE.LinearMipmapLinearFilter
                textureCache.set(url, texture)
                resolve(texture)
            },
            undefined,
            () => resolve(null)
        )
    })
    texturePending.set(url, p)
    return p
}

const CARD_VERTEX =  `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const CARD_FRAGMENT =  `
uniform sampler2D uTexture;
uniform float uDistance;
uniform float uDrain;
uniform vec2 uCover;

varying vec2 vUv;

vec3 getLuminance(vec3 color) {
    vec3 luminance = vec3(0.2126, 0.7152, 0.0722);
    return vec3(dot(luminance, color));
}

void main() {
    vec2 uv = (vUv - 0.5) * uCover + 0.5;
    vec4 image = texture2D(uTexture, uv);

    float distanceFactor = clamp(uDistance * uDrain, 0.0, 1.0);

    vec3 cardBg = vec3(1.0, 1.0, 1.0);
    vec3 baseRgb = mix(cardBg, image.xyz, image.a);
    vec3 imageLum = getLuminance(baseRgb);
    vec3 color = mix(baseRgb, imageLum, distanceFactor);

    gl_FragColor = vec4(color, 1.0);
}
`

type Card = {
    mesh: THREE.Mesh
    material: THREE.ShaderMaterial
    col: number
    row: number
    slot: number
    home: THREE.Vector3
    target: THREE.Vector3
}

class ImageGridScene {
    private container: HTMLElement
    private cfg: Config
    private renderer: THREE.WebGLRenderer
    private scene = new THREE.Scene()

    private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    private geometry = new THREE.PlaneGeometry(1, 1)
    private cards: Card[] = []
    private columns = 1
    private rows = 1
    private baseScale = new THREE.Vector3(1, 1, 1)
    private maxScale = new THREE.Vector3(1, 1, 1)
    private scratch = new THREE.Vector3()

    private textures: (THREE.Texture | null)[] = []
    private sources: string[] = []

    private mouse = new THREE.Vector2()
    private targetMouse = new THREE.Vector2()
    private hover = 0
    private targetHover = 0

    private width = 1
    private height = 1
    private frameId = 0
    private lastT = 0
    private disposed = false
    public onHoverItem?: (item: { name: string; x: number; y: number } | null) => void

    constructor(container: HTMLElement, cfg: Config, onHoverItem?: (item: { name: string; x: number; y: number } | null) => void) {
        this.container = container
        this.onHoverItem = onHoverItem
        this.cfg = cfg

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        this.renderer.setClearColor(0x000000, 0)
        const el = this.renderer.domElement
        el.style.position = "absolute"
        el.style.inset = "0"
        el.style.width = "100%"
        el.style.height = "100%"
        el.style.touchAction = "none"
        container.appendChild(el)

        this.camera.position.z = 5

        el.addEventListener("pointermove", this.onPointerMove)
        el.addEventListener("pointerenter", this.onPointerEnter)
        el.addEventListener("pointerleave", this.onPointerLeave)
        el.addEventListener("pointercancel", this.onPointerLeave)

        this.loadTextures()
    }

    private onPointerMove = (e: PointerEvent) => {
        const rect = this.renderer.domElement.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        this.targetMouse.set(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -(((e.clientY - rect.top) / rect.height) * 2 - 1)
        )
        this.targetHover = 1

        const S = settingsFor(this.cfg)
        let closestCard: Card | null = null
        let minDistance = Infinity

        for (const card of this.cards) {
            const dx = (this.targetMouse.x - card.mesh.position.x) * 0.5 * this.width
            const dy = (this.targetMouse.y - card.mesh.position.y) * 0.5 * this.height
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < minDistance) {
                minDistance = dist
                closestCard = card
            }
        }

        const maxThreshold = S.cell * 0.85
        if (closestCard && minDistance < maxThreshold) {
            const rawItem = this.cfg.images[closestCard.slot]
            const name = nameOf(rawItem)
            if (name) {
                this.onHoverItem?.({
                    name,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
                return
            }
        }
        this.onHoverItem?.(null)
    }

    private onPointerEnter = () => {
        this.targetHover = 1
    }

    private onPointerLeave = () => {
        this.targetHover = 0
        this.onHoverItem?.(null)
    }

    private loadTextures() {
        const sources = sourcesOf(this.cfg)
        this.sources = sources
        this.textures = sources.map(() => null)
        sources.forEach((src, i) => {
            loadTexture(src).then((tex) => {
                if (this.disposed || this.sources[i] !== src) return
                this.textures[i] = tex
                this.applyTexture(i)
            })
        })
    }

    private applyTexture(slot: number) {
        const tex = this.textures[slot]
        if (!tex) return
        const img = tex.image as { width?: number; height?: number } | undefined
        const ia = (img?.width || 1) / (img?.height || 1)
        for (const card of this.cards) {
            if (card.slot !== slot) continue
            card.material.uniforms.uTexture.value = tex
            ;(card.material.uniforms.uCover.value as THREE.Vector2).set(
                ia > 1 ? 1 / ia : 1,
                ia > 1 ? 1 : ia
            )
        }
    }

    private slots: number[][] = []

    private generateRandomSlots(cols: number, rows: number, count: number): number[][] {
        const matrix: number[][] = Array.from({ length: cols }, () => Array(rows).fill(-1))
        if (count <= 1) return matrix.map(c => c.map(() => 0))

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // Collect slots used by neighbors within Chebyshev distance 2
                const forbidden = new Set<number>()
                for (let di = -2; di <= 2; di++) {
                    for (let dj = -2; dj <= 2; dj++) {
                        const ni = i + di
                        const nj = j + dj
                        if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
                            const val = matrix[ni][nj]
                            if (val !== -1) forbidden.add(val)
                        }
                    }
                }

                // Filter candidates not in forbidden set
                let candidates = Array.from({ length: count }, (_, idx) => idx).filter(s => !forbidden.has(s))

                // Fallback to distance 1 if all slots are forbidden
                if (candidates.length === 0) {
                    const forbiddenD1 = new Set<number>()
                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            const ni = i + di
                            const nj = j + dj
                            if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
                                const val = matrix[ni][nj]
                                if (val !== -1) forbiddenD1.add(val)
                            }
                        }
                    }
                    candidates = Array.from({ length: count }, (_, idx) => idx).filter(s => !forbiddenD1.has(s))
                }

                if (candidates.length === 0) {
                    candidates = Array.from({ length: count }, (_, idx) => idx)
                }

                matrix[i][j] = candidates[Math.floor(Math.random() * candidates.length)]
            }
        }
        return matrix
    }

    private slotFor(col: number, row: number): number {
        if (this.slots[col] && this.slots[col][row] !== undefined && this.slots[col][row] >= 0) {
            return this.slots[col][row]
        }
        const n = Math.max(1, this.sources.length || this.textures.length)
        return Math.abs(((col * 73856093) ^ (row * 19349663)) >>> 0) % n
    }

    private build() {
        this.clearCards()
        const S = settingsFor(this.cfg)

        let columns = Math.max(1, Math.floor(this.width / S.cell))
        let rows = Math.max(1, Math.floor(this.height / S.cell))

        while (columns * rows > MAX_CARDS) {
            if (columns >= rows) columns--
            else rows--
        }
        this.columns = columns
        this.rows = rows
        this.resolveScales()
        const numTextures = Math.max(1, this.sources.length || this.textures.length)
        this.slots = this.generateRandomSlots(columns, rows, numTextures)

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                const slot = this.slotFor(i, j)
                const material = new THREE.ShaderMaterial({
                    vertexShader: CARD_VERTEX,
                    fragmentShader: CARD_FRAGMENT,
                    uniforms: {
                        uTexture: { value: this.textures[slot] ?? null },
                        uDistance: { value: 0 },
                        uDrain: { value: S.drain },
                        uCover: { value: new THREE.Vector2(1, 1) },
                    },
                })
                const mesh = new THREE.Mesh(this.geometry, material)
                mesh.scale.copy(this.baseScale)
                const card: Card = {
                    mesh,
                    material,
                    col: i,
                    row: j,
                    slot,
                    home: new THREE.Vector3(),
                    target: new THREE.Vector3(),
                }
                this.cards.push(card)
                this.scene.add(mesh)
            }
        }

        this.resolveHomes()
        for (const card of this.cards) {
            if (!this.cfg.assemble) card.mesh.position.copy(card.home)
            else card.mesh.position.set(0, 0, 0)
        }
        for (let i = 0; i < this.textures.length; i++) this.applyTexture(i)
    }

    private resolveScales() {
        const S = settingsFor(this.cfg)
        const aspect = Math.max(1e-3, this.width / Math.max(1, this.height))
        const columnWidth = 2 / this.columns
        const w = columnWidth * S.fill
        this.baseScale.set(w, w * aspect, 1)
        const portrait = this.width < this.height
        this.maxScale
            .copy(this.baseScale)
            .multiplyScalar(portrait ? S.magnify * 0.5 : S.magnify)
    }

    private resolveHomes() {
        const cellW = 2 / this.columns
        const cellH = 2 / this.rows
        for (const card of this.cards) {
            card.home.set(
                -1 + (card.col + 0.5) * cellW,
                -1 + (card.row + 0.5) * cellH,
                0
            )
        }
    }

    setSize(width: number, height: number) {
        if (this.disposed) return
        const S = settingsFor(this.cfg)
        this.width = Math.max(1, width)
        this.height = Math.max(1, height)
        this.renderer.setSize(this.width, this.height, false)

        const columns = Math.max(1, Math.floor(this.width / S.cell))
        const rows = Math.max(1, Math.floor(this.height / S.cell))

        if (columns !== this.columns || rows !== this.rows || !this.cards.length) {
            this.build()
        } else {
            this.resolveScales()
            this.resolveHomes()
        }
    }

    updateConfig(cfg: Config) {
        if (this.disposed) return
        const prev = this.cfg
        this.cfg = cfg
        const S = settingsFor(cfg)
        for (const card of this.cards) {
            card.material.uniforms.uDrain.value = S.drain
        }

        if (sourcesOf(cfg).join("|") !== sourcesOf(prev).join("|")) {
            this.loadTextures()
            this.build()
        } else if (
            cfg.cell !== prev.cell ||
            cfg.assemble !== prev.assemble
        ) {
            this.build()
        } else {
            this.resolveScales()
            this.resolveHomes()
        }
    }

    start() {
        this.lastT = performance.now()
        const loop = () => {
            this.frameId = requestAnimationFrame(loop)
            this.step()
        }
        this.frameId = requestAnimationFrame(loop)
    }

    private step() {
        if (this.disposed) return
        const now = performance.now()
        let dt = (now - this.lastT) / 1000
        this.lastT = now
        if (!isFinite(dt) || dt < 0) dt = 0

        if (dt > 0.05) dt = 0.05

        const S = settingsFor(this.cfg)

        this.mouse.lerp(this.targetMouse, 1 - Math.pow(0.0125, dt))
        this.hover += (this.targetHover - this.hover) * (1 - Math.exp(-dt * 5))

        const positionRate = 1 - Math.pow(0.005 / this.columns, dt)
        const scaleRate = 1 - Math.pow(0.0002, dt)

        for (const card of this.cards) {
            const mesh = card.mesh

            const dx = (this.mouse.x - mesh.position.x) * 0.5 * this.width
            const dy = (this.mouse.y - mesh.position.y) * 0.5 * this.height
            const reach = Math.sqrt(dx * dx + dy * dy) / S.radius

            this.scratch.lerpVectors(
                this.baseScale,
                this.maxScale,
                falloffAt(reach) * this.hover
            )
            mesh.scale.lerp(this.scratch, scaleRate)

            const distance = reach * reach

            mesh.position.z = -distance
            card.material.uniforms.uDistance.value = distance

            const settledX = Math.abs(card.home.x - mesh.position.x) < 0.075
            card.target.set(
                card.home.x,
                settledX ? card.home.y : 0,
                mesh.position.z
            )
            mesh.position.lerp(card.target, positionRate)
        }

        this.renderer.render(this.scene, this.camera)
    }

    private clearCards() {
        for (const card of this.cards) {
            this.scene.remove(card.mesh)
            card.material.dispose()
        }
        this.cards = []
    }

    dispose() {
        this.disposed = true
        cancelAnimationFrame(this.frameId)
        const el = this.renderer.domElement
        el.removeEventListener("pointermove", this.onPointerMove)
        el.removeEventListener("pointerenter", this.onPointerEnter)
        el.removeEventListener("pointerleave", this.onPointerLeave)
        el.removeEventListener("pointercancel", this.onPointerLeave)
        this.clearCards()
        this.geometry.dispose()
        this.renderer.dispose()
        if (el.parentNode === this.container) this.container.removeChild(el)

    }
}

export interface ImageGridProps {
    images?: ImageValue[]
    cell?: number
    cardSize?: number
    magnify?: number
    radius?: number
    drain?: number
    assemble?: boolean
    showTooltip?: boolean
    style?: React.CSSProperties
}

export default function ImageGrid(props: ImageGridProps) {
    const {
        images = DEFAULTS.images,
        cell = DEFAULTS.cell,
        cardSize = DEFAULTS.cardSize,
        magnify = DEFAULTS.magnify,
        radius = DEFAULTS.radius,
        drain = DEFAULTS.drain,
        assemble = DEFAULTS.assemble,
        showTooltip = true,
        style,
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<ImageGridScene | null>(null)
    const cfgRef = useRef<Config>(null as any)
    cfgRef.current = { images, cell, cardSize, magnify, radius, drain, assemble }
    const [tooltip, setTooltip] = React.useState<{ name: string; x: number; y: number } | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        let scene: ImageGridScene
        try {
            scene = new ImageGridScene(container, cfgRef.current, (info) => {
                setTooltip(info)
            })
        } catch {
            return
        }
        sceneRef.current = scene
        scene.setSize(container.clientWidth, container.clientHeight)
        scene.start()

        const ro = new ResizeObserver(() => {
            scene.setSize(container.clientWidth, container.clientHeight)
        })
        ro.observe(container)
        return () => {
            ro.disconnect()
            scene.dispose()
            sceneRef.current = null
        }
    }, [])

    useEffect(() => {
        sceneRef.current?.updateConfig(cfgRef.current)
    }, [
        Array.isArray(images) ? images.map(srcOf).join("|") : "",
        cell,
        cardSize,
        magnify,
        radius,
        drain,
        assemble,
    ])

    return (
        <div
            ref={containerRef}
            role="img"
            aria-label="Grid of photographs that swell under the pointer"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 120,
                minHeight: 120,
                overflow: "hidden",
                ...style,
            }}
        >
            {showTooltip && tooltip && (
                <div
                    className="pointer-events-none absolute z-30 transition-all duration-75 ease-out select-none will-change-transform"
                    style={{
                        left: `${tooltip.x + 20}px`,
                        top: `${tooltip.y - 14}px`,
                        transform: "rotate(4deg)",
                    }}
                >
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-[0_12px_28px_rgba(15,23,42,0.16),0_2px_8px_rgba(15,23,42,0.08)] border border-slate-200/90 whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-slate-900 shadow-sm" />
                        <span className="tracking-wide text-slate-900 font-sans font-bold">{tooltip.name}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

ImageGrid.displayName = "Image Grid"