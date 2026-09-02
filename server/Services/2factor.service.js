const TWOFACTOR_BASE_URL = "https://2factor.in/API/V1";

const apiKey = process.env.TWOFACTOR_API_KEY;

if (!apiKey) {
  throw new Error("TWOFACTOR_API_KEY is not configured");
}

export const sendOtp = async (phoneNumber) => {
  const url = `${TWOFACTOR_BASE_URL}/${apiKey}/SMS/${phoneNumber}/AUTOGEN`;

  const response = await fetch(url);

  const data = await response.json();

  console.log("2Factor Send OTP:", {
    status: response.status,
    data,
  });

  if (!response.ok || data.Status !== "Success") {
    const error = new Error(
      data.Details || "Failed to send OTP"
    );

    error.statusCode = response.status || 500;

    throw error;
  }

  return data;
};

export const verifyOtp = async (sessionId, otp) => {
  const url = `${TWOFACTOR_BASE_URL}/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`;

  const response = await fetch(url);

  const data = await response.json();

  console.log("2Factor Verify OTP:", {
    status: response.status,
    data,
  });

  if (!response.ok || data.Status !== "Success") {
    return false;
  }

  return true;
};