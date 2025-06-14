import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { fileURLToPath } from 'node:url'

const isProd = process.env.NODE_ENV === 'production'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p)
  const app = express()

  let vite
  if (!isProd) {
    const { createServer } = await import('vite')
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    const serveStatic = (await import('serve-static')).default
    app.use(compression())
    app.use(serveStatic(resolve('dist/client'), { index: false }))
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    try {
      let template, render
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      const appHtml = await render(url)
      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.stack)
    }
  })

  const port = process.env.PORT || 5173
  return new Promise((resolveServer) => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
      resolveServer(app)
    })
  })
}

createServer()
