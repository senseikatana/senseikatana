/*
    Resolves to a WhatsApp click-to-chat target on the server.

    A literal `wa.me/34637723747` href would expose the number in the markup,
    so the browser only sees `/contact/whatsapp` and the digits stay in
    NUXT_CONTACT_WHATSAPP (server-only), handed over via a 302.

    Config format: country code + number, digits only, no `+`, spaces or dashes.
*/
export default defineEventHandler((event) => {
  const { contactWhatsapp } = useRuntimeConfig(event)

  const digits = String(contactWhatsapp ?? '').replace(/\D/g, '')

  if (!digits) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Contact channel not configured',
    })
  }

  setResponseStatus(event, 302)
  setHeader(event, 'Location', `https://wa.me/${digits}`)
  setHeader(event, 'Cache-Control', 'no-store')

  return ''
})
