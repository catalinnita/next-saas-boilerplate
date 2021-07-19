import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'
import { generateId } from '../../../utils/generateId'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
    body,
    headers,
    cookies,
  } = req

  // console.log({ req })
  // console.log({ cookies })
  // console.log({ method })
  // console.log({ cookies })
  // console.log({ headers })

  if (method === "OPTIONS") {
    console.log("options")
    res.status(200).end()
  }

  if (method === "POST") {
    // create cookies if they are not set
    // create db entries for user?

    try {
      const prisma = new PrismaClient()

      if (!headers.apikey) {
        throw new Error("ApiKey header must be set")
      }

      if (!body) {
        throw new Error("No payload present")
      }

      let { sduid, sdsid } = cookies
      const serverCookies = []

      if (!sduid && !sdsid) {
        // create cookie
        sduid = generateId()

        // save it in db
        await prisma.users_devices.create({
          data: {
            sduid: sduid,
            created: new Date(),
            // users_id: 1,
            os: 'windows',
            browser: 'chrome',
            res_x: 1000,
            res_y: 1000,
          }
        })

        serverCookies.push(`sduid=${sduid}; path=/; max-age=${60 * 60 * 24 * 365 * 2}; SameSite=None; Secure`)
      }

      if (sduid && !sdsid) {
        sdsid = generateId()

        console.log(sduid)

        // save it in db
        await prisma.users_sessions.create({
          data: {
            sdsid: sdsid,
            sduid: sduid,
            created: new Date(),
          }
        })

        serverCookies.push(`sdsid=${sdsid}; path=/; SameSite=None; Secure`)
      }

      const { event } = body

      await prisma.events.create({
        data: {
          // projects_id: 1,
          url: event.url,
          type: event.type,
          pos_x: event.pos.x || 0,
          pos_y: event.pos.y || 0,
          time_abs: new Date(event.time.timestamp),
          time_rel: event.time.sinceLoaded,
          sdsid: sdsid,
        }
      })

      // await prisma.events_data.createMany({
      // })

      await prisma.$disconnect()

      res.writeHead(200, {
        'Set-Cookie': serverCookies
      }).end("event tracked")

    } catch (error) {
      console.error(error);
      res.status(error.status || 400).end(JSON.stringify(error));
    }
  }
}
