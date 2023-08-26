import clsx from 'clsx';
import { MediaFile } from '@shopify/hydrogen';
import type {
  MediaImage,
  Media,
  Video as MediaVideo,
} from '@shopify/hydrogen/storefront-api-types';

import type { CollectionContentFragment } from 'storefrontapi.generated';
import { Heading, Text, Link, Button } from '~/components';

type HeroProps = CollectionContentFragment & {
  height?: 'full';
  top?: boolean;
  loading?: HTMLImageElement['loading'];
};

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}: HeroProps) {

  return (
    <section
      className={clsx(
        'relative justify-end flex flex-col w-full',
        top && '-mt-nav',
        height === 'full'
          ? 'h-screen'
          : 'aspect-[1] sm:aspect-[3/2] md:aspect-[2] lg:aspect-[2] xl:aspect-[5/2]',
      )}
    >
      <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
        {spread?.reference && (
          <div>
            <SpreadMedia
              sizes={
                spreadSecondary?.reference
                  ? '(min-width: 48em) 50vw, 100vw'
                  : '100vw'
              }
              data={spread.reference as Media}
              loading={loading}
            />
          </div>
        )}
        {spreadSecondary?.reference && (
          <div className="hidden md:block">
            <SpreadMedia
              sizes="50vw"
              data={spreadSecondary.reference as Media}
              loading={loading}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
        {heading?.value && (
          <h2 className="max-w-md font-bold text-4xl sm:text-5xl lg:text-6xl">
            {heading.value}
          </h2>
        )}
        {byline?.value && (
          <Text format width="narrow" as="p" size="lead">
            {byline.value}
          </Text>
        )}
        <Button>
          <Link to={`/collections/${handle}`}>
            {cta?.value && <Text size="lead">{cta.value}</Text>}
          </Link>
        </Button>
      </div>
    </section>
  );
}

type SpreadMediaProps = {
  data: Media | MediaImage | MediaVideo;
  loading?: HTMLImageElement['loading'];
  sizes: string;
};

function SpreadMedia({ data, loading, sizes }: SpreadMediaProps) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full h-full"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          previewImageOptions: { src: data.previewImage?.url ?? '' },
        },
        image: {
          loading,
          crop: 'center',
          sizes,
          alt: data.alt || '',
        },
      }}
    />
  );
}
