import axios from "axios";
import i18n from "../i18n";

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
    return i18n.t("common.networkError");
  } else if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
    return i18n.t("common.requestTimeout");
  } else {
    return fallbackMessage;
  }
}
