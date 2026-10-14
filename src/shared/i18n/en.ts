import type { messages as ko } from "@/shared/i18n/ko";

// typeof ko로 선언해 한국어에 있는 키가 빠지면 컴파일 오류가 나게 한다.
export const messages: typeof ko = {
  common: {
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    cancelEdit: "Cancel editing",
    reset: "Reset",
    searchResult: "Search results: {{resultCount}} / Total: {{totalCount}}",
    actions: "Actions",
    processing: "Processing...",
    networkError:
      "Unable to connect to the server. Please check your connection.",
    requestTimeout: "The request timed out. Please try again shortly.",
  },
  layout: {
    expandSidebar: "Expand sidebar",
    collapseSidebar: "Collapse sidebar",
  },
  notFound: {
    description: "The page could not be found.",
    backToDefault: "Back to default page",
  },
};
