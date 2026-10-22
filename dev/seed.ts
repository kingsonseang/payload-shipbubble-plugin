import type { Payload } from 'payload'

import { devUser } from '@/helpers/credentials'

export const seed = async (payload: Payload) => {
  const { totalDocs } = await payload.count({
    collection: 'users',
    where: {
      email: {
        equals: devUser.email,
      },
    },
  })

  if (!totalDocs) {
    await payload.create({
      collection: 'users',
      data: devUser,
    })
  } else {
    // The template seeder creates a customer account, so this dev user is no
    // longer the first user and the `ensureFirstUserIsAdmin` hook won't grant
    // it `admin` - without this, logging into /admin just bounces back to the
    // login screen. Roles are admin-only, so this has to bypass access control.
    const devUserDoc = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: devUser.email } },
    })

    const doc = devUserDoc.docs[0]

    if (doc && !(doc.roles ?? []).includes('admin')) {
      await payload.update({
        id: doc.id,
        collection: 'users',
        data: { roles: ['admin'] },
        overrideAccess: true,
      })
    }
  }
}
