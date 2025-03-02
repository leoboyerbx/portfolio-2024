export default defineEventHandler((event) => {
  return sendRedirect(event, '/api/resume.pdf')
})
