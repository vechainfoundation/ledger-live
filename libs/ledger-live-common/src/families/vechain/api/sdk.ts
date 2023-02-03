import { getEnv } from "../../../env";
import network from "../../../network";
import { AccountResponse, VetTxsQuery } from "./types";
import type { Operation } from "@ledgerhq/types-live";
import { mapVetTransfersToOperations } from "../utils/mapping-utils";

const BASE_URL = getEnv("API_VECHAIN_THOREST");

export const getAccount = async (address: string): Promise<AccountResponse> => {
  const { data } = await network({
    method: "GET",
    url: `${BASE_URL}/accounts/${address}`,
  });

  return data;
};

export const getOperations = async (
  accountId: string,
  addr: string,
  startAt: number
): Promise<Operation[]> => {
  const query: VetTxsQuery = {
    range: {
      unit: "block",
      from: startAt,
    },
    criteriaSet: [{ sender: addr }, { recipient: addr }],
    order: "desc",
  };

  const { data } = await network({
    method: "POST",
    url: `${BASE_URL}/logs/transfer`,
    data: JSON.stringify(query),
  });

  return mapVetTransfersToOperations(data, accountId, addr);
};
