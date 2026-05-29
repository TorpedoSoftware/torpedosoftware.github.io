import type { useToast } from "@/components/primitives/Toast";

type ToastFn = ReturnType<typeof useToast>["toast"];

export async function copyToClipboard(
  text: string,
  toast: ToastFn,
  successTitle = "Link copied to clipboard",
) {
  try {
    await navigator.clipboard.writeText(text);
    toast({ variant: "success", title: successTitle });
  } catch {
    toast({ variant: "danger", title: "Failed to copy link" });
  }
}
