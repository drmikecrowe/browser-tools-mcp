export interface IdentityResponse {
  name: string;
  version: string;
  signature: string;
}

export interface WipeLogsPayload {}
export interface WipeLogsResponse {
  success: boolean;
}

export interface UpdateServerPayload {
  url: string;
}
export interface UpdateServerResponse {
  success: boolean;
}

export interface ValidateServerResponse {
  valid: boolean;
  identity: string;
}

export interface ScreenshotPayload {
  image: string;
}
export interface ScreenshotResponse {
  success: boolean;
}

export interface ConnectorPayload {
  message: string;
}
export interface ConnectorResponse {
  received: boolean;
}
