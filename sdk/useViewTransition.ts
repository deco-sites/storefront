export const useViewTransition = (id: string) => ({
  style: {
    viewTransitionName: id,
  },
  css: `
    ::view-transition-old(${id}) {
      animation: 1s ease both fade-out;
    }
    ::view-transition-new(${id}) {
      animation: 1s ease both fade-in;
    }
  `.trim(),
});
