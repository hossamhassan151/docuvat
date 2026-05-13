"use client";

import { Paddle } from "@paddle/paddle-js";

declare global {
  interface Window {
    Paddle?: Paddle;
  }
}

const PADDLE_CLIENT_TOKEN = process.env
  .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string;

export async function initializePaddle() {
  if (typeof window === "undefined") return null;

  const { initializePaddle: initPaddle } = await import(
    "@paddle/paddle-js"
  );

  const paddle = await initPaddle({
    token: PADDLE_CLIENT_TOKEN,
  });

  return paddle;
}