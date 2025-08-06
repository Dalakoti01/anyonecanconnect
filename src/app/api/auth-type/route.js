export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (token) {
      return Response.json({
        authType: "custom",
        success: true,
      });
    }

    return Response.json({
      authType: "google",
      success: true,
    });
  } catch (error) {
    console.error("Error determining auth type:", error);
    return Response.json(
      {
        message: "Failed to determine authentication type",
        success: false,
      },
      { status: 500 }
    );
  }
}
