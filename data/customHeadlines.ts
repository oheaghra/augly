// data/customHeadlines.ts

export const customHeadlines: Record<string, string> = {
  // Format: "Original Exact Title": "Your Better Version"
  
  "Richmond County considers big tax hike": "CSRA Homeowners Could See 18% Property Tax Increase Next Year",
  "Augusta Commissioners vote on new budget": "Augusta City Commission Just Approved a Controversial New Budget",
  "First Tee Augusta girls experience the magic of the Masters": "Girls annoy golfers"

  // Add more as you go...
};

export function rewriteHeadline(originalTitle: string): string {
  return customHeadlines[originalTitle] || originalTitle;
}