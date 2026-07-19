"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/* Particle & scene types                                              */
/* ------------------------------------------------------------------ */

interface Ember {
  x: number;
  y: number;
  radius: number;
  /** Upward speed in px/frame (positive value, subtracted from y). */
  riseSpeed: number;
  /** Horizontal drift in px/frame. */
  drift: number;
  /** Peak opacity this ember reaches (≤ 0.55). */
  peakAlpha: number;
  /** Current opacity. */
  alpha: number;
  /** Fade-in rate per frame until peak is reached. */
  fadeIn: number;
  /** 0 = warm amber, 1 = deep orange — picks the color channel mix. */
  hueMix: number;
  /** Phase offset for subtle drift oscillation. */
  wobble: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** Total lifespan in frames. */
  life: number;
  /** Frames lived so far. */
  age: number;
}

interface AtmospherePool {
  /** Anchor position as a fraction of canvas size. */
  anchorX: number;
  anchorY: number;
  /** Sinusoidal drift period in ms. */
  periodX: number;
  periodY: number;
  /** Phase offsets so the two pools never sync. */
  phaseX: number;
  phaseY: number;
  /** Radius as a fraction of canvas width (0.25–0.35). */
  radiusFactor: number;
}

interface LightShaft {
  /** Apex x as a fraction of canvas width (near top-center). */
  apexX: number;
  /** Top width as a fraction of canvas width. */
  topWidth: number;
  /** Bottom spread as a fraction of canvas width. */
  bottomWidth: number;
  /** Sway period in ms (8–14 s). */
  swayPeriod: number;
  /** Phase offset so the shafts stagger. */
  swayPhase: number;
  /** Max sway in radians (≈ ±2°). */
  swayAmplitude: number;
}

interface SceneState {
  embers: Ember[];
  sparks: Spark[];
  pools: AtmospherePool[];
  shafts: LightShaft[];
  /** Timestamp (ms) at which the next spark burst fires. */
  nextBurstAt: number;
  /** Logical (CSS pixel) canvas size. */
  width: number;
  height: number;
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const EMBER_COUNT = 50;
const EMBER_PEAK_ALPHA = 0.55;
const SPARK_GRAVITY = 0.045;
const SPARK_DECEL = 0.88;
const BURST_MIN_DELAY = 2500;
const BURST_MAX_DELAY = 4500;

const rand = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

/* ------------------------------------------------------------------ */
/* Factories                                                           */
/* ------------------------------------------------------------------ */

function createEmber(width: number, height: number, initial: boolean): Ember {
  return {
    x: Math.random() * width,
    // Initial fill scatters embers across the canvas so the scene starts
    // "already alive"; respawns always start at the bottom edge.
    y: initial ? Math.random() * height : height + rand(2, 14),
    radius: Math.random() * 2.5 + 0.8,
    riseSpeed: rand(0.3, 0.9),
    drift: rand(-0.15, 0.15),
    peakAlpha: rand(0.25, 1) * EMBER_PEAK_ALPHA,
    alpha: 0,
    fadeIn: rand(0.004, 0.012),
    hueMix: Math.random(),
    wobble: Math.random() * Math.PI * 2,
  };
}

function createSparkBurst(width: number, height: number): Spark[] {
  const originX = rand(width * 0.1, width * 0.9);
  // Lower 60% of the canvas.
  const originY = rand(height * 0.4, height * 0.96);
  // Cone points generally upward with ±35° spread.
  const coneCenter = -Math.PI / 2;
  const spread = (35 * Math.PI) / 180;
  const count = Math.floor(rand(8, 15));

  const sparks: Spark[] = [];
  for (let i = 0; i < count; i++) {
    const angle = coneCenter + rand(-spread, spread);
    const speed = rand(3, 7);
    sparks.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: rand(1, 2),
      life: Math.floor(rand(28, 41)),
      age: 0,
    });
  }
  return sparks;
}

function createScene(width: number, height: number, now: number): SceneState {
  const embers: Ember[] = [];
  for (let i = 0; i < EMBER_COUNT; i++) {
    embers.push(createEmber(width, height, true));
  }

  const pools: AtmospherePool[] = [
    {
      anchorX: 0.24,
      anchorY: 0.52,
      periodX: rand(12000, 18000),
      periodY: rand(12000, 18000),
      phaseX: rand(0, Math.PI * 2),
      phaseY: rand(0, Math.PI * 2),
      radiusFactor: rand(0.25, 0.35),
    },
    {
      anchorX: 0.76,
      anchorY: 0.46,
      periodX: rand(12000, 18000),
      periodY: rand(12000, 18000),
      phaseX: rand(0, Math.PI * 2),
      phaseY: rand(0, Math.PI * 2),
      radiusFactor: rand(0.25, 0.35),
    },
  ];

  const shafts: LightShaft[] = [-1, 0, 1].map((offset, i) => ({
    apexX: 0.5 + offset * rand(0.06, 0.1),
    topWidth: rand(0.02, 0.04),
    bottomWidth: rand(0.15, 0.25),
    swayPeriod: rand(8000, 14000),
    swayPhase: (i * Math.PI * 2) / 3 + rand(0, 0.8),
    swayAmplitude: (2 * Math.PI) / 180,
  }));

  return {
    embers,
    sparks: [],
    pools,
    shafts,
    nextBurstAt: now + rand(600, 1800),
    width,
    height,
  };
}

/* ------------------------------------------------------------------ */
/* Layer renderers                                                     */
/* ------------------------------------------------------------------ */

function drawAtmospherePools(
  ctx: CanvasRenderingContext2D,
  scene: SceneState,
  now: number
): void {
  ctx.save();
  const { width, height } = scene;
  const ampX = width * 0.08;
  const ampY = height * 0.08;

  for (const pool of scene.pools) {
    const cx =
      pool.anchorX * width +
      Math.sin((now / pool.periodX) * Math.PI * 2 + pool.phaseX) * ampX;
    const cy =
      pool.anchorY * height +
      Math.sin((now / pool.periodY) * Math.PI * 2 + pool.phaseY) * ampY;
    const radius = pool.radiusFactor * width;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, "rgba(180, 100, 20, 0.06)");
    gradient.addColorStop(0.55, "rgba(180, 100, 20, 0.03)");
    gradient.addColorStop(1, "rgba(180, 100, 20, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawLightShafts(
  ctx: CanvasRenderingContext2D,
  scene: SceneState,
  now: number
): void {
  ctx.save();
  const { width, height } = scene;
  ctx.fillStyle = "rgba(255, 210, 100, 0.028)";

  for (const shaft of scene.shafts) {
    const sway =
      Math.sin((now / shaft.swayPeriod) * Math.PI * 2 + shaft.swayPhase) *
      shaft.swayAmplitude;

    const apexX = shaft.apexX * width;
    const apexY = -height * 0.02; // just above the visible edge
    const halfTop = (shaft.topWidth * width) / 2;
    const halfBottom = (shaft.bottomWidth * width) / 2;
    // Sway translates the base sideways — a shear read as a rotation.
    const baseShift = Math.tan(sway) * height;
    const baseX = apexX + baseShift;

    ctx.beginPath();
    ctx.moveTo(apexX - halfTop, apexY);
    ctx.lineTo(apexX + halfTop, apexY);
    ctx.lineTo(baseX + halfBottom, height);
    ctx.lineTo(baseX - halfBottom, height);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function updateAndDrawEmbers(
  ctx: CanvasRenderingContext2D,
  scene: SceneState
): void {
  ctx.save();
  ctx.shadowBlur = 6;
  ctx.shadowColor = "rgba(255, 150, 30, 0.6)";
  const { width, height } = scene;
  const fadeCeiling = height / 3;

  for (let i = 0; i < scene.embers.length; i++) {
    const ember = scene.embers[i];

    // Physics.
    ember.wobble += 0.01;
    ember.y -= ember.riseSpeed;
    ember.x += ember.drift + Math.sin(ember.wobble) * 0.08;

    // Opacity: fade in toward peak, fade out once inside the top third.
    if (ember.y > fadeCeiling) {
      ember.alpha = Math.min(ember.peakAlpha, ember.alpha + ember.fadeIn);
    } else {
      const fadeZone = Math.max(fadeCeiling, 1);
      ember.alpha = ember.peakAlpha * Math.max(ember.y / fadeZone, 0);
    }

    // Respawn when dead or fully above the canvas.
    if (ember.y < -ember.radius || (ember.y < fadeCeiling && ember.alpha <= 0.005)) {
      scene.embers[i] = createEmber(width, height, false);
      continue;
    }
    // Wrap gentle horizontal escape.
    if (ember.x < -4) ember.x = width + 4;
    else if (ember.x > width + 4) ember.x = -4;

    if (ember.alpha <= 0) continue;

    // Color mix between warm gold and deep orange, per particle.
    const r = 255;
    const g = Math.round(185 - (185 - 130) * ember.hueMix);
    const b = Math.round(40 - (40 - 20) * ember.hueMix);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${ember.alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function updateAndDrawSparks(
  ctx: CanvasRenderingContext2D,
  scene: SceneState,
  now: number
): void {
  ctx.save();

  // Schedule bursts off the RAF clock — no timers.
  if (now >= scene.nextBurstAt) {
    scene.sparks.push(...createSparkBurst(scene.width, scene.height));
    scene.nextBurstAt = now + rand(BURST_MIN_DELAY, BURST_MAX_DELAY);
  }

  for (let i = scene.sparks.length - 1; i >= 0; i--) {
    const spark = scene.sparks[i];
    spark.age += 1;
    if (spark.age >= spark.life) {
      scene.sparks.splice(i, 1);
      continue;
    }

    spark.vx *= SPARK_DECEL;
    spark.vy = spark.vy * SPARK_DECEL + SPARK_GRAVITY;
    spark.x += spark.vx;
    spark.y += spark.vy;

    const alpha = 1 - spark.age / spark.life;
    ctx.fillStyle = `rgba(255, 255, 210, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ArenaCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const sceneRef = useRef<SceneState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const configure = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = Math.max(Math.round(width * dpr), 1);
      canvas.height = Math.max(Math.round(height * dpr), 1);
      // Draw in CSS-pixel space; the transform maps to device pixels for HD.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sceneRef.current = createScene(width, height, performance.now());
    };

    configure();

    const observer = new ResizeObserver(() => {
      configure();
    });
    observer.observe(canvas);

    const tick = (now: number): void => {
      const scene = sceneRef.current;
      if (scene) {
        ctx.clearRect(0, 0, scene.width, scene.height);
        ctx.globalCompositeOperation = "source-over";
        drawAtmospherePools(ctx, scene, now);
        drawLightShafts(ctx, scene, now);
        updateAndDrawEmbers(ctx, scene);
        updateAndDrawSparks(ctx, scene, now);
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        willChange: "transform",
        pointerEvents: "none",
      }}
    />
  );
}
