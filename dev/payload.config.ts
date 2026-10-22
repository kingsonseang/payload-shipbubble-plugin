import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { seed as seedTemplate } from '@/endpoints/seed'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { testEmailAdapter } from '@/helpers/testEmailAdapter'
import { plugins } from '@/plugins'
import { seed } from '@/seed'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import path from 'path'
import { buildConfig, type PayloadRequest } from 'payload'
import { payloadShipbubblePlugin } from 'payload-shipbubble-plugin'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

const buildConfigWithMemoryDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    const memoryDB = await MongoMemoryReplSet.create({
      replSet: {
        count: 3,
        dbName: 'payloadmemory',
      },
    })

    process.env.DATABASE_URL = `${memoryDB.getUri()}&retryWrites=true`
  }

  return buildConfig({
    admin: {
      components: {
        // Renders a message + storefront link on the admin login screen.
        beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
        // Renders the 'seed database' button on the dashboard.
        beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard'],
      },
      importMap: {
        baseDir: path.resolve(dirname),
      },
      user: Users.slug,
    },
    collections: [
      Users,
      Pages,
      Categories,
      Media,
      // Retained purely so the shipbubble plugin has a local collection to
      // attach `addedByPlugin` to (asserted by dev/int.spec.ts).
      {
        slug: 'posts',
        fields: [],
      },
    ],
    db: mongooseAdapter({
      ensureIndexes: true,
      url: process.env.DATABASE_URL || '',
    }),
    editor: lexicalEditor({
      features: () => {
        return [
          UnderlineFeature(),
          BoldFeature(),
          ItalicFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          LinkFeature({
            enabledCollections: ['pages'],
            fields: ({ defaultFields }) => {
              const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                if ('name' in field && field.name === 'url') {
                  return false
                }
                return true
              })

              return [
                ...defaultFieldsWithoutUrl,
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: ({ linkType }) => linkType !== 'internal',
                  },
                  label: ({ t }) => t('fields:enterURL'),
                  required: true,
                },
              ]
            },
          }),
          IndentFeature(),
          EXPERIMENTAL_TableFeature(),
        ]
      },
    }),
    email: testEmailAdapter,
    globals: [Header, Footer],
    onInit: async (payload) => {
      // Always ensure the dev admin user exists.
      await seed(payload)

      // Seed the template's products/pages once, so the storefront has data.
      // Guarded on an empty `pages` collection because template seeding is
      // destructive - it deletes before it creates - and skipped entirely under
      // `NODE_ENV=test`, where the plugin tests do not need storefront data
      // (seeding them added ~2.5 minutes per run).
      if (process.env.NODE_ENV !== 'test') {
        const { totalDocs } = await payload.count({ collection: 'pages' })

        if (!totalDocs) {
          // `req` is only used for `deleteMany` bypasses inside the seeder; onInit
          // has no request, so pass a synthetic one.
          await seedTemplate({ payload, req: {} as PayloadRequest })
        }
      }
    },
    plugins: [
      // seo + formBuilder + ecommerce (incl. products/orders/variants/transactions/
      // carts/payments and the `products` collection).
      ...plugins,
      // After ecommercePlugin on purpose: the plugin appends `addedByPlugin` to
      // collections by slug, and `products` only exists once the ecommerce
      // plugin has pushed it onto config.collections.
      payloadShipbubblePlugin({
        collections: {
          posts: true,
          products: true,
        },
      }),
    ],
    secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
    sharp,
    typescript: {
      outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
  })
}

export default buildConfigWithMemoryDB()
