"use client";

import { initializePaddle as initPaddle } from "@paddle/paddle-js";

let paddleInstance: Awaited<ReturnType<typeof initPaddle>> | null = null;

export async function initializePaddle() {
  if (typeof window === "undefined") return null;

  if (paddleInstance) return paddleInstance;

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  if (!token) {
    console.error("Missing Paddle token");
    return null;
  }

  paddleInstance = await initPaddle({
    token,
  });

  return paddleInstance;
}