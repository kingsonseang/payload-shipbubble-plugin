'use client'

import type { CarouselApi} from '@/components/ui/carousel';
import type { Media as MediaType, Product } from '@/payload-types'
import type { DefaultDocumentIDType } from 'payload'

import { GridTileImage } from '@/components/Grid/tile'
import { Media } from '@/components/Media'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  gallery: NonNullable<Product['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams()
  const [current, setCurrent] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  useEffect(() => {
    const values = Array.from(searchParams.values())

    if (values && api) {
      const index = gallery.findIndex((item) => {
        if (!item.variantOption) {return false}

        let variantID: DefaultDocumentIDType

        if (typeof item.variantOption === 'object') {
          variantID = item.variantOption.id
        } else {variantID = item.variantOption}

        return Boolean(values.find((value) => value === String(variantID)))
      })
      if (index !== -1) {
        setCurrent(index)
        api.scrollTo(index, true)
      }
    }
  }, [searchParams, api, gallery])

  return (
    <div>
      <div className="relative w-full overflow-hidden mb-8">
        <Media
          className="w-full"
          imgClassName="w-full rounded-lg"
          resource={gallery[current].image}
        />
      </div>

      <Carousel className="w-full" opts={{ align: 'start', loop: false }} setApi={setApi}>
        <CarouselContent>
          {gallery.map((item, i) => {
            if (typeof item.image !== 'object') {return null}

            return (
              <CarouselItem
                className="basis-1/5"
                key={`${item.image.id}-${i}`}
                onClick={() => setCurrent(i)}
              >
                <GridTileImage active={i === current} media={item.image} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
