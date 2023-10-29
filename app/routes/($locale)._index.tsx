import { defer, type LoaderArgs } from '@shopify/remix-oxygen';
import { Suspense, useState } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { AnalyticsPageType } from '@shopify/hydrogen';
import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';

import { ProductSwimlane, FeaturedCollections, Hero, Section, Button } from '~/components';
import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { getHeroPlaceholder } from '~/lib/placeholders';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';
import Slider from "react-slick";
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { OkendoReviews, OkendoStarRating } from '@okendo/shopify-hydrogen';
import { ReviewsModal } from '~/components/ReviewDrawer';


function NextArrow({ onClick }: any) {
  return (
    <div
      style={{ position: 'absolute', top: '40%', right: '-8px', zIndex: 2, cursor: 'pointer' }}
      onClick={onClick}
    >
      <ChevronRightIcon className="h-12 w-12 text-gray-400" />
    </div>
  );
}

function PrevArrow({ onClick }: any) {
  return (
    <div
      style={{ position: 'absolute', top: '40%', left: '-8px', zIndex: 2, cursor: 'pointer' }}
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-12 w-12 text-gray-400" />
    </div>
  );
}

export const headers = routeHeaders;

export async function loader({ params, context }: LoaderArgs) {
  const { language, country } = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, { status: 404 });
  }

  const { shop, hero } = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: { handle: 'magnets' },
  });

  const seo = seoPayload.home();

  return defer({
    shop,
    primaryHero: hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);
  console.log(primaryHero)
  const slider1 = React.useRef<any>(null);
  const slider2 = React.useRef<any>(null);

  const [reviewsModalOpen, setReviewsModalOpen] = useState(false)

  return (
    <>
      {primaryHero && (
        <Hero {...primaryHero} top loading="eager" />
      )}
      <Slider
        ref={slider1}
        className='p-6'
        swipeToSlide
        slidesToScroll={1}
        slidesToShow={4}
        responsive={[
          { breakpoint: 780, settings: { slidesToShow: 2 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } }

        ]}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
      >
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/calico.png?v=1698108663' }}
          alt={'cat magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/husky.png?v=1698108663' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/bulldog.png?v=1698114621' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/sheepdog.png?v=1698108665' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/comet.png?v=1698108665' }}
          alt={'cat magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/celeste.png?v=1698108665' }}
          alt={'cat magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/blaize.png?v=1698108663' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/leo.png?v=1698108665' }}
          alt={'cat magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/terrier.png?v=1698108665' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/pimpy.png?v=1698108665' }}
          alt={'cat magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/tulip.png?v=1698108665' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/graydog.png?v=1698108665' }}
          alt={'dog magnet'}
          className='p-2'
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/graydog2.png?v=1698108665' }}
          alt={'dog magnet'}
          className='p-2'
        />
      </Slider >
      {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6"> */}
      <div className='px-16'>
        <Slider
          ref={slider2}
          className='py-2 px-16'
          swipeToSlide
          slidesToShow={1}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          <div className='flex flex-col items-center p-6 text-center'>
            <div className='w-fit mx-auto mb-4'>
              <svg height="22" viewBox="0 0 78.0909090909091 14" aria-hidden="true">
                <use x="0" href="#oke-star-filled"></use>
                <use x="15.872727272727273" href="#oke-star-filled"></use>
                <use x="31.745454545454546" href="#oke-star-filled"></use>
                <use x="47.61818181818182" href="#oke-star-filled"></use>
                <use x="63.49090909090909" href="#oke-star-filled"></use>
              </svg>
            </div>
            "I received a magnet of my cat Leo and it was perfect! The attention to detail is amazing and the quality is top notch."
          </div>
          <div className='flex flex-col items-center p-6 text-center'>
            <div className='mb-4'>
              <div className='w-fit mx-auto mb-4'>
                <svg height="22" viewBox="0 0 78.0909090909091 14" aria-hidden="true">
                  <use x="0" href="#oke-star-filled"></use>
                  <use x="15.872727272727273" href="#oke-star-filled"></use>
                  <use x="31.745454545454546" href="#oke-star-filled"></use>
                  <use x="47.61818181818182" href="#oke-star-filled"></use>
                  <use x="63.49090909090909" href="#oke-star-filled"></use>
                </svg>
              </div>
            </div>
            "I received a magnet of my cat Leo and it was perfect! The attention to detail is amazing and the quality is top notch."
          </div>
        </Slider >
      </div>


      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({ products }) => {
              if (!products?.nodes) return <></>;
              //return (
              // <ProductSwimlane
              //   products={products}
              //   title="Featured Products"
              //   count={4}
              // />
              // <div className='flex flex-col items-center mb-6'>
              //   <div className='mb-4'>
              //     <OkendoStarRating
              //       productId={products.nodes[0].id}
              //       okendoStarRatingSnippet={products.nodes[0].okendoStarRatingSnippet}
              //     />
              //   </div>
              //   <Button variant='secondary' onClick={() => { setReviewsModalOpen(true) }} width="auto" >
              //     See Reviews
              //   </Button>
              //   {reviewsModalOpen && <ReviewsModal onClose={() => { setReviewsModalOpen(false) }} productId={products.nodes[0].id} />}
              // </div>
              //);
            }}
          </Await>
        </Suspense>
      )}

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({ hero }) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {/* {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({ collections }) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )} */}

      {/* {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({ hero }) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    image {
      url
      altText
      width
      height
    }
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    metafield(namespace: "hero", key: "byline"){
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/2023-07/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/2023-07/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;
