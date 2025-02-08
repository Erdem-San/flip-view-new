import { auth } from "@wix/essentials";
import { appInstances } from "@wix/app-management";

export async function GET(req: Request) {
  try {
    const { instance: appInstance } = await auth.elevate(
      appInstances.getAppInstance
    )();
    return Response.json(appInstance);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: "Instance alınamadı" },
      { status: 500 }
    );
  }
}