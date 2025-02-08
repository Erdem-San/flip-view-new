
import { auth } from "@wix/essentials";
import { webMethod, Permissions } from '@wix/code/web-methods';
import { appInstances } from "@wix/app-management";

export const getAppInstance = webMethod(Permissions.Anyone, async () => {
    try {
        const { instance: appInstance } = await auth.elevate(
          appInstances.getAppInstance
        )();
        return Response.json(appInstance);
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
});