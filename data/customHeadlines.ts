// data/customHeadlines.ts

export const customHeadlines: Record<string, string> = {
  // Format: "Original Exact Title": "Your Better Version"
  
  "Richmond County considers big tax hike": "CSRA Homeowners Could See 18% Property Tax Increase Next Year",
  "Augusta Commissioners vote on new budget": "Augusta City Commission Just Approved a Controversial New Budget",
  
  // Add more as you go...
};

export function rewriteHeadline(originalTitle: string): string {
  return customHeadlines[originalTitle] || originalTitle;
}