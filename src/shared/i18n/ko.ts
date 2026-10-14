// 여러 화면이 함께 쓰는 공통 문구. feature 문구는 각 feature의 messages.ts에 둔다.
export const messages = {
  common: {
    edit: "수정",
    delete: "삭제",
    cancel: "취소",
    cancelEdit: "수정 취소",
    reset: "초기화",
    searchResult: "검색 결과 {{resultCount}}건 / 전체 {{totalCount}}건",
    actions: "작업",
    processing: "처리 중입니다...",
    networkError: "서버에 연결하지 못했습니다. 연결 상태를 확인해 주세요.",
    requestTimeout: "요청 시간이 초과됐습니다. 잠시 후 다시 시도해 주세요.",
  },
  layout: {
    expandSidebar: "사이드바 펼치기",
    collapseSidebar: "사이드바 접기",
  },
  notFound: {
    description: "페이지를 찾을 수 없습니다.",
    backToDefault: "기본 화면으로 돌아가기",
  },
};
