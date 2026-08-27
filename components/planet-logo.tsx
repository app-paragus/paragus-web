"use client";

import { useEffect, useRef, useState } from "react";
import { ParagusLogo } from "./icons";

/* The Paragus logo as a true 3D planet: a ray-traced sphere (WebGL,
   no dependencies) with the artwork wrapped around its equatorial
   band, spinning on a tilted vertical axis. The eyes blink in the
   shader, on the curved surface. Falls back to the flat logo where
   WebGL is unavailable. */

const VERT = `
attribute vec2 aPos;
varying vec2 vP;
void main() {
  vP = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vP;
uniform sampler2D uTex;
uniform float uTime;

const float PI = 3.141592653589793;
const float BAND = 1.5708; /* pole to pole: the artwork covers the whole sphere */

/* Eyelid coverage for one eye: an ellipse in image space whose lids
   close from top and bottom toward the centre on a periodic pulse. */
float lid(vec2 p, vec2 c, vec2 r, float ang, float period, float phase) {
  vec2 d = p - c;
  float ca = cos(ang), sa = sin(ang);
  d = vec2(ca * d.x - sa * d.y, sa * d.x + ca * d.y);
  vec2 q = d / r;
  float inside = 1.0 - smoothstep(0.85, 1.0, length(q));
  float ph = fract(uTime / period + phase);
  float closure = smoothstep(0.90, 0.94, ph) * (1.0 - smoothstep(0.955, 0.995, ph));
  float openHalf = 1.0 - 1.25 * closure;
  float covered = smoothstep(openHalf, openHalf + 0.15, abs(q.y));
  return inside * covered;
}

void main() {
  float r2 = dot(vP, vP);
  float r = sqrt(r2);
  float edge = 1.0 - smoothstep(0.985, 1.0, r);
  if (edge <= 0.0) { gl_FragColor = vec4(0.0); return; }

  /* sphere normal at this pixel (orthographic) */
  float z = sqrt(max(1.0 - r2, 0.0));
  vec3 n = vec3(vP, z);

  /* axial tilt, then spin around the vertical axis */
  float ct = cos(-0.18), st = sin(-0.18);
  vec3 nt = vec3(ct * n.x - st * n.y, st * n.x + ct * n.y, n.z);
  float ang = -uTime * (2.0 * PI / 12.0);
  float cs = cos(ang), sn = sin(ang);
  vec3 ns = vec3(cs * nt.x + sn * nt.z, nt.y, -sn * nt.x + cs * nt.z);

  float lon = atan(ns.x, ns.z);
  float lat = asin(clamp(ns.y, -1.0, 1.0));
  float u = lon / (2.0 * PI) + 0.5;
  float fy = 0.5 - lat / (2.0 * BAND);

  /* the planet skin is a seamless equirect texture (u wraps in hardware) */
  vec2 f = vec2(u, fy);
  vec3 col = texture2D(uTex, f).rgb;

  /* blinking eyes on the two hero knots baked into the skin */
  vec3 socket = vec3(0.028, 0.028, 0.034);
  col = mix(col, socket, lid(f, vec2(0.2516, 0.5327), vec2(0.0559, 0.0623), 0.0, 5.5, 0.47));
  col = mix(col, socket, lid(f, vec2(0.2473, 0.3695), vec2(0.0301, 0.0378), 0.0, 3.8, 0.21));
  col = mix(col, socket, lid(f, vec2(0.3349, 0.5138), vec2(0.0211, 0.0335), 0.1745, 4.6, 0.37));
  col = mix(col, socket, lid(f, vec2(0.2838, 0.7029), vec2(0.0290, 0.0451), 0.2443, 3.2, 0.0));
  col = mix(col, socket, lid(f, vec2(0.7691, 0.5718), vec2(0.0559, 0.0623), 0.0, 5.5, 0.87));
  col = mix(col, socket, lid(f, vec2(0.7648, 0.4085), vec2(0.0301, 0.0378), 0.0, 3.8, 0.61));
  col = mix(col, socket, lid(f, vec2(0.8525, 0.5529), vec2(0.0211, 0.0335), 0.1745, 4.6, 0.77));
  col = mix(col, socket, lid(f, vec2(0.8014, 0.7420), vec2(0.0290, 0.0451), 0.2443, 3.2, 0.40));

  /* key light upper-left, ambient floor, small specular */
  vec3 L = normalize(vec3(-0.45, 0.5, 0.75));
  float diff = max(dot(n, L), 0.0);
  float light = 0.18 + 0.95 * diff;
  vec3 R = reflect(-L, n);
  float spec = pow(max(R.z, 0.0), 28.0) * 0.10;
  vec3 outc = col * light + vec3(spec);

  gl_FragColor = vec4(outc * edge, edge);
}
`;

export function PlanetLogo({ size = 150 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setFailed(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[paragus] shader error:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");

    /* transparent 1x1 placeholder until the artwork loads */
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 13, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    const draw = (tSec: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, tSec);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (reduced) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const img = new Image();
    img.src = "/paragus-planet.png";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      if (reduced) draw(0);
    };

    return () => {
      cancelAnimationFrame(raf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [size]);

  if (failed) return <ParagusLogo size={size} />;
  return <canvas ref={canvasRef} className="planet-halo" style={{ width: size, height: size }} aria-hidden="true" />;
}
