/*
    Resolves to a `tel:` target on the server.

    The browser only ever sees `/contact/call`. The digits live in
    NUXT_CONTACT_PHONE (server-only) and reach the client as a 302 Location
    header, so they are absent from the HTML, from `_payload.json`, and from
    any search-engine index.

    Consequence to be aware of: the number IS visible in the address bar once
    the visitor clicks through. That is the intended trade-off — reaching Sergio
    requires a deliberate click, and no crawler ever sees it.
*/
export default defineEventHandler((event) => {
  const { contactPhone } = useRuntimeConfig(event)

  const digits = String(contactPhone ?? '').replace(/[^\d+]/g, '')

  if (!digits) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Contact channel not configured',
    })
  }

  setResponseStatus(event, 302)
  setHeader(event, 'Location', `tel:${digits}`)
  setHeader(event, 'Cache-Control', 'no-store')

  return ''
})
