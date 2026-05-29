export function scrollToHeading(id: string, delay = 0) {
  const el = document.getElementById(id);
  if (!el) return;

  const scroll = () => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  if (delay > 0) {
    setTimeout(scroll, delay);
  } else {
    scroll();
  }
}
