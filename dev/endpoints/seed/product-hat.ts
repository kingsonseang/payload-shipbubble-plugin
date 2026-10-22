import type { Category, Media, Product, VariantOption, VariantType  } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type ProductArgs = {
  categories: Category[]
  galleryImage: Media
  metaImage: Media
  relatedProducts: Product[]
  variantTypes: VariantType[]
}

export const productHatData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  categories,
  galleryImage,
  metaImage,
  relatedProducts,
  variantTypes,
}) => {
  return {
    slug: 'hat',
    _status: 'published',
    categories,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Top off your look with our classic hat, crafted for style and comfort. Made with breathable, high-quality materials and an adjustable strap for the perfect fit, it’s ideal for everyday wear or outdoor adventures. Available in a range of colors to match any outfit.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            textStyle: '',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    layout: [],
    meta: {
      description:
        'Top off your look with our classic hat, crafted for style and comfort. Made with breathable, high-quality materials and an adjustable strap for the perfect fit.',
      image: metaImage,
      title: 'Hat | Payload Ecommerce Template',
    },
    priceInUSD: 2500,
    priceInUSDEnabled: true,
    relatedProducts,
    title: 'Hat',
  }
}
