import { curry } from "@arrows/composition/curry"
import { isIn } from "@arrows/dispatch"
import { multi, method, Multi } from "@arrows/multimethod"

type UrlMethod =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE"
  | "UPDATE"

type Request = {
  method: UrlMethod
  url: string
}

type Route = (
  urlMethods: UrlMethod[],
  urlPattern: string,
  handler: (request: Request) => any,
) => (...args: any[]) => any

type Use = (urlPattern: string, subRouter: any) => (...args: any[]) => any

type RouterMethods = Route | Use

const _route: Route = (urlMethods, urlPattern, handler) => {
  return method(({ method: urlMethod, url }: Request) => {
    return (
      (urlMethods.length === 0 || isIn(urlMethods, urlMethod)) &&
      url === urlPattern
    )
  }, handler)
}

const route = curry(_route)

type RouteWithMethod = (url: string, handler: (req: Request) => any) => any
const get: RouteWithMethod = route(["GET"])
const post: RouteWithMethod = route(["POST"])
const put: RouteWithMethod = route(["PUT"])
const patch: RouteWithMethod = route(["PATCH"])
const del: RouteWithMethod = route(["DELETE"])
const all: RouteWithMethod = route([])

const router = (...routes: RouterMethods[]) => multi(...routes)

export { router, route }
export default router

const boo = router(
  get("/", (req) => {
    return req
  }),
)

const sub = (url: string, router: any) => {
  return all(url, (req: Request) => {
    const narrowedReq = {
      ...req,
      url: req.url.replace(url, ""),
    } // ?

    return router(narrowedReq)
  })
}

const go = router(
  get("/info", (req) => {
    return "Info"
  }),

  route(["GET", "POST"], "/elo", (req: Request) => {
    return req
  }),

  sub("/boo", boo),
)

go({ method: "GET", url: "/info" }) // ?
go({ method: "GET", url: "/elo" }) // ?
go({ method: "POST", url: "/elo" }) // ?
go({ method: "GET", url: "/boo/hoo" }) // ?
