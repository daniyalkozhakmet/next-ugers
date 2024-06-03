import React from "react";
import { ClaimType, ClaimsGetResponse } from "@/lib/ts/claim";
import { headers } from "next/headers";
import { formatDate } from "@/lib/features/claim/claimActions";
import { ParamType } from "@/middleware";
import ProtectedAdmin from "@/app/components/secure/ProtectedAdmin";
import { ClaimsTable } from "@/app/components/claim/ClaimsTable";
import { SearchClaimsByRes } from "@/app/components/claim/SearchClaimsByRes";

const fetchClaims = async (params: ParamType | null) => {
  try {
    if (params) {
      const result = await fetch(
        `${process.env.VERCEL_URL}/api/claims?res=${params.res}`,
        {
          next: { tags: ["claims"] },
          headers: Object.fromEntries(headers()),
        }
      );

      if (!result.ok) {
        throw new Error("Failed to fetch");
      }

      return result;
    }
    const result = await fetch(
      `${process.env.VERCEL_URL}/api/claims`,
      {
        next: { tags: ["Claims"] },
        headers: Object.fromEntries(headers()),
      }
    );

    if (!result.ok) {
      throw new Error("Failed to fetch");
    }

    return result;
  } catch (error) {
    throw error;
  }
};
export default async function Claims() {
  const heads = headers();

  // const pathname = heads.get("next-url");
  const params: ParamType | null = heads.get("x-params")
    ? JSON.parse(heads.get("x-params") || "")
    : null;

  const data = await fetchClaims(params);

  const claims: ClaimsGetResponse = await data.json();
  let convertedClaim: ClaimType[] = [];
  if (claims.data?.claims) {
    convertedClaim = claims.data.claims.map((claim) => ({
      ...claim,
      date_of_excavation: formatDate(claim.date_of_excavation),
      date_of_sending: formatDate(claim.date_of_sending),
      date_of_fixing: claim.date_of_fixing && formatDate(claim.date_of_fixing),
      date_of_obtaing_fail:
        claim.date_of_obtaing_fail && formatDate(claim.date_of_obtaing_fail),

      date_of_sending_claim_by_obtaining_fail:
        claim.date_of_sending_claim_by_obtaining_fail &&
        formatDate(claim.date_of_sending_claim_by_obtaining_fail),

      date_of_signing:
        claim.date_of_signing && formatDate(claim.date_of_signing),

      date_recovery_ABP:
        claim.date_recovery_ABP && formatDate(claim.date_recovery_ABP),
    }));
  }
  return (
    <ProtectedAdmin>
      <>
        <h1>Заявки по РЭС</h1>
        {claims.data && (
          <>
            <SearchClaimsByRes />
            <ClaimsTable
              claims={convertedClaim}
              pagination={claims.data.pagination}
            />
          </>
        )}
      </>
    </ProtectedAdmin>
  );
}
