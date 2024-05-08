export default ((l: Location) => {
  if (l.search[1] === '/') {
    const decoded: string = l.search
      .slice(1)
      .split('&')
      .map((s: string) => s.replace(/~and~/g, '&'))
      .join('?');
    window.history.replaceState({}, '', l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);
