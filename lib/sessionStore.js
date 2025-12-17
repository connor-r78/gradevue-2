import crypto from "crypto";
import { redis } from "./redis";

const SESSION_TTL = 60 * 30; // 30 minutes

export async function createSession(studentVueCookies) {
  const sessionId = crypto.randomUUID();

  await redis.set(
    `sv:session:${sessionId}`,
    studentVueCookies,
    { ex: SESSION_TTL }
  );

  return sessionId;
}

export async function getSession(sessionId) {
  return redis.get(`sv:session:${sessionId}`);
}

export async function destroySession(sessionId) {
  await redis.del(`sv:session:${sessionId}`);
}

