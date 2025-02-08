# Bu bir örnek kod #

### backend>api>shipping-data>api.ts ###

import { appInstances } from "@wix/app-management";
import { getAppData, updateAppDate } from "../../database";
import { isPremiumInstance } from "../../appInstance";

export async function GET(req: Request) {
  const appInstance = (await appInstances.getAppInstance()).instance;
  const isPremium = appInstance && isPremiumInstance(appInstance);
  const appData = getAppData({ isPremium });

  return Response.json(appData);
}

export async function POST(req: Request) {
  const data = await req.json();

  updateAppDate(data);

  return Response.json(data);
}

### backend>appInstance.ts ###

import { auth } from "@wix/essentials";
import { appInstances } from "@wix/app-management";

export async function getAppInstanceElevated(): Promise<
  appInstances.AppInstance | undefined
> {
  try {
    const { instance: appInstance } = await auth.elevate(
      appInstances.getAppInstance
    )();

    return appInstance;
  } catch (error) {
    console.log("Failed loading app instance", error);
  }
}

export function isPremiumInstance(
  appInstance: appInstances.AppInstance
): boolean {
  return !!appInstance.billing && !appInstance.isFree;
}

### backend>database.ts ###

import { DEFAULT_APP_DATA, PREMIUM_APP_DATA } from "../consts";
import type { ShippingAppData } from "../types";

export const getAppData = ({ isPremium = false }: { isPremium?: boolean }) => {
  return isPremium ? PREMIUM_APP_DATA : DEFAULT_APP_DATA;
};

export const updateAppDate = (updatedData: ShippingAppData) => {
  console.log("Data updated", updatedData);
};

### frontend>src>dashboard>use-shipping-app-data.tsx ###

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@wix/essentials";
import type { ShippingAppData } from "../../types";
import { DEFAULT_APP_DATA } from "../../consts";

const queryKey = ["shipping-app-data"];

export const useShippingAppData = () => {
  const queryClient = useQueryClient();

  const getShippingAppData = useQuery<ShippingAppData>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await httpClient.fetchWithAuth(
          `${import.meta.env.BASE_API_URL}/shipping-data`
        );

        return response.json();
      } catch (error) {
        console.log("error fetching data:", error);

        return DEFAULT_APP_DATA;
      }
    },
  });

  const setShippingAppData = useMutation({
    mutationFn: async (newData: ShippingAppData) => {
      return httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/shipping-data`,
        {
          method: "POST",
          body: JSON.stringify(newData),
        }
      );
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    getShippingAppData,
    setShippingAppData,
  };
};



# Bu benim çalışmayan kodum #

### backend>api>get-app-instance>api.ts ###

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
    return null;
  }
}


### frontend>src>site>element.tsx ###


import { httpClient } from "@wix/essentials";

async function fetchAppInstanceData() {
  try {
    const response = await httpClient.fetchWithAuth(
      `${import.meta.env.BASE_API_URL}/get-app-instances`
    );

    return response.json();
  } catch (error) {
    console.log("error fetching data:", error);
  }
}

const CustomElement: FC<Props> = (props) => {
fetchAppInstanceData().then((result) => console.log(result));
...