/*
  Remove the `x-powered-by: Nuxt` header from SSR responses.

  Nitro hardcodes it when building the SSR response, which runs *after*
  server middleware — so `res.removeHeader()` in middleware has no effect.
  The `render:response` hook runs at the right point.
*/
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response.headers) return

    delete response.headers['x-powered-by']
    delete response.headers['X-Powered-By']
  })
})
