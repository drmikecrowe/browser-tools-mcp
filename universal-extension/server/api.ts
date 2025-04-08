import type { 
  IdentityResponse,
  WipeLogsPayload,
  WipeLogsResponse,
  UpdateServerPayload,
  UpdateServerResponse,
  ValidateServerResponse,
  ScreenshotPayload,
  ScreenshotResponse,
  ConnectorPayload,
  ConnectorResponse
} from "./types";

/**
 * Fetch identity from the server
 */
export async function getIdentity(host: string, port: number): Promise<IdentityResponse> {
  const response = await fetch(`http://${host}:${port}/identity`);
  if (!response.ok) {
    throw new Error(`Failed to fetch identity: ${response.statusText}`);
  }
  const data: IdentityResponse = await response.json();
  return data;
}

/**
 * Send a request to wipe logs on the server
 */
export async function wipeLogs(serverUrl: string, payload?: WipeLogsPayload): Promise<WipeLogsResponse> {
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload || {})
  });
  if (!response.ok) {
    throw new Error(`Failed to wipe logs: ${response.statusText}`);
  }
  const data: WipeLogsResponse = await response.json();
  return data;
}

/**
 * Update the server with a new URL
 */
export async function updateServer(serverUrl: string, payload: UpdateServerPayload): Promise<UpdateServerResponse> {
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Failed to update server: ${response.statusText}`);
  }
  const data: UpdateServerResponse = await response.json();
  return data;
}

/**
 * Validate the server response
 */
export async function validateServer(serverUrl: string): Promise<ValidateServerResponse> {
  try {
    const response = await fetch(serverUrl);
    if (!response.ok) {
      throw new Error(`Server validation failed: ${response.statusText}`);
    }
    const responseText = await response.text();
    const data: ValidateServerResponse = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.error(`Error validating server at ${serverUrl}:`, error);
    throw error;
  }
}

/**
 * Capture screenshot and send to the server
 */
export async function captureAndSendScreenshot(serverUrl: string, payload: ScreenshotPayload): Promise<ScreenshotResponse> {
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Failed to capture and send screenshot: ${response.statusText}`);
  }
  const data: ScreenshotResponse = await response.json();
  return data;
}

/**
 * Send message to the connector
 */
export async function sendToConnector(serverUrl: string, payload: ConnectorPayload): Promise<ConnectorResponse> {
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Failed to send to connector: ${response.statusText}`);
  }
  const data: ConnectorResponse = await response.json();
  return data;
}
